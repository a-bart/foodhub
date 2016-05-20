var errors = require('../errors/errors');
var models = require('../models/models');
var checkout = require('../lib/checkout');
var _ = require('lodash');

var fullQueryOptions = {
  attributes: ['id'],
  include: [{
    model: models.User,
    as: 'owner',
    attributes: ['id']
  }, {
    model: models.Shop,
    as: 'shop',
    attributes: ['siteUrl']
  }, {
    model: models.Order,
    as: 'orders',
    attributes: ['id'],
    include: {
      model: models.FoodOrder,
      as: 'foodOrders',
      attributes: ['quantity'],
      include: {
        model: models.Food,
        as: 'food',
        attributes: ['externalFoodId'],
        include: {
          model: models.FoodCategory,
          as: 'category',
          attributes: ['name']
        }
      }
    }
  }]
};

var userAttributes = ['firstName', 'lastName', 'email', 'phone', 'address'];

exports.create = function(request, response, next) {
  models.Session.findById(request.body.id, fullQueryOptions).then(function(session) {
    if (!session) {
      throw new errors.notFound('Session not found');
    }
    if (session.owner.id !== request.user.id) {
      throw new errors.forbidden('You are not allowed to order on this session');
    }
    var user = _.pick(request.body.user, userAttributes);
    var foodOrders = _.flatMap(session.orders, 'foodOrders');
    var products = _.map(foodOrders, function(foodOrder) {return {id: foodOrder.food.externalFoodId, count: foodOrder.quantity, category: foodOrder.food.category.name};});
    var data = {
      user: user,
      shop: session.shop.siteUrl,
      products: products
    };
    checkout(data);
    response.status(200).json({ session: data });
  }).catch(function(error) {
    return next(error);
  });
};
