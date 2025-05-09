const mongoose = require('mongoose');
const slugify = require('slugify');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  slug: {
    type: String,
    unique: true
  },
  coverImage: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Pre-save hook to generate slug
courseSchema.pre('save', function(next) {
  if (!this.isModified('title')) return next();
  
  this.slug = slugify(this.title, {
    lower: true,
    strict: true
  });
  next();
});

// Virtual for modules in this course
courseSchema.virtual('modules', {
  ref: 'Module',
  localField: '_id',
  foreignField: 'courseId'
});

// Virtual for enrollments in this course
courseSchema.virtual('enrollments', {
  ref: 'Enrollment',
  localField: '_id',
  foreignField: 'courseId'
});

// Index for efficient lookups
courseSchema.index({ instructorId: 1 });
// courseSchema.index({ slug: 1 });
courseSchema.index({ status: 1 });

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;