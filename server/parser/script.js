'use strict';

var PizzaTempo = require('./PizzaTempo');
var db = require('../db');
var models = require('../models/models');

var parsers = [
  {
    name: 'Пицца Темпо',
    parser: new PizzaTempo()
  }
];

parsers.forEach((item) => {
  build(item.name, item.parser);
});

function build(name, parser) {
  var shopPromise = models.Shop.findOne({where: {name: name}});
  var productsPromise = parser.getProducts();

  Promise.all([shopPromise, productsPromise]).then((res) => {
    var shopId = res[0].id;
    var products = res[1];
    var category = {};
    products = products.map((item) => {
      category[item.category] = true;

      return {
        name: item.name,
        description: item.description,
        imageUrl: item.imageUrl,
        price: item.price,
        category: item.category,
        externalFoodId: item.externalFoodId
      };
    });

    category = Object.keys(category).map((item) => {
      return {
        name: item,
        shopId: shopId
      };
    });

    db.transaction((t) => {

      return models.FoodCategory.destroy({
        where: {},
        transaction: t
      }).then(() => {
        return models.Food.destroy({
          where: {},
          transaction: t
        });
      }).then(() => {
        return models.FoodCategory.bulkCreate(category, {
          transaction: t
        });
      }).then(() => {
        return models.FoodCategory.findAll({
          where: {
            shopId: shopId
          },
          transaction: t
        });
      }).then((categories) => {
        products = products.map((item) => {
          categories.forEach((category) => {
            if (category.name == item.category) {
              item.categoryId = category.id;
              item.shopId = category.shopId;
            }
          });
          delete item.category;
          return item;
        });
        return models.Food.bulkCreate(products, {
          transaction: t
        });
      });
    });
  });
}
