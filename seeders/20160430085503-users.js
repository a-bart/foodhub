'use strict';
module.exports = {
  up: function (queryInterface, Sequelize) {
    var now = new Date();
    return queryInterface.bulkInsert('users', [
      { 
        id: 1,
        first_name: "Гена",
        last_name: "Русецкий",
        email: "ant478@gmail.com",
        phone: "+375447092034",
        payment_option: 0,
        address: "г. Минск, ул. Якуба Коласа, д. 8, кв. 35.",
        avatar_url: "https://www.petfinder.com/wp-content/uploads/2012/11/140272627-grooming-needs-senior-cat-632x475.jpg",
        registration_service: 1,
        external_user_id: "102611093490074",
        token: "qqwweerr",
        token_expires_at: now,
        created_at: now,
        updated_at: now
      }, {
        id: 2,
        first_name: "Петр",
        last_name: "Семенович",
        email: "petr_sem@gmail.com",
        phone: "+3754412332155",
        payment_option: 0,
        address: "г. Минск, ул. Якуба Коласа, д. 8, кв. 36.",
        avatar_url: "https://www.petfinder.com/wp-content/uploads/2013/09/cat-black-superstitious-fcs-cat-myths-162286659.jpg",
        registration_service: 1,
        external_user_id: "654321",
        token: "qqwweerr",
        token_expires_at: now,
        created_at: now,
        updated_at: now
      }, {
        id: 3,
        first_name: "Александр",
        last_name: "Дмовский",
        email: "dmowski@yandex.ru",
        phone: "+375454654654564",
        payment_option: 0,
        address: "г. Минск, ул. Якуба Коласа, д. 28, кв. 1219.",
        avatar_url: "hhttp://tamgdeya.ru/photos/norm/1/1_GCh88r5I.jpg",
        registration_service: 1,
        external_user_id: "6548546487",
        token: "qqwwee8rr",
        token_expires_at: now,
        created_at: now,
        updated_at: now
      }, {
        id: 4,
        first_name: "Аркадий",
        last_name: "Стругацкий",
        email: "arki@gmail.com",
        phone: "+846583215",
        payment_option: 0,
        address: "г. Минск, ул. Сурганова, д. 47",
        avatar_url: "http://www.by-time.ru/upload/iblock/e04/ans009.jpg",
        registration_service: 1,
        external_user_id: "65487321",
        token: "qq4wweerr",
        token_expires_at: now,
        created_at: now,
        updated_at: now
      }
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', [{id: 1}, {id: 2}, {id: 3}, {id: 4}]);
  }
};
