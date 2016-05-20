var errors = require('../errors/errors');
var models = require('../models/models');
var db = require('../db');
var _ = require('lodash');

var fullQueryOptions = {
  attributes: ['id', 'isPaid', 'price', 'sessionId'],
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
}

exports.create = function(request, response, next) {
  var sourceSession;
  var sourceOrder;
  var sourceFoods;
  models.Session.findById(request.body.sessionId).then(function(session) { //TODO: add transaction
    sourceSession = session;
    if (!session) {
      throw new errors.notFound('There is no session with this ID');
    }
    var foodOptions = {
      attributes: ['id', 'price'],
      where: { shopId: session.shopId }
    }
    return models.Food.all(foodOptions);
  }).then(function(foods) {
    sourceFoods = foods;
    var foodIds = _.map(foods, 'id');
    var ordersFoodIds = _.map(request.body.foodOrders, 'foodId');
    if (_.difference(ordersFoodIds, foodIds).length !== 0) {
      throw new errors.badRequest('You can add only food from shop ' + sourceSession.shopId);
    }
    var orderPrice = _.sumBy(request.body.foodOrders,
      function(foodOrder) { 
        return _.find(foods, { id: foodOrder.foodId }).price * foodOrder.quantity; //TODO: optimize for better perfomance
      }
    );
    var newOrder = {
      sessionId: sourceSession.id,
      userId: request.user.id,
      price: orderPrice,
      isPaid: false
    }
    return models.Order.create(newOrder, { isNewRecord: true });
  }).then(function(order) {
    sourceOrder = order;
    var newFoodOrdersPromises = _.map(request.body.foodOrders, function(foodOrder) {
      var newFoodOrder = {
        price: _.find(sourceFoods, { id: foodOrder.foodId }).price * foodOrder.quantity, //TODO: optimize for better perfomance
        quantity: foodOrder.quantity,
        foodId: foodOrder.foodId,
        orderId: order.id,
        userId: request.user.id
      }
      return models.FoodOrder.create(newFoodOrder);
    });
    return Promise.all(newFoodOrdersPromises); //TODO: refactor this to be executed in one query
  }).then(function(foodOrders) {
    var rawQuery = 'UPDATE `sessions` SET `price` = (SELECT SUM(`orders`.`price`) FROM `orders` WHERE `orders`.`session_id` = `sessions`.`id`) WHERE `sessions`.`id` = ' + sourceSession.id + ';'
    return db.query(rawQuery, { type: db.QueryTypes.UPDATE }); //TODO: move this to db trigger
  }).then(function(result) {
    return models.Order.findById(sourceOrder.id, fullQueryOptions);
  }).then(function(order) {
    response.status(201).json(order);
  }).catch(function(error) {
    return next(error);
  });
};

exports.update = function(request, response, next) { //TODO: add transaction
  var sourceSession;
  var sourceOrder;
  var sourceFoods;
  models.Order.findById(request.body.id, fullQueryOptions).then(function(order) {  // 1.Checking if this order exists
    sourceOrder = order;
    if (!order) {
      throw new errors.notFound('There is no order with this ID');
    }
    return models.Session.findById(order.sessionId);
  }).then(function(session) {                                                        // 2. Getting session
    sourceSession = session;                                                           
    var foodOptions = {
      attributes: ['id', 'price'],
      where: { shopId: session.shopId }
    }
    return models.Food.all(foodOptions);
  }).then(function(foods) {                                                           // 3. Checking if food ids in request belongs to sessins shop, calculating order price
    sourceFoods = foods;
    var foodIds = _.map(foods, 'id');
    var ordersFoodIds = _.map(request.body.foodOrders, 'foodId');
    if (_.difference(ordersFoodIds, foodIds).length !== 0) {
      throw new errors.badRequest('You can add only food from shop ' + sourceSession.shopId);
    }
    var orderPrice = _.sumBy(request.body.foodOrders,
      function(foodOrder) { 
        return _.find(foods, { id: foodOrder.foodId }).price * foodOrder.quantity; //TODO: optimize for better perfomance
      }
    );
    sourceOrder.updateAttributes({ isPaid: request.body.isPaid, price: orderPrice });
    return sourceOrder.save();
  }).then(function(order) {                                                             // 4. Updating order
    return models.FoodOrder.destroy({ where: { orderId: order.id } });
  }).then(function(result) {                                                            // 5. Deleting old food orders
    var newFoodOrdersPromises = _.map(request.body.foodOrders, function(foodOrder) {
      var newFoodOrder = {
        price: _.find(sourceFoods, { id: foodOrder.foodId }).price * foodOrder.quantity, //TODO: optimize for better perfomance
        quantity: foodOrder.quantity,
        foodId: foodOrder.foodId,
        orderId: sourceOrder.id,
        userId: request.user.id
      }
      return models.FoodOrder.create(newFoodOrder);
    });
    return Promise.all(newFoodOrdersPromises); //TODO: refactor this to be executed in one query
  }).then(function(foodOrders) {                                                           // 6. Creating food orders
    var rawQuery = 'UPDATE `sessions` SET `price` = (SELECT SUM(`orders`.`price`) FROM `orders` WHERE `orders`.`session_id` = `sessions`.`id`) WHERE `sessions`.`id` = ' + sourceSession.id + ';'
    return db.query(rawQuery, { type: db.QueryTypes.UPDATE }); //TODO: move this to db trigger
  }).then(function(result) {                                                                // 7. Updating session price
    return models.Order.findById(sourceOrder.id, fullQueryOptions);
  }).then(function(order) {                                                                // 8. Getting order
    response.status(200).json(order);
  }).catch(function(error) {
    return next(error);
  });
};

exports.delete = function(request, response, next) {
  var sourceOrder;
  models.Order.findById(request.params.id, fullQueryOptions).then(function(order) {
    sourceOrder = order;
    if (!order) {
      throw new errors.notFound('There is no order with this ID');
    }
    return models.Session.findById(order.sessionId);
  }).then(function(session) {
    if (session.userId !== request.user.id && sourceOrder.owner.id !== request.user.id) {
      throw new errors.forbidden('You are not allowed to delete this order');
    }
    return models.Order.destroy({ where: { id: sourceOrder.id } });
  }).then(function(result) {
    response.status(200).json(sourceOrder);
  }).catch(function(error) {
    return next(error);
  });
};
