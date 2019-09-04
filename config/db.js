const Sequelize = require('sequelize');

const sequalize = new Sequelize('nbc', 'root', '', {
	host: '127.0.0.1',
	dialect: 'mysql'
});

module.exports = sequalize;