'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'users', {
        id: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        first_name: {
          type: Sequelize.STRING
        },
        last_name: {
          type: Sequelize.STRING
        },
        email: {
          type: Sequelize.STRING
        },
        phone: {
          type: Sequelize.STRING
        },
        payment_option: {
          type: Sequelize.INTEGER(4)
        },
        address: {
          type: Sequelize.TEXT
        },
        avatar_url: {
          type: Sequelize.TEXT
        },
        registration_service: {
          type: Sequelize.INTEGER(11)
        },
        external_user_id: {
          type: Sequelize.BIGINT
        },
        token: {
          type: Sequelize.STRING
        },
        token_expires_at: {
          type: Sequelize.DATE
        },
        created_at: {
          type: Sequelize.DATE
        },
        updated_at: {
          type: Sequelize.DATE
        }
      }, { 
        charset: 'utf8',
        collate: 'utf8_general_ci'
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
