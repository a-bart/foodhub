'use strict';
//DROP DATABASE if exists foodhubdb;CREATE DATABASE foodhubdb CHARACTER SET utf8 COLLATE utf8_general_ci;
//sequelize db:migrate
//sequelize db:seed:all


module.exports = {
  up: function (queryInterface, Sequelize) {
    var now = new Date();
    let i = 1;

    return queryInterface.bulkInsert('foods', [
      {
        id: i++,
        name: 'Пицца Охотницья',
        description: 'Состав: томатный соус, сыр Моцарелла, лук, шампиньоны, говядина, приправа Тако, соус Сальса, перец чили, чесночное масло, приправа к пицце',
        image_url: 'http://terrapizza.by/components/catalog/load_files/original/718.jpg',
        price: 120000,
        shop_id: 1,
        category_id: 1,
        external_food_id: '1234' + i,
        created_at: now,
        updated_at: now
      }, {
        id: i++,
        name: 'Суп-крем из порея с чипсами бекона',
        description: 'Состав: Лук порей, картофель, сливки, молоко, вино белое, бекон, руккола',
        image_url: 'http://www.eda.by/data/newfiles/1442784752_55304917.jpg',
        price: 80000,
        shop_id: 1,
        category_id: 1,
        external_food_id: '235daJSdj3sjSW' + i,
        created_at: now,
        updated_at: now
      }, {
        id: i++,
        name: 'Цезарь с лососем',
        description: 'лосось жареный, листья салата, заправка салатная с анчоусами, каперсы, сыр Джюгас, сухарики, лимон 195 гр.',
        image_url: 'http://www.pizzatempo.by/i/photo/catalog/products/t/r_143_248x248.jpg',
        price: 52000,
        shop_id: 1,
        category_id: 1,
        external_food_id: '1234' + i,
        created_at: now,
        updated_at: now
      }, {
        id: i++,
        name: 'Салат "Греческий" с бальзам. заправкой',
        description: 'Томатный соус, сыр Моцарелла, ветчина, свинина, соус из майонеза и зелени, лук порей, опята маринованные, ', 
        image_url: 'http://www.pizzatempo.by/i/photo/catalog/products/t/r_142_248x248.jpg',
        price: 52000,
        shop_id: 1,
        category_id: 1,
        external_food_id: '1234' + i,
        created_at: now,
        updated_at: now
      }, {
        id: i++,
        name: 'Салат с копченой говядиной и соусом из зелени',
        description: 'Ветчина, свинина, соус из майонеза и зелени, лук порей, опята маринованные, ',
        image_url: 'http://www.pizzatempo.by/i/photo/catalog/products/t/r_179_248x248.jpg',
        price: 120000,
        shop_id: 1,
        category_id: 1,
        external_food_id: '1234' + i,
        created_at: now,
        updated_at: now
      }, {
        id: i++,
        name: 'Салат с копченой говядиной с пикантным соусом',
        description: 'Салатная с анчоусами, каперсы, сыр Джюгас, сухарики, лимон 195 гр.',
        image_url: 'http://www.pizzatempo.by/i/photo/catalog/products/t/r_365_248x248.jpg',
        price: 100000,
        shop_id: 1,
        category_id: 1,
        external_food_id: '1234' + i,
        created_at: now,
        updated_at: now
      }, {
        id: i++,
        name: 'Салат "Оливье"',
        description: 'Томатный соус, сыр Моцарелла, филе куриное, шампиньоны, перец Пеперони, перец Чили, приправа к пицце',
        image_url: 'http://www.pizzatempo.by/i/photo/catalog/products/t/r_226_248x248.jpg',
        price: 15000,
        shop_id: 1,
        category_id: 2,
        external_food_id: '1234' + i,
        created_at: now,
        updated_at: now
      }, {
        id: i++,
        name: 'Пицца "Туриста" (26 см, 320 гр..)',
        description: 'Соус томатный, сыр Моцарелла, салями, бекон, перец консервированный, приправа к пицце, масло чесночное',
        image_url: 'http://www.pizzatempo.by/i/photo/catalog/products/t/r_100_500x500.jpg',
        price: 10000,
        shop_id: 1,
        category_id: 2,
        external_food_id: '1234' + i,
        created_at: now,
        updated_at: now
      }, {
        id: i++,
        name: 'Салат с копченой говядиной и соусом из зелени',
        description: 'Ветчина, свинина, соус из майонеза и зелени, лук порей, опята маринованные, ',
        image_url: 'http://www.pizzatempo.by/i/photo/catalog/products/t/r_179_248x248.jpg',
        price: 120000,
        shop_id: 1,
        category_id: 2,
        external_food_id: '1234' + i,
        created_at: now,
        updated_at: now
      }, {
        id: i++,
        name: 'Салат с копченой говядиной с пикантным соусом',
        description: 'Салатная с анчоусами, каперсы, сыр Джюгас, сухарики, лимон 195 гр.',
        image_url: 'http://www.pizzatempo.by/i/photo/catalog/products/t/r_365_248x248.jpg',
        price: 100000,
        shop_id: 1,
        category_id: 2,
        external_food_id: '1234' + i,
        created_at: now,
        updated_at: now
      }, {
        id: i++,
        name: 'Салат "Оливье"',
        description: 'Томатный соус, сыр Моцарелла, филе куриное, шампиньоны, перец Пеперони, перец Чили, приправа к пицце',
        image_url: 'http://www.pizzatempo.by/i/photo/catalog/products/t/r_226_248x248.jpg',
        price: 15000,
        shop_id: 1,
        category_id: 3,
        external_food_id: '1334' + i,
        created_at: now,
        updated_at: now
      }, {
        id: i++,
        name: 'Пицца "Туриста" (26 см, 320 гр..)',
        description: 'Соус томатный, сыр Моцарелла, салями, бекон, перец консервированный, приправа к пицце, масло чесночное',
        image_url: 'http://www.pizzatempo.by/i/photo/catalog/products/t/r_100_500x500.jpg',
        price: 10000,
        shop_id: 1,
        category_id: 3,
        external_food_id: '1234' + i,
        created_at: now,
        updated_at: now
      },
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('foods', [{id: 1}, {id: 2},{id: 3}]);
  }
};
