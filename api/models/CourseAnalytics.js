const mongoose = require('mongoose');

const courseAnalyticsSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
    unique: true
  },
  totalStudents: {
    type: Number,
    default: 0
  },
  averageCompletion: {
    type: mongoose.Schema.Types.Decimal128,
    default: 0
  },
  averageScore: {
    type: mongoose.Schema.Types.Decimal128,
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  // Additional analytics data
  moduleCompletionRates: [{
    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Module'
    },
    completionRate: mongoose.Schema.Types.Decimal128
  }],
  quizAttemptStats: {
    totalAttempts: Number,
    averageScore: mongoose.Schema.Types.Decimal128,
    passRate: mongoose.Schema.Types.Decimal128
  },
  assignmentStats: {
    totalSubmitted: Number,
    averageScore: mongoose.Schema.Types.Decimal128,
    lateSubmissions: Number
  },
  studentEngagement: {
    averageTimeSpent: Number, // in minutes
    mostActiveDay: String,
    leastActiveDay: String
  },
  contentStats: {
    mostViewedLesson: {
      lessonId: mongoose.Schema.Types.ObjectId,
      viewCount: Number
    },
    leastViewedLesson: {
      lessonId: mongoose.Schema.Types.ObjectId,
      viewCount: Number
    }
  }
}, {
  timestamps: true,
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      if (ret.averageCompletion) {
        ret.averageCompletion = parseFloat(ret.averageCompletion.toString());
      }
      if (ret.averageScore) {
        ret.averageScore = parseFloat(ret.averageScore.toString());
      }
      
      // Transform decimal128 fields in nested objects
      if (ret.moduleCompletionRates) {
        ret.moduleCompletionRates.forEach(module => {
          if (module.completionRate) {
            module.completionRate = parseFloat(module.completionRate.toString());
          }
        });
      }
      
      if (ret.quizAttemptStats && ret.quizAttemptStats.averageScore) {
        ret.quizAttemptStats.averageScore = parseFloat(ret.quizAttemptStats.averageScore.toString());
      }
      
      if (ret.quizAttemptStats && ret.quizAttemptStats.passRate) {
        ret.quizAttemptStats.passRate = parseFloat(ret.quizAttemptStats.passRate.toString());
      }
      
      if (ret.assignmentStats && ret.assignmentStats.averageScore) {
        ret.assignmentStats.averageScore = parseFloat(ret.assignmentStats.averageScore.toString());
      }
      
      return ret;
    }
  },
  toObject: { virtuals: true }
});

