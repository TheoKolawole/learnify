const mongoose = require('mongoose');

const quizResponseSchema = new mongoose.Schema({
  quizAttemptId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuizAttempt',
    required: true
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  selectedOptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuestionOption'
  },
  textResponse: {
    type: String
  },
  isCorrect: {
    type: Boolean
  },
  pointsAwarded: {
    type: mongoose.Schema.Types.Decimal128,
    default: 0
  },
  maxPoints: {
    type: Number,
    required: true
  },
  gradedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  gradedAt: {
    type: Date
  },
  feedback: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: { 
    transform: function(doc, ret) {
      if (ret.pointsAwarded) {
        // Convert Decimal128 to regular number for JSON
        ret.pointsAwarded = parseFloat(ret.pointsAwarded.toString());
      }
      return ret;
    }
  }
});

// Pre-save middleware to validate response based on question type
quizResponseSchema.pre('save', async function(next) {
  try {
    const Question = mongoose.model('Question');
    const question = await Question.findById(this.questionId);
    
    if (!question) {
      return next(new Error('Question not found'));
    }
    
    // Set max points from the question
    this.maxPoints = question.points;
    
    // Validate response based on question type
    if (question.type === 'multiple_choice' && !this.selectedOptionId) {
      return next(new Error('Multiple choice questions require a selected option'));
    }
    
    if (question.type === 'true_false' && this.selectedOptionId === undefined) {
      return next(new Error('True/False questions require a selected option'));
    }
    
    if ((question.type === 'short_answer' || question.type === 'essay') && !this.textResponse) {
      return next(new Error('Short answer and essay questions require a text response'));
    }
    
    // Auto-grade for multiple_choice and true_false
    if (question.type === 'multiple_choice') {
      const QuestionOption = mongoose.model('QuestionOption');
      const selectedOption = await QuestionOption.findById(this.selectedOptionId);
      
      if (selectedOption) {
        this.isCorrect = selectedOption.isCorrect;
        this.pointsAwarded = this.isCorrect ? question.points : 0;
      }
    } else if (question.type === 'true_false') {
      // For true/false, we compare against the correctAnswer field on the question
      this.isCorrect = this.selectedOptionId === question.correctAnswer;
      this.pointsAwarded = this.isCorrect ? question.points : 0;
    }
    // Short answer and essay questions need manual grading
    
    next();
  } catch (error) {
    next(error);
  }
});

// Compound index to find responses for a specific attempt and question
quizResponseSchema.index({ quizAttemptId: 1, questionId: 1 }, { unique: true });

const QuizResponse = mongoose.model('QuizResponse', quizResponseSchema);

module.exports = QuizResponse;