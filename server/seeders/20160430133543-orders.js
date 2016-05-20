'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    var now = new Date(); 
    return queryInterface.bulkInsert('orders', [
      { 
        id: 1,
        price: 100000,
        is_paid: true,
        session_id: 1,
        user_id: 1,
        created_at: now,
        updated_at: now
      }, {
        id: 2,
        price: 50000,
        is_paid: false,
        session_id: 1,
        user_id: 2,
        created_at: now,
        updated_at: now
      }, { 
        id: 3,
        price: 100000,
        is_paid: true,
        session_id: 2,
        user_id: 1,
        created_at: now,
        updated_at: now
      }, {
        id: 4,
        price: 50000,
        is_paid: false,
        session_id: 2,
        user_id: 2,
        created_at: now,
        updated_at: now
      }
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('orders', [{id: 1}, {id: 2}, {id: 3}, {id: 4}]);
  }
};
