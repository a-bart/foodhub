'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addIndex('shops', ['name'])
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeIndex('shops', ['name'])
  }
};
