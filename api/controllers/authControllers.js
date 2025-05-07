const User = require("../models/User");
const VerificationCode = require("../models/VerificationCode");
const bcryptjs = require('bcryptjs');
const { verifyToken, generateToken } = require("../utils/tokens");
const logger = require('../utils/logger');
const { sendEmailVerificationCode, sendPasswordResetEmail } = require("../utils/email");
const crypto = require('crypto');

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }
    
    // MongoDB query using Mongoose
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ msg: 'Invalid password' });
    }
    
    const accessToken = generateToken({ id: user._id }, '15m')
    const refreshToken = generateToken({ id: user._id }, '1d')
    
    res.cookie('refreshToken', refreshToken, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict' 
    });
    
    res.json({ 
      status: 'success', 
      accessToken,
      emailVerified: user.emailVerified,
      phoneVerified: user.phoneVerified,
      isVerified: user.isVerified
    });
  } catch (error) {
    logger.error(error); // Log error for debugging
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

const register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  
  try {
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    
    // MongoDB queries using Mongoose
    const userByEmail = await User.findOne({ email });
    if (userByEmail) {
      return res.status(400).json({ msg: 'Email has already been used by another user!' });
    }
    
    const hashedPassword = await bcryptjs.hash(password, 10);
    
    // Create new user with MongoDB/Mongoose
    const user = await User.create({ 
      firstname, 
      lastname, 
      email, 
      passport: null, 
      password: hashedPassword,
      emailVerified: false,
      phoneVerified: false,
      isVerified: false
    });

    const accessToken = generateToken({ id: user._id }, '15m')
    const refreshToken = generateToken({ id: user._id }, '1d')
    
    res.cookie('refreshToken', refreshToken, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict' 
    });
    
    // Automatically send email verification code
    await sendEmailVerificationCode(user._id, email);
    
    res.json({ 
      status: 'success', 
      accessToken,
      msg: 'Registration successful. A verification code has been sent to your email.' 
    });
  } catch (error) {
    logger.error(error); // Log error for debugging
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

const refreshToken = async (req, res) => {
  const refreshToken = req?.cookies?.refreshToken;
  const { withProfile } = req.body;
  
  // Check if refresh token is present
  if (!refreshToken) {
    return res.status(200).json({ authenticated: false });
  }

  try {
    const decoded = await verifyToken(refreshToken);
    const accessToken = generateToken({ id: decoded.id }, '15m');
    
    let userInfo = {};
    if (withProfile) {
      // MongoDB query using Mongoose
      const user = await User.findById(decoded.id);
      
      if (user) {
        userInfo = { 
          firstname: user.firstname, 
          lastname: user.lastname, 
          email: user.email, 
          passport: user.passport,
          emailVerified: user.emailVerified,
          phoneVerified: user.phoneVerified,
          isVerified: user.isVerified
        };
      }
    }
    
    res.json({ authenticated: true, accessToken, userInfo });
  } catch (err) {
    logger.error(err); // Log error for debugging
    return res.status(500).json({ authenticated: false });
  }
};

// Logout function to clear refresh token cookie
const logout = async (req, res) => {
  try {
    // Clear the refreshToken cookie
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    
    res.json({ 
      status: 'success', 
      msg: 'Successfully logged out' 
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

// Request email verification code
const requestEmailVerification = async (req, res) => {
  try {
    const userId = req.user.id; // From auth middleware
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    if (user.emailVerified) {
      return res.status(400).json({ msg: 'Email already verified' });
    }
    
    await sendEmailVerificationCode(userId, user.email);
    
    res.json({ 
      status: 'success', 
      msg: 'Verification code sent to your email' 
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

// Verify email with code
const verifyEmail = async (req, res) => {
  try {
    const { code } = req.body;
    const userId = req.user.id; // From auth middleware
    
    if (!code) {
      return res.status(400).json({ msg: 'Verification code is required' });
    }
    
    // Find the verification code
    const verificationRecord = await VerificationCode.findOne({
      userId,
      type: 'email',
      isUsed: false
    });
    
    if (!verificationRecord) {
      return res.status(400).json({ msg: 'Verification code not found. Please request a new one.' });
    }
    
    // Validate the code
    const validationResult = verificationRecord.validateCode(code);
    
    if (!validationResult.valid) {
      // Save the increased attempts count
      if (validationResult.reason === 'invalid') {
        await verificationRecord.save();
        return res.status(400).json({ 
          msg: 'Invalid verification code', 
          attemptsLeft: verificationRecord.maxAttempts - verificationRecord.attempts 
        });
      }
      
      if (validationResult.reason === 'expired') {
        return res.status(400).json({ msg: 'Verification code has expired. Please request a new one.' });
      }
      
      if (validationResult.reason === 'used') {
        return res.status(400).json({ msg: 'Verification code has already been used. Please request a new one.' });
      }
      
      if (validationResult.reason === 'maxAttempts') {
        return res.status(400).json({ msg: 'Too many failed attempts. Please request a new code.' });
      }
      
      return res.status(400).json({ msg: 'Verification failed.' });
    }
    
    // Mark code as used
    verificationRecord.isUsed = true;
    await verificationRecord.save();
    
    // Update user's email verification status
    await User.findByIdAndUpdate(userId, { emailVerified: true });
    
    // Check if both email and phone are verified
    const user = await User.findById(userId);
    if (user.emailVerified && (user.phoneVerified || !user.phonenumber)) {
      await User.findByIdAndUpdate(userId, { isVerified: true });
    }
    
    res.json({ 
      status: 'success', 
      msg: 'Email verified successfully',
      emailVerified: true,
      isVerified: user.phoneVerified || !user.phonenumber // If phone is verified or not present, user is fully verified
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};


// Request password reset
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ msg: "Email is required" });
    }
    
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      // For security reasons, we still return success even if email doesn't exist
      return res.json({ 
        status: 'success', 
        msg: 'If your email is registered, you will receive a password reset link' 
      });
    }
    
    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // Hash the token before storing it
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    
    // Set token expiration (1 hour)
    const tokenExpiration = Date.now() + 3600000;
    
    // Save token to user
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = tokenExpiration;
    await user.save();
    
    // Send the reset email
    await sendPasswordResetEmail(user.email, resetToken);
    
    res.json({ 
      status: 'success', 
      msg: 'Password reset link sent to your email' 
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

// Verify reset token
const verifyResetToken = async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ msg: "Token is required" });
    }
    
    // Hash the provided token
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');
    
    // Find user with this token that hasn't expired
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ msg: 'Invalid or expired token' });
    }
    
    res.json({ 
      status: 'success', 
      valid: true 
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

// Reset password with token
const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    
    if (!token || !password) {
      return res.status(400).json({ msg: "Token and new password are required" });
    }
    
    // Hash the provided token
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');
    
    // Find user with this token that hasn't expired
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ msg: 'Invalid or expired token' });
    }
    
    // Hash the new password
    const hashedPassword = await bcryptjs.hash(password, 10);
    
    // Update user's password and clear the reset token fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    
    res.json({ 
      status: 'success', 
      msg: 'Password has been reset successfully',
      email: user.email
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

module.exports = {
  login,
  register,
  refreshToken,
  logout,
  requestEmailVerification,
  verifyEmail,
  forgotPassword,
  verifyResetToken,
  resetPassword
};