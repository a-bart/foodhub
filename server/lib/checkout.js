'use strict';

var request = require('request');

module.exports = function checkoutPizzaTempo(data) {
  var jar = request.jar();
  request({
    method: 'GET',
    url: 'http://www.pizzatempo.by/menu',
    jar: jar
  }, function(error, response, html) {
    var promises = data.products.map((item) => {
      if (item.category != 'Пицца') {
        return tempoOrderProducts(item, jar);
      } else {
        return tempoOrderPizza(item, jar);
      }
    });

    Promise.all(promises).then(() => {
      createOrder(data.user, jar);
    });
  });
};

function tempoOrderProducts(data, jar) {
  return new Promise((res, rej) => {
    request({
      method: 'POST',
      url: 'http://www.pizzatempo.by/menu/cart/',
      jar: jar,
      headers: {
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        'Accept': '*/*',
        'Origin': 'http://www.pizzatempo.by',
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4,be;q=0.2'
      },
      form: {
        order_data: {
          id: data.id,
          count: data.count
        },
        type: 'product',
        rand: Math.random()
      }
    }, function(error, response, html) {
      res(response.statusCode);
    });
  });
}

function tempoOrderPizza(data, jar) {
  return new Promise((res, rej) => {
    request({
      method: 'POST',
      url: 'http://www.pizzatempo.by/menu/cart/',
      jar: jar,
      headers: {
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        'Accept': '*/*',
        'Origin': 'http://www.pizzatempo.by',
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4,be;q=0.2'
      },
      form: {
        order_data: [{
          id: data.id,
          count: data.count
        }],
        type: 'pizza',
        rand: Math.random()
      }
    }, function(error, response, html) {
      res(response.statusCode);
    });
  });
}

function createOrder(user, jar) {
  var address = user.address.split(',');
  var paymentType = user.payment_option ? 'card' : 'nal';

  return new Promise((res, rej) => {
    request({
      method: 'POST',
      url: 'http://www.pizzatempo.by/menu/order/',
      jar: jar,
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4,be;q=0.2',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Pragma': 'no-cache',
        'Upgrade-Insecure-Requests': 1
      },
      form: {
        table: 'cat_orders',
        phone: user.phone,
        email: user.email,
        fio: user.firstName + ' ' + user.lastName,
        city: address[0],
        street: address[1],
        house: address[2],
        room: address[3],
        payment_type: paymentType,
        form_submit: 'Отправить'
      }
    }, function(error, response, html) {
      res(html);
    });
  });
}

function getCart(jar) {
  return new Promise((res, rej) => {
    request({
      url: 'http://www.pizzatempo.by/menu/cart/?ajax=1&action=GetCart',
      method: 'GET',
      jar: jar
    }, function(error, response, html) {
      res(response.statusCode);
    });
  });
}
