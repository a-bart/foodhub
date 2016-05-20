module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sessions', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    shopId: {
      field: 'shop_id',
      type: DataTypes.INTEGER(11)
    },
    orderTime: {
      field: 'order_time',
      type: DataTypes.DATE
    },
    deliveryTime: {
      field: 'delivery_time',
      type: DataTypes.DATE
    },
    address: {
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      validate: {
        min: 0
      }
    },
    userId: {
      field: 'user_id',
      type: DataTypes.INTEGER(11)
    },
    status: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
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
    tableName: 'sessions',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
};