// Method to recalculate analytics
courseAnalyticsSchema.methods.recalculate = async function() {
  try {
    const Course = mongoose.model('Course');
    const Enrollment = mongoose.model('Enrollment');
    const Grade = mongoose.model('Grade');
    const Quiz = mongoose.model('Quiz');
    const QuizAttempt = mongoose.model('QuizAttempt');
    const Submission = mongoose.model('Submission');
    const Module = mongoose.model('Module');
    const Lesson = mongoose.model('Lesson');
    
    // Get the course
    const course = await Course.findById(this.courseId);
    if (!course) throw new Error('Course not found');
    
    // Calculate total students
    const enrollments = await Enrollment.find({ 
      courseId: this.courseId,
      status: { $in: ['active', 'completed'] } 
    });
    this.totalStudents = enrollments.length;
    
    // Calculate average completion rate
    if (enrollments.length > 0) {
      const completionSum = enrollments.reduce((sum, enrollment) => {
        return sum + enrollment.progress;
      }, 0);
      this.averageCompletion = completionSum / enrollments.length;
    }
    
    // Calculate average score across all graded items
    const grades = await Grade.find({ 
      courseId: this.courseId,
      isPublished: true 
    });
    
    if (grades.length > 0) {
      let totalPercentage = 0;
      
      grades.forEach(grade => {
        const percentage = parseFloat(grade.percentage.toString());
        totalPercentage += percentage;
      });
      
      this.averageScore = totalPercentage / grades.length;
    }
    
    // Module completion rates
    const modules = await Module.find({ courseId: this.courseId });
    this.moduleCompletionRates = [];
    
    for (const module of modules) {
      const moduleEnrollments = await Enrollment.find({
        courseId: this.courseId,
        'moduleProgress.moduleId': module._id
      });
      
      if (moduleEnrollments.length > 0) {
        let totalCompletion = 0;
        
        moduleEnrollments.forEach(enrollment => {
          const moduleProgress = enrollment.moduleProgress.find(
            mp => mp.moduleId.toString() === module._id.toString()
          );
          
          if (moduleProgress) {
            totalCompletion += moduleProgress.completionPercentage;
          }
        });
        
        this.moduleCompletionRates.push({
          moduleId: module._id,
          completionRate: totalCompletion / moduleEnrollments.length
        });
      } else {
        this.moduleCompletionRates.push({
          moduleId: module._id,
          completionRate: 0
        });
      }
    }
    
    // Quiz statistics
    const quizzes = await Quiz.find({ courseId: this.courseId });
    const quizIds = quizzes.map(quiz => quiz._id);
    const quizAttempts = await QuizAttempt.find({ 
      quizId: { $in: quizIds },
      status: 'completed'
    });
    
    this.quizAttemptStats = {
      totalAttempts: quizAttempts.length,
      averageScore: 0,
      passRate: 0
    };
    
    if (quizAttempts.length > 0) {
      const totalScore = quizAttempts.reduce((sum, attempt) => {
        return sum + parseFloat(attempt.score.toString());
      }, 0);
      
      const passedAttempts = quizAttempts.filter(attempt => attempt.isPassed).length;
      
      this.quizAttemptStats.averageScore = totalScore / quizAttempts.length;
      this.quizAttemptStats.passRate = (passedAttempts / quizAttempts.length) * 100;
    }
    
    // Assignment statistics
    const assignments = await Lesson.find({ 
      type: 'assignment',
      moduleId: { $in: modules.map(m => m._id) }
    });
    const assignmentIds = assignments.map(assignment => assignment._id);
    const submissions = await Submission.find({ assignmentId: { $in: assignmentIds } });
    
    this.assignmentStats = {
      totalSubmitted: submissions.length,
      averageScore: 0,
      lateSubmissions: 0
    };
    
    if (submissions.length > 0) {
      // Count late submissions
      const lateSubmissions = submissions.filter(submission => submission.isLate).length;
      this.assignmentStats.lateSubmissions = lateSubmissions;
      
      // Calculate average score for assignments
      const gradedSubmissions = submissions.filter(submission => submission.gradeId);
      
      if (gradedSubmissions.length > 0) {
        const assignmentGrades = await Grade.find({
          _id: { $in: gradedSubmissions.map(s => s.gradeId) }
        });
        
        const totalAssignmentPercentage = assignmentGrades.reduce((sum, grade) => {
          return sum + parseFloat(grade.percentage.toString());
        }, 0);
        
        this.assignmentStats.averageScore = totalAssignmentPercentage / assignmentGrades.length;
      }
    }
    
    // Update lastUpdated timestamp
    this.lastUpdated = new Date();
    
    // Save the updated analytics
    await this.save();
    return this;
    
  } catch (error) {
    console.error('Error recalculating course analytics:', error);
    throw error;
  }
};

// Static method to get or create analytics for a course
courseAnalyticsSchema.statics.getOrCreate = async function(courseId) {
  let analytics = await this.findOne({ courseId });
  
  if (!analytics) {
    analytics = new this({ courseId });
    await analytics.save();
  }
  
  return analytics;
};

const CourseAnalytics = mongoose.model('CourseAnalytics', courseAnalyticsSchema);

module.exports = CourseAnalytics;