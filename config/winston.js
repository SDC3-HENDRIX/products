require('dotenv').config();
const { createLogger, format, transports } = require('winston');
const path = require('path');

const {
  combine,
  timestamp,
  json,
  prettyPrint,
  colorize,
  simple,
} = format;

const logPath = path.join(__dirname, '../logs/combined.log');
const errorPath = path.join(__dirname, '../logs/error.log');

const logger = createLogger({
  level: 'info',
  maxsize: 5242880,
  maxFiles: 5,
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    prettyPrint(),
    json(),
  ),
  defaultMeta: { service: 'sdc-products' },
  transports: [
    new transports.File({ filename: logPath }),
    new transports.File({
      level: 'error',
      filename: errorPath,
    }),
  ],
  exitOnError: false,
});

// allows morgan to write to the stream
logger.stream = {
  write: (message) => {
    logger.info(message);
  },
};

// If we are in dev also log to console
if (process.env.NODE_ENV === 'development') {
  logger.add(new transports.Console({
    format: combine(
      timestamp(),
      colorize(),
      simple(),
    ),
  }));
}

module.exports = logger;
