/**
 * Middleware to validate the request using express-validator.
 * If validation errors are found, it responds with a 400 status and the errors.
 * Otherwise, it proceeds to the next middleware.
 */

const { validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Extract the first error message and return it in the expected format
    return res.status(400).json({ msg: errors.array()[0].msg });
  }
  next();
};

module.exports = {
  validateRequest,
};
