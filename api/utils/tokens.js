/**
 * Utility functions for generating and verifying tokens.
 */

const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Function to generate access token
const generateToken = (payload, expiry) => {
  const secret = process.env.JWT_SECRET
  return jwt.sign(payload, secret, { expiresIn: expiry });
};

const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET
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
