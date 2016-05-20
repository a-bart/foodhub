'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    var now = new Date(); 
    return queryInterface.bulkInsert('food_orders', [
      { 
        id: 1,
        price: 100000,
        quantity: 3,
        food_id: 1,
        order_id: 1,
        created_at: now,
        updated_at: now
      }, {
        id: 2,
        price: 100000,
        quantity: 1,
        food_id: 2,
        order_id: 2,
        created_at: now,
        updated_at: now
      }, { 
        id: 3,
        price: 100000,
        quantity: 2,
        food_id: 2,
        order_id: 3,
        created_at: now,
        updated_at: now
      }, {
        id: 4,
        price: 100000,
        quantity: 5,
        food_id: 1,
        order_id: 4,
        created_at: now,
        updated_at: now
      }
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('food_orders', [{id: 1}, {id: 2}, {id: 3}, {id: 4}]);
  }
};
