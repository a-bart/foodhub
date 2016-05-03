'use strict';

var request = require('request');
var cheerio = require('cheerio');
var Parser = require('./Parser');

class PizzaTempo extends Parser {
  constructor() {
    super();
    this.url = 'http://www.pizzatempo.by/';
    this.products = [];
  }

  getProducts() {
    this.getCategories().then((pages) => {

      pages.forEach((page) => {
        this.load(page).then(($) => {

          var products = [];
          var categoryName = $('.menu .current').text();

          if (categoryName !== 'Пицца') {

            $('.item').each((i, elem) => {
              products.push({
                name: $(elem).find('h3').text(),
                description: $(elem).find('.leftCol').text(),
                imageUrl: $(elem).find('.photo').attr('href'),
                price: $(elem).find('.price').text(),
                externalFoodId: $(elem).find('.orderButton').attr('rel'),
                category: categoryName
              });
            });
          } else {
            $('.item').each((i, elem) => {
              var name = $(elem).find('h3').text();
              var id = $(elem).attr('id');
              var imageUrl = $(elem).find('.hover_mask').attr('href');
              var description = $(elem).find('.composition').text().trim();
              $(elem).find('.name').each((i, elem) => {
                products.push({
                  name: name + ' ' + $(elem).text(),
                  description: description + ' ' + $(elem).next().text(),
                  imageUrl: imageUrl,
                  price: $(elem).next().next().text(),
                  externalFoodId: id + '-' + ++i,
                  category: categoryName
                });
              });
            });
          }

          return products;
        }).then(products => {
          this.products = this.products.concat(products);
        });
      });

    });
  }

  getCategories() {
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
}
