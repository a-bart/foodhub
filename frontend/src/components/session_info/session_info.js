let _ = require('lodash');
let moment = require('moment/min/moment-with-locales.js');

moment.locale('ru');

angular.module('Foodhub').component('sessionInfo', {
  bindings: {
    'title': '<',
    'shops': '<',
    'session': '=',
    'canChangeTime': '<',
    'canChangeShop': '<'
  },
  template: require('./session_info.html'),

  controller: function($scope, $attrs, Sessions, $timeout, $rootScope) {
    this.selectUniqID = Math.random().toString(36).substring(10);
    $scope.timePattern = /^(([01]?[0-9])|(2[0-3])):[0-5][0-9]$/;

    this.validateTime = function(time) {
      let regexp = /^(\d{1,2}):(\d{1,2})$/,
        timeParts = regexp.exec(time);
      if (timeParts) {
        let hours = parseInt(timeParts[1], 10),
          minutes = parseInt(timeParts[2], 10);
        return (hours >= 0 && hours <= 23) && (minutes >= 0 && minutes <= 59);
      }

      return false;
    };

    this.getNameOwner = function() {
      if (this.session)
        return this.session.owner.firstName + ' ' +this.session.owner.lastName;
    };

    this.getTotalPrice = function() {
      if (!this.session) return;
      this.session.price = _.sumBy(this.session.orders, 'price');
      return this.session.price;
    };


    this.onShopChanged = function() {
      if (!this.selectedShop || !this.session) return;
      this.session.shopId = this.selectedShop.id;
      $rootScope.$broadcast('selectedShopChanged', this.selectedShop.id);
    };

    this.getRemainAmount = function() {
      if (!this.selectedShop || !this.session) return;
      return this.session.price < this.selectedShop.minOrderPrice ? this.selectedShop.minOrderPrice - this.session.price : 0;
    };

    this.init = function() {
      if (!this.shops || !this.session) return;

      this.sessionTime = this.session.deliveryTime ? this.session.deliveryTime : this.session.orderTime;

      let index = this.shops.map(function(shop) { return shop.id; }).indexOf(this.session.shopId);
      if (index !== -1) {
        this.selectedShop = this.shops[index];
      } else {
        this.selectedShop = this.shops[0];
        this.session.shopId = this.selectedShop.Id;
      }
      this.session.valid = true;
      this.session.invalidTime = false;
    };

    this.onSessionTimeChanged = function() {
      if (!this.session) return;
      if (this.validateTime(this.sessionTime)) {
        if (this.session.deliveryTime) {
          this.session.deliveryTime = this.sessionTime;
        } else {
          this.session.orderTime = this.sessionTime;
        }
        this.session.valid = true;
        this.session.invalidTime = false;
      } else {
        this.session.valid = false;
        this.session.invalidTime = true;
      }
    };

    this.updateSessionTime = function() {
      let sessionParams = {
          id: this.session.id,
          deliveryTime: this.session.deliveryTime && moment({hours: this.session.deliveryTime.split(':')[0], minutes: this.session.deliveryTime.split(':')[1]}).toDate()
      }

      Sessions.updateSession(sessionParams).then(function(session) {
        $scope.showMessageSaved = true;

        $timeout(function() { 
          $scope.showMessageSaved = false;
        }.bind(this),1000);
      });
    };

    $scope.$on('initSessionInfo', function() {
      $timeout(function() { this.init() }.bind(this));
    }.bind(this));
  }
});
