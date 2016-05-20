'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    var now = new Date();
    return queryInterface.bulkInsert('shops', [
      { 
        id: 1,
        name: "Пицца Темпо",
        site_url: "http://www.pizzatempo.by",
        logo_url: "http://www.pizzatempo.by/public/i/logo.png",
        description: "Основными принципами работы пиццерий «Пицца Темпо» являются высокое качество блюд, стильный и удобный интерьер, доступные цены.",
        delivery_price: null,
        min_order_price: 120000,
        min_free_delivery_price: null,
        delivery_time: "вс-чт — с 10 до 22 часов, пт-сб — до 2 ночи, завтраки: 10:00 - 12:00, обеденные комплексы: 12:00 - 16:00.",
        created_at: now,
        updated_at: now
      }, {
        id: 2,
        name: "Еда Бай",
        site_url: "http://www.eda.by/",
        logo_url: "http://www.eda.by/images/logotype.png",
        description: "Приветствуем Вас на сайте одной из самых крупных в Беларуси служб доставки еды и напитков EDA.BY! С 2007 года мы предлагаем Вам широкий ассортимент блюд и напитков с доставкой из кафе на дом 24 часа в сутки и 7 дней в неделю! Главные приоритеты для нас - это высокий стандарт качества блюд и обслуживания. В нашем меню представлены: пицца, суши, блюда европейской кухни, супы, салаты, холодные закуски, горячие блюда, буррито, десерты, а также напитки и многое другое.",
        delivery_price: null,
        min_order_price: 100000,
        min_free_delivery_price: null,
        delivery_time: "24 часа в сутки и 7 дней в неделю!",
        created_at: now,
        updated_at: now
      }, {
        id: 3,
        name: "eDraniki",
        site_url: "http://edraniki.by/",
        logo_url: "http://edraniki.by/wp-content/uploads/2015/03/logo-sajt-verh.png",
        description: "Нашы дранікі сытныя і смачныя, нашы супы духмяныя, бульба падрумяненая, а курачка сакавітая. Кожная наша страва гатуецца паводле арыгінальнага рэцэпту з самых свежых і натуральных інгрэдыентаў. Сапраўдны вясковы смак і порцыі, як у дзяцінстве, вялікія і сытныя. Быццам у гасцях у бабулі!",
        delivery_price: null,
        min_order_price: 180000,
        min_free_delivery_price: null,
        delivery_time: "с 11:00 до 22:30",
        created_at: now,
        updated_at: now
      }, {
        id: 4,
        name: "NAKORMIM.BY",
        site_url: "http://nakormim.by/",
        logo_url: "http://nakormim.by/image/data/logo.png",
        description: "Доставка еды Nakormim.by – это выбор настоящих гурманов! Мы порадуем вас вкусными блюдами и европейским уровнем обслуживания. Наша команда обожает делать приятные сюрпризы: мы регулярно проводим выгодные акции. ",
        delivery_price: 20000,
        min_order_price: null,
        min_free_delivery_price: 100000,
        delivery_time: "Воскресенье – четверг с 9.00 до 03.00, пятница-суббота – круглосуточно.",
        created_at: now,
        updated_at: now
      }
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('shops', [{id: 1}, {id: 2}]);
  }
};
