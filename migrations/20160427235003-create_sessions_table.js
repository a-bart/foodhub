'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'sessions', {
        id: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        shop_id: {
          type: Sequelize.INTEGER(11),
          references: {
            model: 'shops',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        order_time: {
          type: Sequelize.DATE
        },
        delivery_time: {
          type: Sequelize.DATE
        },
        address: {
          type: Sequelize.TEXT
        },
        price: {
          type: Sequelize.INTEGER(11)
        },
        user_id: {
          type: Sequelize.INTEGER(11),
          references: {
            model: 'users',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        status: {
          type: Sequelize.INTEGER(4),
          allowNull: false,
          defaultValue: '0'
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
    return queryInterface.dropTable('sessions');
  }
};
