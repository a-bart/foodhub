var errors = require('../errors/errors');
var models = require('../models/models');
var _ = require('lodash');

var shortQueryOptions = {
  attributes: {
    exclude: ['createdAt', 'updatedAt', 'userId']
  },
  include: {
    model: models.User,
    as: 'owner',
    attributes: ['id', 'firstName', 'lastName']
  }
}

var fullQueryOptions = {
  attributes: {
    exclude: ['createdAt', 'updatedAt', 'userId']
  },
  include: [{
    model: models.User,
    as: 'owner',
    attributes: ['id', 'firstName', 'lastName']
  }, {
    model: models.Order,
    as: 'orders',
    attributes: ['id', 'isPaid', 'price'],
    include: [{
      model: models.User,
      as: 'owner',
      attributes: ['id', 'firstName', 'lastName']
    }, {
      model: models.FoodOrder,
      as: 'foodOrders',
      attributes: ['id', 'price', 'quantity'],
      include: {
        model: models.Food,
        as: 'food',
        attributes: ['id', 'name', 'description', 'imageUrl', 'price']
      }
    }]
  }]
}

var createdFields = ['shopId', 'orderTime', 'address'];
var updatedFields = ['orderTime', 'deliveryTime', 'address', 'status'];

exports.index = function(request, response, next) {
  models.Session.all(shortQueryOptions).then(function(sessions) {
    response.status(200).json({ sessions: sessions });
  }).catch(function(error) {
    return next(error);
  });
}

exports.show = function(request, response, next) {
  models.Session.findById(request.params.id, fullQueryOptions).then(function(session) {
    if (!session) {
      throw new errors.notFound('Session not found');
    }
    response.status(200).json(session);
  }).catch(function(error) {
    return next(error);
  });
}

exports.create = function(request, response, next) {
  var sessionOptions = _.pick(request.body, createdFields);
  sessionOptions.userId = request.user.id;
  models.Session.create(sessionOptions).then(function(session) {
    return models.Session.findById(session.id, fullQueryOptions);
  }).then(function(session) {
    response.status(201).json(session);
  }).catch(function(error) {
    return next(error);
  });
}

exports.update = function(request, response, next) {
  models.Session.findById(request.body.id, shortQueryOptions).then(function(session) {
    if (!session) {
      throw new errors.notFound('Session not found');
    }
    if (session.owner.id !== request.user.id) {
      throw new errors.forbidden('You are not allowed to update this session');
    }
    session.updateAttributes(_.pick(request.body, updatedFields));
    return session.save();
  }).then(function(session) {
    response.status(200).json(session);
  }).catch(function(error) {
    return next(error);
  });
}
