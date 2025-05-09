const mongoose = require('mongoose');

const quizAttemptSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date
  },
  score: {
    type: mongoose.Schema.Types.Decimal128,
    default: 0
  },
  status: {
    type: String,
    enum: ['in_progress', 'completed', 'abandoned'],
    default: 'in_progress'
  },
  attemptNumber: {
    type: Number,
    default: 1
  },
  timeSpent: {
    type: Number, // time spent in seconds
    default: 0
  },
  isPassed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      if (ret.score) {
        // Convert Decimal128 to regular number for JSON
        ret.score = parseFloat(ret.score.toString());
      }
      return ret;
    }
  },
  toObject: { virtuals: true }
});

// Virtual for responses in this attempt
quizAttemptSchema.virtual('responses', {
  ref: 'QuizResponse',
  localField: '_id',
  foreignField: 'quizAttemptId'
});

// Method to calculate score
quizAttemptSchema.methods.calculateScore = async function() {
  const QuizResponse = mongoose.model('QuizResponse');
  const Quiz = mongoose.model('Quiz');
  
  // Get all responses for this attempt
  const responses = await QuizResponse.find({ quizAttemptId: this._id });
  
  // Get the quiz to access passing score
  const quiz = await Quiz.findById(this.quizId);
  
  if (!responses.length || !quiz) return 0;
  
  // Calculate total points awarded
  const totalPointsAwarded = responses.reduce((sum, response) => {
    return sum + (response.pointsAwarded ? parseFloat(response.pointsAwarded.toString()) : 0);
  }, 0);
  
  // Calculate total possible points
  const totalPossiblePoints = responses.reduce((sum, response) => {
    return sum + response.maxPoints;
  }, 0);
  
  // Calculate percentage score
  const percentage = totalPossiblePoints > 0 ? 
    (totalPointsAwarded / totalPossiblePoints) * 100 : 0;
  
  // Update score and pass status
  this.score = percentage.toFixed(2);
  this.isPassed = percentage >= quiz.passingScore;
  
  // If this is the first time calculating the score, mark as completed
  if (this.status === 'in_progress') {
    this.status = 'completed';
    this.endTime = new Date();
    
    // Calculate time spent
    if (this.startTime) {
      this.timeSpent = Math.floor((this.endTime - this.startTime) / 1000);
    }
  }
  
  await this.save();
  return percentage;
};

// Compound index to find attempts by student and quiz
quizAttemptSchema.index({ quizId: 1, studentId: 1, attemptNumber: 1 }, { unique: true });
quizAttemptSchema.index({ status: 1 });

const QuizAttempt = mongoose.model('QuizAttempt', quizAttemptSchema);

module.exports = QuizAttempt;