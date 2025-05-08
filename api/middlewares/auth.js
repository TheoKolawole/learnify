/**
 * Authentication and authorization middleware
 */
const { verifyToken } = require('../utils/tokens');
const User = require('../models/User');
const logger = require('../utils/logger');

/**
 * Middleware to authenticate users via JWT token
 */
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ msg: 'No token provided' });
    }
    
    const token = authHeader.split(' ')[1];
    const decoded = await verifyToken(token);
    
    // Add user data to request including role if available
    req.user = { 
      id: decoded.id,
      role: decoded.role || null  // Include role from token if available
    };
    
    next();
  } catch (error) {
    logger.error('Authentication error:', error);
    return res.status(401).json({ msg: 'Invalid or expired token' });
  }
};

/**
 * Middleware to authorize users based on roles
 * @param {Array|String} roles - Single role or array of allowed roles
 */
const authorize = (roles = []) => {
  // Convert string to array if only one role is passed
  if (typeof roles === 'string') {
    roles = [roles];
  }
  
  return async (req, res, next) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ msg: 'Authentication required' });
      }
      
      // If no roles are specified, any authenticated user can access
      if (roles.length === 0) {
        return next();
      }
      
      // If token already has role information and it's in allowed roles, proceed
      if (req.user.role && roles.includes(req.user.role)) {
        return next();
      }
      
      // Otherwise, get user from database to check current role
      // This is a fallback in case the token doesn't have role info
      // or if you want to ensure the role hasn't changed since token issuance
      const user = await User.findById(req.user.id);
      
      if (!user) {
        return res.status(401).json({ msg: 'User not found' });
      }
      
      // Check if user's role is in the authorized roles list
      if (!roles.includes(user.role)) {
        return res.status(403).json({ 
          msg: 'Access forbidden: You do not have the required permissions' 
        });
      }
      
      // Update req.user with the current user data
      req.user.role = user.role;
      
      next();
    } catch (error) {
      logger.error('Authorization error:', error);
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  };
};

module.exports = {
  authenticate,
  authorize
};