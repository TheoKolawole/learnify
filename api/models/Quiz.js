const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  // Can be associated with a specific lesson or standalone in a course
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson'
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  timeLimit: {
    type: Number, // in minutes
    min: 0,
    default: 30
  },
  passingScore: {
    type: Number, // percentage
    min: 0,
    max: 100,
    default: 70
  },
  dueDate: {
    type: Date
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  totalPoints: {
    type: Number,
    default: 0
  },
  shuffleQuestions: {
    type: Boolean,
    default: false
  },
  showResults: {
    type: Boolean,
    default: true
  },
  attemptsAllowed: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for questions in this quiz
quizSchema.virtual('questions', {
  ref: 'Question',
  localField: '_id',
  foreignField: 'quizId'
});

// Virtual for attempts on this quiz
quizSchema.virtual('attempts', {
  ref: 'QuizAttempt',
  localField: '_id',
  foreignField: 'quizId'
});

// Method to calculate total points based on questions
quizSchema.methods.calculateTotalPoints = async function() {
  const Question = mongoose.model('Question');
  const questions = await Question.find({ quizId: this._id });
  
  this.totalPoints = questions.reduce((sum, question) => sum + question.points, 0);
  await this.save();
  
  return this.totalPoints;
};

// Indexes
quizSchema.index({ courseId: 1 });
quizSchema.index({ lessonId: 1 });
quizSchema.index({ isPublished: 1 });
quizSchema.index({ dueDate: 1 });

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;