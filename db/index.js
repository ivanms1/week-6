const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_URL, { logging: false, operatorsAliases: false });

module.exports = sequelize;