require('dotenv').config();
const db = require('./connection');
const logger = require('../config/winston');

beforeAll(() => db.authenticate().then(() => {
  logger.info(`Connected to ${process.env.DBNAME} for testing`);
})
  .catch((err) => logger.error(`Failed to connect to ${process.env.DBNAME} for testing, this was the error ${err}`)));
