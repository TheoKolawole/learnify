const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson', // References a lesson with type="assignment"
    required: true
  },
  submissionText: {
    type: String
  },
  fileUrl: {
    type: String
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['submitted', 'graded', 'returned'],
    default: 'submitted'
  },
  // Additional fields for tracking
  isLate: {
    type: Boolean,
    default: false
  },
  attachments: [{
    fileName: String,
    fileSize: Number,
    fileType: String,
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  comments: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  // Link to grade if it exists
  gradeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Grade'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for associated grade
submissionSchema.virtual('grade', {
  ref: 'Grade',
  localField: 'gradeId',
  foreignField: '_id',
  justOne: true
});

// Middleware to validate submission
submissionSchema.pre('save', async function(next) {
  // Require at least one form of submission
  if (!this.submissionText && !this.fileUrl && (!this.attachments || this.attachments.length === 0)) {
    return next(new Error('Submission requires text content, a file URL, or attachments'));
  }
  
  try {
    // Check if assignment exists and is of type 'assignment'
    const Lesson = mongoose.model('Lesson');
    const assignment = await Lesson.findOne({ _id: this.assignmentId, type: 'assignment' });
    
    if (!assignment) {
      return next(new Error('Invalid assignment reference'));
    }
    
    // Check if submission is late
    // We would need to get the due date from the assignment
    // This is just a placeholder for that logic
    if (assignment.dueDate && new Date() > new Date(assignment.dueDate)) {
      this.isLate = true;
    }
    
    next();
  } catch (error) {
    next(error);
  }
});

// Method to add a comment
submissionSchema.methods.addComment = async function(userId, text) {
  this.comments.push({
    userId,
    text,
    createdAt: new Date()
  });
  
  return this.save();
};

// Static method to find all submissions for a course
submissionSchema.statics.findByCourse = async function(courseId) {
  const Lesson = mongoose.model('Lesson');
  const Module = mongoose.model('Module');
  
  // Find all assignment lessons in the course
  const modules = await Module.find({ courseId });
  const moduleIds = modules.map(module => module._id);
  
  const assignments = await Lesson.find({
    moduleId: { $in: moduleIds },
    type: 'assignment'
  });
  
  const assignmentIds = assignments.map(assignment => assignment._id);
  
  // Find submissions for these assignments
  return await this.find({
    assignmentId: { $in: assignmentIds }
  }).populate('studentId', 'firstName lastName email');
};

// Compound index for efficient lookups
submissionSchema.index({ studentId: 1, assignmentId: 1 }, { unique: true });
submissionSchema.index({ assignmentId: 1, status: 1 });

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;