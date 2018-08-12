const Sequelize = require('sequelize');

const dbUrl = process.env.NODE_ENV !== 'test' ? process.env.DB_URL : process.env.TEST_DB;

const sequelize = new Sequelize(dbUrl, { logging: false, operatorsAliases: false });

module.exports = sequelize;