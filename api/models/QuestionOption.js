const mongoose = require('mongoose');

const questionOptionSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  isCorrect: {
    type: Boolean,
    required: true,
    default: false
  },
  order: {
    type: Number,
    required: true
  },
  explanation: {
    type: String
  }
}, {
  timestamps: true
});

// Compound index for efficient sorting
questionOptionSchema.index({ questionId: 1, order: 1 });

const QuestionOption = mongoose.model('QuestionOption', questionOptionSchema);

module.exports = QuestionOption;