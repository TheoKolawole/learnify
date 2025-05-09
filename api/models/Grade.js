const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  // Polymorphic relationship - could be quiz, assignment, etc.
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  itemType: {
    type: String,
    enum: ['quiz', 'assignment', 'exam', 'project', 'participation'],
    required: true
  },
  score: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  },
  maxScore: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  },
  percentage: {
    type: mongoose.Schema.Types.Decimal128
  },
  feedback: {
    type: String
  },
  gradedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  gradedAt: {
    type: Date,
    default: Date.now
  },
  // For weighted grade calculation
  weight: {
    type: Number,
    default: 1
  },
  // For categorizing grades
  category: {
    type: String,
    default: 'uncategorized'
  },
  isPublished: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      if (ret.score) ret.score = parseFloat(ret.score.toString());
      if (ret.maxScore) ret.maxScore = parseFloat(ret.maxScore.toString());
      if (ret.percentage) ret.percentage = parseFloat(ret.percentage.toString());
      return ret;
    }
  },
  toObject: { virtuals: true }
});

// Pre-save hook to calculate percentage
gradeSchema.pre('save', function(next) {
  if (this.maxScore && parseFloat(this.maxScore.toString()) > 0) {
    const scoreValue = parseFloat(this.score.toString());
    const maxScoreValue = parseFloat(this.maxScore.toString());
    this.percentage = (scoreValue / maxScoreValue) * 100;
  }
  next();
});

// Method to get reference to the actual graded item
gradeSchema.methods.getItem = async function() {
  if (this.itemType === 'quiz') {
    const Quiz = mongoose.model('Quiz');
    return await Quiz.findById(this.itemId);
  } else if (this.itemType === 'assignment') {
    const Lesson = mongoose.model('Lesson');
    return await Lesson.findOne({ _id: this.itemId, type: 'assignment' });
  } else {
    return null;
  }
};

// Static method to calculate course grade for a student
gradeSchema.statics.calculateCourseGrade = async function(courseId, studentId) {
  const grades = await this.find({ courseId, studentId, isPublished: true });
  
  if (!grades.length) return { totalGrade: 0, weightedGrade: 0 };
  
  // Calculate simple average
  let totalPoints = 0;
  let maxPossiblePoints = 0;
  let weightedPoints = 0;
  let totalWeight = 0;
  
  grades.forEach(grade => {
    const score = parseFloat(grade.score.toString());
    const maxScore = parseFloat(grade.maxScore.toString());
    
    totalPoints += score;
    maxPossiblePoints += maxScore;
    
    // Weighted calculation
    weightedPoints += (score / maxScore) * grade.weight;
    totalWeight += grade.weight;
  });
  
  const totalGrade = maxPossiblePoints > 0 ? (totalPoints / maxPossiblePoints) * 100 : 0;
  const weightedGrade = totalWeight > 0 ? (weightedPoints / totalWeight) * 100 : 0;
  
  return { totalGrade, weightedGrade };
};

// Indexes for efficient queries
gradeSchema.index({ studentId: 1, courseId: 1 });
gradeSchema.index({ courseId: 1, itemType: 1 });
gradeSchema.index({ itemId: 1, itemType: 1 });

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;