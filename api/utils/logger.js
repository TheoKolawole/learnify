// Logger utility using Winston for logging with daily rotation

const winston = require('winston');
require('winston-daily-rotate-file');

const logDirectory = 'logs'; // Directory to store log files

const logger = winston.createLogger({
  level: 'info', // Default log level (info, error, warn, debug, etc.)
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, stack }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
    })
  ),
  transports: [
    // Console Transport (for development)
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, stack }) => {
          return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
        })
      )
    }),

    // Daily Rotate File Transport for general logs
    new winston.transports.DailyRotateFile({
      filename: `${logDirectory}/application-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m', // Max size of each log file
      maxFiles: '14d' // Retain logs for 14 days
    }),

    // Daily Rotate File Transport for error logs
    new winston.transports.DailyRotateFile({
      level: 'error',
      filename: `${logDirectory}/errors-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m', // Max size of each log file
      maxFiles: '30d' // Retain error logs for 30 days
    })
  ]
});

module.exports = logger;
