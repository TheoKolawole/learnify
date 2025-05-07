const express = require('express');
const { 
  login, 
  register, 
  refreshToken,
  requestEmailVerification,
  verifyEmail,
  forgotPassword,
  verifyResetToken,
  resetPassword,
  logout
} = require('../controllers/authControllers');
const { authenticate } = require('../middlewares/auth'); // Auth middleware to verify JWT

const router = express.Router();

// Public routes
router.post('/login', login);
router.post('/register', register);
router.post('/refresh-token', refreshToken);
router.post('/forgot-password', forgotPassword);
router.post('/verify-reset-token', verifyResetToken);
router.post('/reset-password', resetPassword);
router.post('/logout', logout);

// Protected routes (require authentication)
router.post('/request-email-verification', authenticate, requestEmailVerification);
router.post('/verify-email', authenticate, verifyEmail);

module.exports = router;