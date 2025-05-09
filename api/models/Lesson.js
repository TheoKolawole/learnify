const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  moduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['video', 'text', 'pdf', 'quiz', 'assignment'],
    default: 'text'
  },
  duration: {
    type: Number, // in minutes
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  // Additional fields based on type
  videoUrl: {
    type: String
  },
  fileUrl: {
    type: String
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz'
  }
}, {
  timestamps: true
});

// Compound index for efficient sorting
lessonSchema.index({ moduleId: 1, order: 1 });

// Pre-save middleware to ensure content based on type
lessonSchema.pre('save', function(next) {
  if (this.type === 'video' && !this.videoUrl) {
    return next(new Error('Video URL is required for video lessons'));
  }
  
  if (this.type === 'pdf' && !this.fileUrl) {
    return next(new Error('File URL is required for PDF lessons'));
  }
  
  if (this.type === 'quiz' && !this.quizId) {
    return next(new Error('Quiz ID is required for quiz lessons'));
  }
  
  next();
});

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;