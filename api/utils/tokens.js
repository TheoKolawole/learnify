/**
 * Utility functions for generating and verifying tokens.
 */

const jwt = require('jsonwebtoken');
const crypto = require('crypto');

/**
 * Generates a JWT token with user ID and role
 * @param {Object} payload - Object containing user data (id and optionally role)
 * @param {string} expiry - Token expiration time (e.g., '15m', '1d')
 * @returns {string} - JWT token
 */
const generateToken = (payload, expiry) => {
  const secret = process.env.JWT_SECRET;
  
  // Ensure we have a clean payload object with only the needed properties
  const tokenPayload = {
    id: payload.id
  };
  
  // Add role to token payload if provided
  if (payload.role) {
    tokenPayload.role = payload.role;
  }
  
  return jwt.sign(tokenPayload, secret, { expiresIn: expiry });
};

/**
 * Verifies a JWT token
 * @param {string} token - JWT token to verify
 * @returns {Promise<Object>} - Decoded token payload
 */
const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET;
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
};

module.exports = {
  generateToken,
  verifyToken
};