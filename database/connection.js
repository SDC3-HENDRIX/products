const Sequelize = require('sequelize');
require('dotenv').config();

const logger = require('../config/winston');

const dbName = process.env.DBNAME;
const dbUser = process.env.DBUSER;
const dbPass = process.env.NODE_ENV === 'production' ? process.env.DBPASS_PROD : process.env.DBPASS_DEV;

const db = new Sequelize(dbName, dbUser, dbPass, {
  host: 'host.docker.internal',
  dialect: 'mariadb',
  logging: (msg) => logger.debug(msg),
  pool: {
    max: 80,
    min: 0,
  },
});

module.exports = db;
