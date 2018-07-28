const Sequelize = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Website = sequelize.define('website', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: false
	},
	url: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isUrl: true
		}
	},
	status: {
		type: Sequelize.STRING,
		defaultValue: 'online',
		allowNull: false,
	}	
})

Website.belongsTo(User);

module.exports = Website;