const { check } = require('express-validator');

exports.createCourseValidation = [
  check('title')
    .not().isEmpty().withMessage('Course title is required')
    .isLength({ min: 5, max: 100 }).withMessage('Title must be between 5 and 100 characters'),
  
  check('description')
    .not().isEmpty().withMessage('Course description is required')
    .isLength({ min: 10 }).withMessage('Description must be at least 20 characters'),
  
  check('startDate')
    .not().isEmpty().withMessage('Start date is required')
    .isISO8601().withMessage('Invalid date format'),
  
  check('endDate')
    .optional()
    .isISO8601().withMessage('Invalid date format')
    .custom((endDate, { req }) => {
      if (endDate && new Date(endDate) <= new Date(req.body.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),
  
  check('status')
    .optional()
    .isIn(['draft', 'published', 'archived']).withMessage('Invalid status value')
];

exports.updateCourseValidation = [
  check('title')
    .optional()
    .isLength({ min: 5, max: 100 }).withMessage('Title must be between 5 and 100 characters'),
  
  check('description')
    .optional()
    .isLength({ min: 10 }).withMessage('Description must be at least 20 characters'),
  
  check('startDate')
    .optional()
    .isISO8601().withMessage('Invalid date format'),
  
  check('endDate')
    .optional()
    .isISO8601().withMessage('Invalid date format')
    .custom((endDate, { req }) => {
      if (endDate && req.body.startDate && new Date(endDate) <= new Date(req.body.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),
  
  check('status')
    .optional()
    .isIn(['draft', 'published', 'archived']).withMessage('Invalid status value')
];

exports.changeCourseStatusValidation = [
  check('status')
    .not().isEmpty().withMessage('Status is required')
    .isIn(['draft', 'published', 'archived']).withMessage('Invalid status value')
];