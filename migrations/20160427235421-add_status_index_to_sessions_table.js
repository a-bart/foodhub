'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addIndex('sessions', ['status'])
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeIndex('sessions', ['status'])
  }
};
