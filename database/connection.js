const Sequelize = require('sequelize');
const logger = require('../config/winston');

const dbName = process.env.DBNAME || 'sdcProduct';
const dbUser = 'student';
const dbPass = process.env.DBPASS || 'student';

const db = new Sequelize(dbName, dbUser, dbPass, {
  host: 'localhost',
  dialect: 'mariadb',
  logging: (msg) => logger.debug(msg),
});

module.exports = db;
