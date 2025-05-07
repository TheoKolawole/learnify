const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VerificationCodeSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['email', 'phone'],
    required: true
  },
  code: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 } // Documents will be automatically deleted when expiresAt is reached
  },
  isUsed: {
    type: Boolean,
    default: false
  },
  attempts: {
    type: Number,
    default: 0
  },
  maxAttempts: {
    type: Number,
    default: 5
  }
}, {
  timestamps: true
});

// Create a compound index for userId and type to ensure a user can only have one active code per type
VerificationCodeSchema.index({ userId: 1, type: 1 });

// Method to validate a submitted verification code
VerificationCodeSchema.methods.validateCode = function(submittedCode) {
  // Check if code is expired
  if (new Date() > this.expiresAt) {
    return { valid: false, reason: 'expired' };
  }
  
  // Check if code has been used
  if (this.isUsed) {
    return { valid: false, reason: 'used' };
  }
  
  // Check if max attempts reached
  if (this.attempts >= this.maxAttempts) {
    return { valid: false, reason: 'maxAttempts' };
  }
  
  // Check if code matches
  if (this.code !== submittedCode) {
    this.attempts += 1;
    return { valid: false, reason: 'invalid' };
  }
  
  return { valid: true };
};

// Static method to create a new verification code
VerificationCodeSchema.statics.createVerificationCode = async function(userId, type, expiryMinutes = 30) {
  // Generate a random 6-digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Calculate expiry date
  const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000);
  
  // Delete any existing codes for this user and type
  await this.deleteMany({ userId, type });
  
  // Create new verification code
  const verificationCode = await this.create({
    userId,
    type,
    code,
    expiresAt
  });
  
  return verificationCode;
};

// Cleanup expired documents periodically (MongoDB TTL index might have a delay)
VerificationCodeSchema.statics.cleanupExpired = async function() {
  return await this.deleteMany({ expiresAt: { $lt: new Date() } });
};

const VerificationCode = mongoose.model('VerificationCode', VerificationCodeSchema);

module.exports = VerificationCode;