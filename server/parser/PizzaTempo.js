'use strict';

var request = require('request');
var cheerio = require('cheerio');
var Parser = require('./Parser');

module.exports = class PizzaTempo extends Parser {
  constructor() {
    super();
    this.url = 'http://www.pizzatempo.by/';
  }

  getProducts() {
    return this._getPages().then((pages) => {

      var result = [];
      var promise = Promise.resolve();

      pages.forEach((page) => {
        promise = promise.then(() => {
          return this.load(page).then(($) => {

            var products = [];
            var categoryName = $('.menu .current').text();

            if (categoryName !== 'Пицца') {
              $('.item').each((i, elem) => {
                var $elem = $(elem);
                products.push({
                  name: $elem.find('h3').text(),
                  description: $elem.find('.leftCol').text(),
                  imageUrl: $elem.find('.photo').attr('href'),
                  price: parseInt($elem.find('.price').text().replace(/\s+/g, '')),
                  externalFoodId: $elem.find('.orderButton').attr('rel'),
                  category: categoryName
                });
              });
            } else {
              $('.item').each((i, elem) => {
                var $elem = $(elem);
                var name = $elem.find('h3').text();
                var id = $elem.attr('id');
                var imageUrl = $elem.find('.hover_mask').attr('href');
                var description = $elem.find('.composition').text().trim();
                $elem.find('.name').each((i, elem) => {
                  var $elem = $(elem);
                  products.push({
                    name: name + ' ' + $elem.text(),
                    description: description + ' ' + $elem.next().text(),
                    imageUrl: imageUrl,
                    price: parseInt($elem.next().next().text().replace(/\s+/g, '')),
                    externalFoodId: id + '-' + (i + 1),
                    category: categoryName
                  });
                });
              });
            }

            result = result.concat(products);

          });
        });
      });

      return promise.then(() => result);
    });
  }

  _getPages() {
    return this.load(this.url).then(($) => {
      var pages = [];

      var category = $('.menu a').map(function() {
        return $(this).attr('href');
      }).toArray();

      var promise = category.reduce((promise, url) => {
        return promise.then(() => {
          return this.load(url).then(($) => {

            pages.push(url);

            if ($('.paging').length) {
              var counter = $('.paging li').length;
              for (var j = 2; j < counter; j++) {
                pages.push(url + '?paging=true&page=' + j);
              }
            }
          });
        });
      }, Promise.resolve());

      return promise.then(() => pages);
    });
  }
};
