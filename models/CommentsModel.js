const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Comments = sequelize.define(
	'comments',
	{
		id: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		articleid: {
			type: Sequelize.INTEGER(11),
			allowNull: false
		},
		body: {
			type: Sequelize.TEXT,
			allowNull: false
		}
	});
	
	module.exports = Comments;