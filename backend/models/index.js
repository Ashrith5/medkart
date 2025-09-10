'use strict';

const Sequelize = require('sequelize');
const config = require(__dirname + '/../config/config.json')[process.env.NODE_ENV || 'development'];
const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config.database, config.username, config.password, config);

const db = {};

// Manually import models
db.User = require('../models/userModel'); // your current User.js
// add other models similarly if needed
// db.Product = require('./Product');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
