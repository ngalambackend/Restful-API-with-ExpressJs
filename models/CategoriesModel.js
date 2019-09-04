const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Categories = sequelize.define(
	'categories',
	{
		id: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: Sequelize.STRING(50),
			allowNull: false
		}
	});
	
	module.exports = Categories;