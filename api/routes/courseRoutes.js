const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const courseController = require('../controllers/courseController');
const { validateRequest } = require('../middlewares/validateRequest');
const { authenticate, authorize } = require('../middlewares/auth');
const { createCourseValidation, updateCourseValidation, changeCourseStatusValidation } = require('../middlewares/courseValidation');
const parseFormData = require('../middlewares/parseFormData');


// Public routes
router.get('/', courseController.getAllCourses);
router.get('/slug/:slug', courseController.getCourseBySlug);

// Protected routes - require authentication
router.use(authenticate);

// get course by ID - only for instructors
router.get('/:id', courseController.getCourseById);
// Get instructor's courses
router.get('/instructor/me', courseController.getInstructorCourses);

// Create course - only instructors and admins
router.post(
  '/create',
  authorize(['instructor', 'admin']),
  parseFormData,
  createCourseValidation,
  validateRequest,
  courseController.createCourse
);

// Update course - only course instructor and admins
router.put('/:id', updateCourseValidation, validateRequest, courseController.updateCourse);

// Delete course - only course instructor and admins
router.delete('/:id', courseController.deleteCourse);

// Change course status - only course instructor and admins
router.patch('/:id/status', changeCourseStatusValidation, validateRequest, courseController.changeCourseStatus);

// Course analytics endpoints
router.get('/:id/analytics', courseController.getCourseAnalytics);
router.post('/:id/analytics/recalculate', courseController.recalculateCourseAnalytics);

module.exports = router;