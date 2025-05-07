require('dotenv').config();
const express = require('express');
const routes = require('./routes'); // Import routes
const corsConfig = require('./config/corsConfig'); // Import CORS config
const cookieParser = require('cookie-parser');
const logger = require('./utils/logger'); // Import logger
const connectMongoDb = require('./config/mongo');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(corsConfig);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Use routes
app.use('/', routes);

// Basic error handling for unhandled routes
app.use((req, res) => {
  logger.warn(`404 - Page not found - ${req.originalUrl}`);
  res.status(404).send('Page not found.');
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(`500 - Error: ${err.message}`, { stack: err.stack });
  res.status(500).send('Something went wrong!');
});

// Database connections and server startup
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectMongoDb();

    // Start the server
    app.listen(PORT, () => {
    });
  } catch (err) {
    logger.error('Error connecting to databases:', { message: err.message, stack: err.stack });
    process.exit(1); // Exit if there is a database connection error
  }
};

// Global handlers for uncaught exceptions and promise rejections
process.on('uncaughtException', (err) => {
  logger.error(`Uncaught Exception: ${err.message}`, { stack: err.stack });
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Unhandled Rejection: ${reason}`, { promise });
  process.exit(1);
});

startServer();