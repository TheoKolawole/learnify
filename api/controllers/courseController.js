const Course = require('../models/Course');
const Module = require('../models/Module');
const CourseAnalytics = require('../models/CourseAnalytics');
const mongoose = require('mongoose');

/**
 * @desc    Get all courses
 * @route   GET /api/courses
 * @access  Public
 */
exports.getAllCourses = async (req, res) => {
  try {
    const { status, instructor, search, sort = 'createdAt', order = 'desc' } = req.query;
    const query = {};
    
    // Filter by status if provided
    if (status) {
      query.status = status;
    } else {
      // Only show published courses by default for non-admin users
      if (!req.user?.isAdmin) {
        query.status = 'published';
      }
    }
    
    // Filter by instructor if provided
    if (instructor) {
      query.instructorId = instructor;
    }
    
    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Create sort object
    const sortObj = {};
    sortObj[sort] = order === 'asc' ? 1 : -1;
    
    const courses = await Course.find(query)
      .populate('instructorId', 'name email')
      .sort(sortObj);
      
    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    console.error('Error getting courses:', error);
    res.status(500).json({
      success: false,
      msg: 'Server error'
    });
  }
};

/**
 * @desc    Get course by ID
 * @route   GET /api/courses/:id
 * @access  Public
 */
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructorId', 'firstname email')
      .populate('modules');
    
    if (!course) {
      return res.status(404).json({
        success: false,
        msg: 'Course not found'
      });
    }

    // Only allow access to non-published courses for admins and instructors
    if (course.status !== 'published' && 
        !req.user?.isAdmin && 
        req.user?.id.toString() !== course.instructorId.id.toString()) {
      return res.status(403).json({
        success: false,
        msg: 'Access denied: Course is not published'
      });
    }
    
    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error('Error getting course:', error);
    res.status(500).json({
      success: false,
      msg: 'Server error'
    });
  }
};

/**
 * @desc    Get course by slug
 * @route   GET /api/courses/slug/:slug
 * @access  Public
 */
exports.getCourseBySlug = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug })
      .populate('instructorId', 'name email')
      .populate('modules');
    
    if (!course) {
      return res.status(404).json({
        success: false,
        msg: 'Course not found'
      });
    }

    // Only allow access to non-published courses for admins and instructors
    if (course.status !== 'published' && 
        !req.user?.isAdmin && 
        req.user?.id.toString() !== course.instructorId.toString()) {
      return res.status(403).json({
        success: false,
        msg: 'Access denied: Course is not published'
      });
    }
    
    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error('Error getting course by slug:', error);
    res.status(500).json({
      success: false,
      msg: 'Server error'
    });
  }
};

/**
 * @desc    Create a new course
 * @route   POST /api/courses
 * @access  Private (Instructors and Admins)
 */
exports.createCourse = async (req, res) => {
  try {
    // Set the instructor as the current user
    req.body.instructorId = req.user.id;
    
    const course = await Course.create(req.body);

    // Create initial analytics record for the course
    await CourseAnalytics.getOrCreate(course._id);
    
    res.status(201).json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error('Error creating course:', error);
    
    // Handle duplicate slug error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        msg: 'A course with this title already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      msg: 'Server error'
    });
  }
};

/**
 * @desc    Update a course
 * @route   PUT /api/courses/:id
 * @access  Private (Course Instructor and Admins)
 */
exports.updateCourse = async (req, res) => {
  try {
    let course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        msg: 'Course not found'
      });
    }
    
    // Check if user is the course instructor or an admin
    if (course.instructorId.toString() !== req.user.id.toString() && !req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        msg: 'Access denied: You are not the instructor of this course'
      });
    }
    
    // Update the course
    course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error('Error updating course:', error);
    
    // Handle duplicate slug error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        msg: 'A course with this title already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      msg: 'Server error'
    });
  }
};

/**
 * @desc    Delete a course
 * @route   DELETE /api/courses/:id
 * @access  Private (Course Instructor and Admins)
 */
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        msg: 'Course not found'
      });
    }
    
    // Check if user is the course instructor or an admin
    if (course.instructorId.toString() !== req.user.id.toString() && !req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        msg: 'Access denied: You are not the instructor of this course'
      });
    }
    
    // Start a session for transaction
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      // Delete course analytics
      await CourseAnalytics.findOneAndDelete({ courseId: course._id }, { session });
      
      // Delete the course
      await Course.findByIdAndDelete(req.params.id, { session });
      
      // Commit the transaction
      await session.commitTransaction();
      session.endSession();
      
      res.status(200).json({
        success: true,
        msg: 'Course deleted successfully'
      });
    } catch (error) {
      // Abort transaction on error
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({
      success: false,
      msg: 'Server error'
    });
  }
};

/**
 * @desc    Get instructor courses
 * @route   GET /api/courses/instructor
 * @access  Private (Instructors)
 */
exports.getInstructorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructorId: req.user.id })
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    console.error('Error getting instructor courses:', error);
    res.status(500).json({
      success: false,
      msg: 'Server error'
    });
  }
};

/**
 * @desc    Change course status (publish/archive/draft)
 * @route   PATCH /api/courses/:id/status
 * @access  Private (Course Instructor and Admins)
 */
exports.changeCourseStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['draft', 'published', 'archived'].includes(status)) {
      return res.status(400).json({
        success: false,
        msg: 'Invalid status value'
      });
    }
    
    let course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        msg: 'Course not found'
      });
    }
    
    // Check if user is the course instructor or an admin
    if (course.instructorId.toString() !== req.user.id.toString() && !req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        msg: 'Access denied: You are not the instructor of this course'
      });
    }
    
    // Update status
    course.status = status;
    await course.save();
    
    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error('Error changing course status:', error);
    res.status(500).json({
      success: false,
      msg: 'Server error'
    });
  }
};

/**
 * @desc    Get course analytics
 * @route   GET /api/courses/:id/analytics
 * @access  Private (Course Instructor and Admins)
 */
exports.getCourseAnalytics = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        msg: 'Course not found'
      });
    }
    
    // Check if user is the course instructor or an admin
    if (course.instructorId.toString() !== req.user.id.toString() && !req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        msg: 'Access denied: You are not the instructor of this course'
      });
    }
    
    let analytics = await CourseAnalytics.findOne({ courseId: course._id });
    
    if (!analytics) {
      analytics = await CourseAnalytics.getOrCreate(course._id);
    }
    
    res.status(200).json({
      success: true,
      data: analytics
    });
  } catch (error) {
    console.error('Error getting course analytics:', error);
    res.status(500).json({
      success: false,
      msg: 'Server error'
    });
  }
};

/**
 * @desc    Recalculate course analytics
 * @route   POST /api/courses/:id/analytics/recalculate
 * @access  Private (Course Instructor and Admins)
 */
exports.recalculateCourseAnalytics = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        msg: 'Course not found'
      });
    }
    
    // Check if user is the course instructor or an admin
    if (course.instructorId.toString() !== req.user.id.toString() && !req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        msg: 'Access denied: You are not the instructor of this course'
      });
    }
    
    let analytics = await CourseAnalytics.findOne({ courseId: course._id });
    
    if (!analytics) {
      analytics = await CourseAnalytics.getOrCreate(course._id);
    }
    
    // Recalculate analytics
    analytics = await analytics.recalculate();
    
    res.status(200).json({
      success: true,
      data: analytics
    });
  } catch (error) {
    console.error('Error recalculating course analytics:', error);
    res.status(500).json({
      success: false,
      msg: 'Server error'
    });
  }
};