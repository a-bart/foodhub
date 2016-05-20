'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.renameColumn('orders', 'is_payed', 'is_paid');
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.renameColumn('orders', 'is_paid', 'is_payed');
  }
};
