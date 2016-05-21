var _ = require('lodash');
var moment = require('moment/min/moment-with-locales.js');
moment.locale('ru');

angular.module('Foodhub')
  .controller('SessionPageUsersController', ['$scope', '$rootScope', '$location', '$routeParams', 'Sessions', 'Orders',
  function($scope, $rootScope, $location, $routeParams, Sessions, Orders) {
    $scope.sessionInfoTitle = 'Просмотр сессии';
    $rootScope.pageTitle = $rootScope.projectConfig.nameProject + ' - Просмотр сессии';

    if (!$routeParams.id || isNaN(Number($routeParams.id))) {
      $location.path('/');
    }
    $scope.isSessionCreator = Sessions.isSessionCreator;


    $scope.catchError = function(error){
      console.log(error)
      if(error.status && error.data.message){
        $scope.errorMessage = "Error: " + error.status + ' ' + error.data.message;
      } else {
        $scope.errorMessage = "Error: " + error;
      }
      $scope.errorCaught = true;
    }

    $scope.hideError = function() {
      $scope.errorCaught = false;
    }
    
    $scope.isOrdersEmpty = function(session) {
      return !session || session.orders.length === 0;
    }
    
    $scope.isSessionParticipant = function(session) {
      if (!$rootScope.currentUser || !session) return false;
      var index = _.map(session.orders, function(order) { return order.owner.id }).indexOf($rootScope.currentUser.id);
      return index !== -1 || $rootScope.currentUser.id === session.owner.id;
    }

    $scope.isOrderCreator = function(order) {
      if (!$rootScope.currentUser || !order) return false;
      return $rootScope.currentUser.id === order.owner.id;
    }

    $scope.getJoinButtonLabel = function() {
      if (!$scope.session) return false;

      if ($scope.isSessionParticipant($scope.session) || Sessions.isSessionCreator($scope.session)) {
        return 'Редактировать свой заказ';
      } else {
        return 'Присоединиться';
      }
    }


    $scope.copyUserOrder = function (order) {
      var orderParams = {
          sessionId: $scope.session.id,
          foodOrders: _.map(order.foodOrders, function(foodOrder) { return { foodId: foodOrder.food.id, quantity: foodOrder.quantity } })
        }
        Orders.createOrder(orderParams).then(function(order) {
           $scope.init();
        });
    }

    $scope.saveOrder = function(order) {
      var orderParams = {
        id: order.id,
        isPaid: order.isPaid,
        foodOrders: _.map(order.foodOrders, function(foodOrder) { return { foodId: foodOrder.food.id, quantity: foodOrder.quantity } })
      }
      Orders.updateOrder(orderParams).then(function(order) {
        $scope.session.orders[_.map($scope.session.orders, 'id').indexOf(order.id)] = order;
      }).catch($scope.catchError);
    }

    $scope.deleteSession = function(session) {
      Sessions.updateSession({ id: session.id, status: 2 }).then(function(session) {
        $location.path('/#/');
      }).catch($scope.catchError);
    }

    $scope.deleteOrder = function(order) {
      Orders.destroyOrder({ id: order.id }).then(function(order) {
        $scope.session.orders = _.reject($scope.session.orders, { id: order.id });
      }).catch($scope.catchError);
    }

    $scope.mappedSessions = [];

    $scope.init = function() {
      $rootScope.getShops().then(function(shops) {
        $scope.shops = shops;
        return Sessions.getSession({ id: $routeParams.id });
      }).then(function(session) {
        $scope.session = session;
        $scope.mappedSessions = [];
        $scope.mappedSessions.push(Sessions.convertSessionToNormalFormat($scope.session, $scope.shops[0]))

        $rootScope.$broadcast('initSessionInfo');
      }).catch($scope.catchError);
    };

    $scope.init();
  }]);
