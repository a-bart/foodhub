'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'foods', {
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
        description: {
          type: Sequelize.TEXT
        },
        image_url: {
          type: Sequelize.TEXT
        },
        price: {
          type: Sequelize.INTEGER(11)
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
        category_id: {
          type: Sequelize.INTEGER(11),
          references: {
            model: 'food_categories',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        external_food_id: {
          type: Sequelize.STRING,
          allowNull: false
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
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('foods');
  }
};
