const jwt = require('jsonwebtoken');
const { verifyToken } = require('../utils/tokens');
const logger = require('../utils/logger');

// Middleware to authenticate JWT token
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ msg: 'Authorization token required' });
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = await verifyToken(token);
      req.user = { id: decoded.id };
      next();
    } catch (error) {
      logger.error('Token verification failed:', error);
      return res.status(401).json({ msg: 'Invalid or expired token' });
    }
  } catch (error) {
    logger.error('Authentication error:', error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
};

module.exports = {
  authenticate
};