const mongoose = require('mongoose');
const logger = require('../utils/logger'); // Import the logger utility

const connectMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info('Connected to MongoDB');
  } catch (err) {
    logger.error('Error connecting to MongoDB:', err);
  }
};

module.exports = connectMongoDb;