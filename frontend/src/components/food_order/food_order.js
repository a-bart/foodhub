const angular = require('angular');
const templateHtml = require('./food_order.html');

angular.module('Foodhub').component('foodOrder', {
  bindings: {
    price: '<',
    foodCounter: '=',
    title: '<',
    image: '<',
    onDelete: '&',
    canChangeOrders: '<',
  },

  template: templateHtml,

  controller: function foodOrderController() {
    if (typeof(this.foodCounter) === 'string') {
      this.foodCounter = parseInt(this.foodCounter, 10);
    }

    this.clickCloseBtn = function clickCloseBtn() {
      this.onDelete();
    };

    this.getTotalPrice = function getTotalPrice() {
      return this.foodCounter * this.price;
    };
  },
});
