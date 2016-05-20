var errors = require('../errors/errors');
var models = require('../models/models');
var _ = require('lodash');

var queryOptions = {
  attributes: { exclude: ['token', 'tokenExpiresAt', 'createdAt', 'updatedAt'] }
}
var updatedFields = ['firstName', 'lastName', 'email', 'phone', 'paymentOption', 'address', 'avatarUrl'];

exports.index = function(request, response, next) {
  models.User.all(queryOptions).then(function(users) {
    response.status(200).json({ users: users });
  }).catch(function(error) {
    return next(error);
  });
}

exports.show = function(request, response, next) {
  models.User.findById(request.params.id, queryOptions).then(function(user) {
    if (!user) {
      throw new errors.notFound('User not found');
    }
    response.status(200).json(user);
  }).catch(function(error) {
    return next(error);
  });
}

exports.update = function(request, response, next) {
  models.User.findById(request.body.id, queryOptions).then(function(user) {
    if (!user) {
      throw new errors.notFound('User not found');
    }
    return user;
  }).then(function(user) {
    user.updateAttributes(_.pick(request.body, updatedFields));
    return user.save();
  }).then(function(user) {
    var attributes = ['id', 'firstName', 'lastName', 'email', 'phone', 'paymentOption', 'address', 'avatarUrl', 'registrationService', 'externalUserId'];
    response.cookie('currentUser', JSON.stringify(_.pick(user, attributes)));

    response.status(200).json(user);
  }).catch(function(error) {
    return next(error);
  });
}
