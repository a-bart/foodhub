'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'food_orders', {
        id: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        price: {
          type: Sequelize.INTEGER(11)
        },
        quantity: {
          type: Sequelize.INTEGER(11)
        },
        food_id: {
          type: Sequelize.INTEGER(11),
          references: {
            model: 'foods',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        order_id: {
          type: Sequelize.INTEGER(11),
          references: {
            model: 'orders',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
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
    return queryInterface.dropTable('food_orders');
  }
};
