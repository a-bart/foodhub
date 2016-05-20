module.exports = function(sequelize, DataTypes) {
  return sequelize.define('food_orders', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    price: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      validate: {
        min: 0
      }
    },
    quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      validate: {
        min: 0
      }
    },
    foodId: {
      field: 'food_id',
      type: DataTypes.INTEGER(11)
    },
    orderId: {
      field: 'order_id',
      type: DataTypes.INTEGER(11)
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE
    }
  }, {
    tableName: 'food_orders',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
};
