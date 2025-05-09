const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['multiple_choice', 'true_false', 'short_answer', 'essay'],
    required: true
  },
  points: {
    type: Number,
    required: true,
    min: 0,
    default: 1
  },
  order: {
    type: Number,
    required: true
  },
  // Additional fields based on question type
  explanation: {
    type: String,
    default: ''
  },
  // For essay and short answer questions
  sampleAnswer: {
    type: String
  },
  // For true_false questions
  correctAnswer: {
    type: Boolean
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for options in this question (for multiple_choice)
questionSchema.virtual('options', {
  ref: 'QuestionOption',
  localField: '_id',
  foreignField: 'questionId'
});

// Pre-save middleware to ensure proper setup based on question type
questionSchema.pre('save', function(next) {
  if (this.type === 'true_false' && this.correctAnswer === undefined) {
    return next(new Error('True/False questions require a correctAnswer'));
  }
  next();
});

// Compound index for efficient sorting
questionSchema.index({ quizId: 1, order: 1 });

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;