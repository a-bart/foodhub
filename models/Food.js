module.exports = function(sequelize, DataTypes) {
  return sequelize.define('foods', {
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
    description: {
      type: DataTypes.TEXT
    },
    imageUrl: {
      field: 'image_url',
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.INTEGER(11)
    },
    shopId: {
      field: 'shop_id',
      type: DataTypes.INTEGER(11)
    },
    categoryId: {
      field: 'category_id',
      type: DataTypes.INTEGER(11)
    },
    externalFoodId: {
      field: 'external_food_id',
      type: DataTypes.STRING,
      allowNull: false
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
    tableName: 'foods',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
};
