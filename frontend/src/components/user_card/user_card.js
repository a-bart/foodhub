var angular = require('angular');
var _ = require('lodash');

angular.module('Foodhub').component('userCard', {
  bindings: {
    order: '=',
    canChangePaymentStatus: '<',
    canDelete: '<',
    onEdit: '&',
    onDelete: '&'
  },

  template: require('./user_card.html'),

  controller: function userCardController() {
    this.deleteOrder = function() {
      if (!this.order) return;
      this.onDelete()(this.order);
    };

    this.saveOrder = function() {
      if (!this.order) return;
      this.onEdit()(this.order);
    };

    this.getTotalPrice = function() {
      if (!this.order) return;
      this.order.price = _.sumBy(this.order.foodOrders, 'price');
      return this.order.price;
    };

    this.foodOrderEdited = function() {
      if (!this.order) return;
      this.onEdit()(this.order);
    }
  },
});
