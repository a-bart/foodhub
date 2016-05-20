var Sequelize = require('sequelize');
var config = require('./config/config');

var db = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: false
});

module.exports = db;
