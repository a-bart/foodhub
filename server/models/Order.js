module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
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
    isPaid: {
      field: 'is_paid',
      type: DataTypes.BOOLEAN
    },
    sessionId: {
      field: 'session_id',
      type: DataTypes.INTEGER(11)
    },
    userId: {
      field: 'user_id',
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
    tableName: 'orders',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
};
