const Sequelize = require('Sequelize');
const sequelize = require('../config/db');

const Articles = sequelize.define(
	'articles',
	{
		id: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		categoryid: {
			type: Sequelize.INTEGER(11),
			allowNull: false
		},
		title: {
			type: Sequelize.STRING(100),
			allowNull: false
		},
		body: {
			type: Sequelize.TEXT,
			allowNull: false
		}
	});
	
	module.exports = Articles;