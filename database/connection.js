const Sequelize = require('sequelize');
require('dotenv').config();

const logger = require('../config/winston');

const dbName = process.env.DBNAME;
const dbUser = process.env.DBUSER;
const dbPass = process.env.DBPASS;
const dbEndpoint = process.env.ENDPOINT;

const db = new Sequelize(dbName, dbUser, dbPass, {
  host: dbEndpoint,
  dialect: 'mariadb',
  logging: (msg) => logger.debug(msg),
  pool: {
    max: 5,
    min: 0,
  },
});

module.exports = db;
