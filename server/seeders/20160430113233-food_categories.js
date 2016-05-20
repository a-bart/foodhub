'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    var now = new Date();
    let i = 1;

    return queryInterface.bulkInsert('food_categories', [
      {id: i++, shop_id: 1, name: "Пицца", created_at: now, updated_at: now}, 
      {id: i++, shop_id: 1, name: "Салаты, закуски", created_at: now, updated_at: now}, 
      {id: i++, shop_id: 1, name: "Супы и обеды", created_at: now, updated_at: now}, 
      {id: i++, shop_id: 1, name: "Паста", created_at: now, updated_at: now}, 
      {id: i++, shop_id: 1, name: "Горячие блюда", created_at: now, updated_at: now}, 
      {id: i++, shop_id: 1, name: "Напитки", created_at: now, updated_at: now}, 
      {id: i++, shop_id: 1, name: "Завтраки", created_at: now, updated_at: now}, 
      {id: i++, shop_id: 1, name: "Десерты, хлеб", created_at: now, updated_at: now}, 

      {id: i++, shop_id: 2, name: "Пицца", created_at: now, updated_at: now}, 
      {id: i++, shop_id: 2, name: "Суши", created_at: now, updated_at: now}, 
      {id: i++, shop_id: 2, name: "Завтраки", created_at: now, updated_at: now}, 
      {id: i++, shop_id: 2, name: "Обеденное меню", created_at: now, updated_at: now}, 
      {id: i++, shop_id: 2, name: "Холодные и горячие закуски", created_at: now, updated_at: now}, 
      {id: i++, shop_id: 2, name: "Салаты", created_at: now, updated_at: now}, 
      {id: i++, shop_id: 2, name: "Супы", created_at: now, updated_at: now}, 
      {id: i++, shop_id: 2, name: "Горячие блюда", created_at: now, updated_at: now}, 
      {id: i++, shop_id: 2, name: "Гарниры", created_at: now, updated_at: now}, 
      {id: i++, shop_id: 2, name: "Паста", created_at: now, updated_at: now}, 
      {id: i++, shop_id: 2, name: "Буррито", created_at: now, updated_at: now}, 
      {id: i++, shop_id: 2, name: "Десерты", created_at: now, updated_at: now}, 
      {id: i++, shop_id: 2, name: "Напитки", created_at: now, updated_at: now}, 
      {id: i++, shop_id: 2, name: "Хлеб, соус", created_at: now, updated_at: now}, 
      {id: i++, shop_id: 2, name: "Блюда за бонусы", created_at: now, updated_at: now}, 
      {id: i++, shop_id: 2, name: "Детское мен", created_at: now, updated_at: now}, 

    ]);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('food_categories', [{id: 1}, {id: 2}, {id: 3}, {id: 4}]);
  }
};
