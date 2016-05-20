'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    var now = new Date(); 
    return queryInterface.bulkInsert('sessions', [
      { 
        id: 1,
        shop_id: 1,
        order_time: now,
        delivery_time: null,
        address: "г. Минск",
        price: 950000,
        user_id: 1,
        status: 0,
        created_at: now,
        updated_at: now
      }, {
        id: 2,
        shop_id: 2,
        order_time: now,
        delivery_time: null,
        address: "г. Минск",
        price: 400000,
        user_id: 2,
        status: 1,
        created_at: now,
        updated_at: now
      }
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('sessions', [{id: 1}, {id: 2}]);
  }
};
