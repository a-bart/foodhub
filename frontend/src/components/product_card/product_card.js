let angular = require('angular');

angular.module('Foodhub').component('productCard', {
  bindings: {
    onAdd: '&',
    food: '<'
  },

  template: require('./product_card.html'),

  controller: function productCardController() {
    this.food.isAdded = false;

    this.quantity = 1;

    this.increaseCount = function() {
      this.quantity += 1;
    };

    this.decreaseCount = function() {
      if (this.quantity > 1) {
        this.quantity -= 1;
      }
    };

    this.clickAddBtn = function clickAddBtn() {
      this.quantity = (this.quantity > 0) ? this.quantity : 1;
      this.onAdd()(this.food, this.quantity);
      this.food.isAdded = true;
    };
  },
});
