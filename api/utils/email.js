const nodemailer = require('nodemailer');
const VerificationCode = require('../models/VerificationCode');
const logger = require('./logger');

// Email transporter setup
const transporter = nodemailer.createTransport({
  host: 'teyweb.com',        // Outgoing mail server (SMTP)
  port: 465,                 // SMTP Port (465 for SSL)
  secure: true,              // Use SSL (true for 465, false for other ports)
  auth: {
    user: process.env.EMAIL_USER,  // Your email address
    pass: process.env.EMAIL_PASS // Your email password
  },
  tls: {
    rejectUnauthorized: false // To handle possible certificate issues
  }
});

// Send email verification code
const sendEmailVerificationCode = async (userId, email) => {
  try {
    // Create a new verification code
    const verification = await VerificationCode.createVerificationCode(userId, 'email', 30);
    
    // Send email with verification code
    await transporter.sendMail({
      from: `Learnify <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Email Verification Code',
      text: `Your verification code is: ${verification.code}. This code will expire in 30 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Email Verification</h2>
          <p>Thank you for registering. To verify your email address, please use the following code:</p>
          <div style="background-color: #f4f4f4; padding: 10px; font-size: 24px; text-align: center; letter-spacing: 5px; font-weight: bold;">
            ${verification.code}
          </div>
          <p>This code will expire in 30 minutes.</p>
        </div>
      `
    });
    
    return true;
  } catch (error) {
    logger.error('Error sending email verification code:', error);
    throw error;
  }
};

// Send password reset email
const sendPasswordResetEmail = async (email, resetToken) => {
  try {
    // The frontend URL where user will reset their password
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    
    // Send email with password reset link
    await transporter.sendMail({
      from: `Learnify <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Request',
      text: `You are receiving this email because you (or someone else) has requested to reset your password. 
    
              Please click on the following link to reset your password:
              ${resetUrl}

              If you didn't request this, please ignore this email and your password will remain unchanged.

              This link is valid for 1 hour only.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Password Reset Request</h2>
          <p>You are receiving this email because you (or someone else) has requested to reset your password.</p>
          <p>Please click on the following link to reset your password:</p>
          <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a>
          <p>If you didn't request this, please ignore this email and your password will remain unchanged.</p>
          <p>This link is valid for 1 hour only.</p>
        </div>
      `
    });
    
    return true;
  } catch (error) {
    logger.error('Error sending password reset email:', error);
    throw error;
  }
};

module.exports = {
  sendEmailVerificationCode,
  sendPasswordResetEmail,
};