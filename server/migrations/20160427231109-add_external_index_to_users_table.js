'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addIndex('users', ['registration_service', 'external_user_id'])
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeIndex('users', ['registration_service', 'external_user_id'])
  }
};
