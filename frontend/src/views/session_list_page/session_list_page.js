var _ = require('lodash');

var moment = require('moment/min/moment-with-locales.js');
moment.locale('ru');

angular.module('Foodhub')
  .controller('SessionListPageController', ['$scope', 'Sessions', '$rootScope', '$filter', function($scope, Sessions, $rootScope, $filter) {
    $rootScope.pageTitle = $rootScope.projectConfig.nameProject + ' - Объединатор доставок пищи';

    $scope.timeFromNow = function(date) {
      var timeLeft = moment(date);
      if (date > new Date()) {
        return timeLeft.fromNow(true);
      } else {
        return 0;
      }
    };

    $scope.getSessions = function() {
      return _.map($scope.sessions, function(session) {
        var shop = _.find($scope.shops, { id: session.shopId });
        return {
          id: session.id,
          status: session.status,
          image: shop.logoUrl,
          deliveryUrl: shop.siteUrl,
          deliveryTimetable: shop.deliveryTime,
          minimalDeliveryPrice: shop.minOrderPrice,
          authorName: session.owner.firstName + ' ' + session.owner.lastName,
          orderDate: new Date(session.orderTime),
          orderTime: moment(new Date(session.orderTime)).format('LT'),
          deliveryTime: session.deliveryTime ? moment(new Date(session.deliveryTime)).format('LT') : null,
          orderTimeLeft: session.deliveryTime ? $scope.timeFromNow(new Date(session.orderTime)) : $scope.timeFromNow(new Date(session.orderTime)),
          totalPrice: session.price,
          priceLeft: session.price < shop.minOrderPrice ? shop.minOrderPrice - session.price : 0
        };
      });
    };

    $scope.hideError = function() {
      $scope.errorCaught = false;
      console.log($scope.errorCaught);
    };

    $scope.init = function() {
      $rootScope.getShops().then(function(shops) {
        $scope.shops = shops;
        return Sessions.getSessions();
      }).then(function(response) {
        $scope.sessions = response.sessions;
        $scope.mappedSessions = $scope.getSessions();

        $scope.mappedSessionsActive = [];
        $scope.mappedSessionsSent = [];
        $scope.mappedSessionsSentToday = [];
        $scope.mappedSessionsClosed = [];

        $scope.mappedSessions.forEach(function(session) {
          if (session.status === 0) {
            $scope.mappedSessionsActive.push(session);
          }
          else if (session.status === 1) {
            $scope.mappedSessionsSent.push(session);
          }
          else if (session.status === 2) {
            $scope.mappedSessionsClosed.push(session);
          }
        });

        $scope.mappedSessionsActive.forEach(function(session) {
          var today = moment();
          var yesterday = moment(today).subtract(1, 'day');
          console.log(yesterday);
          if (session.orderDate > yesterday) {
            $scope.mappedSessionsSentToday.push(session);
          }
        });
        console.log($scope.mappedSessionsSentToday);
      }).catch(function(error){
        if(error.status && error.data.message){
          $scope.errorMessage = "Error: " + error.status + ' ' + error.data.message;
        } else {
          $scope.errorMessage = "Error: " + error;
        }
        $scope.errorCaught = true;
      });
    };



    $scope.init();
  }]);
