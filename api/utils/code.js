const crypto = require('crypto');

// Generate a random 6-digit verification code
const generateVerificationCode = () => {
  return crypto.randomInt(100000, 999999).toString();
};

module.exports = {
  generateVerificationCode
};