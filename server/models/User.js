var Sequelize = require('sequelize');
var db = require('../db');

var User = db.define('users', {
  id: {
    field: 'id',
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    notNull: true
  },
  firstName: {
    field: 'first_name',
    type: Sequelize.STRING(100),
    defaultValue: null
  },
  lastName: {
    field: 'last_name',
    type: Sequelize.STRING(100),
    defaultValue: null
  },
  email: {
    field: 'email',
    type: Sequelize.STRING(250),
    defaultValue: null
  },
  phone: {
    field: 'phone',
    type: Sequelize.STRING(50),
    defaultValue: null
  },
  paymentOption: {
    field: 'payment_option',
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  address: {
    field: 'address',
    type: Sequelize.TEXT,
    defaultValue: null
  },
  avatarUrl: {
    field: 'avatar_url',
    type: Sequelize.TEXT,
    defaultValue: null
  },
  registrationService: {
    field: 'registration_service',
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  externalUserId: {
    field: 'external_user_id',
    type: Sequelize.BIGINT,
    defaultValue: null
  },
  token: {
    field: 'token',
    type: Sequelize.STRING(50),
    defaultValue: null
  },
  tokenExpiresAt: {
    field: 'token_expires_at',
    type: Sequelize.DATE,
    defaultValue: null
  }
}, {
  freezeTableName: true,
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at'
});

module.exports = User;