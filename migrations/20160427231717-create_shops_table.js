'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'shops', {
        id: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        site_url: {
          type: Sequelize.TEXT
        },
        logo_url: {
          type: Sequelize.TEXT
        },
        description: {
          type: Sequelize.TEXT
        },
        delivery_price: {
          type: Sequelize.INTEGER(11)
        },
        min_order_price: {
          type: Sequelize.INTEGER(11)
        },
        min_free_delivery_price: {
          type: Sequelize.INTEGER(11)
        },
        delivery_time: {
          type: Sequelize.TEXT
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
    return queryInterface.dropTable('shops');
  }
};
