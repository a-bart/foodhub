module.exports = function(sequelize, DataTypes) {
  return sequelize.define('shops', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    siteUrl: {
      field: 'site_url',
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    logoUrl: {
      field: 'logo_url',
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    description: {
      type: DataTypes.TEXT
    },
    deliveryPrice: {
      field: 'delivery_price',
      type: DataTypes.INTEGER(11),
      allowNull: true,
      validate: {
        min: 0
      }
    },
    minOrderPrice: {
      field: 'min_order_price',
      type: DataTypes.INTEGER(11),
      allowNull: true,
      validate: {
        min: 0
      }
    },
    minFreeDeliveryPrice: {
      field: 'min_free_delivery_price',
      type: DataTypes.INTEGER(11),
      allowNull: true,
      validate: {
        min: 0
      }
    },
    deliveryTime: {
      field: 'delivery_time',
      type: DataTypes.TEXT
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
    tableName: 'shops',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
};
