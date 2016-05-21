var _ = require('lodash');
/*var moment = require('moment/min/moment-with-locales.js');

moment.locale('ru');*/

angular.module('Foodhub')
  .controller('SessionPageFoodController', ['$scope', '$rootScope', '$location', 'Shops', 'Sessions', 'Orders', '$routeParams', '$timeout',
  function($scope, $rootScope, $location, Shops, Sessions, Orders, $routeParams, $timeout) {
    $rootScope.pageTitle = $rootScope.projectConfig.nameProject + ' - Выбор товаров';



    if ((!$routeParams.id || isNaN(Number($routeParams.id))) && !$routeParams.id === 'new') {
      $location.path('/');
    }


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


    $scope.initNewSession = function() {
      $scope.isNewSession = true;
      $scope.sessionInfoTitle = "Создание сессии";
      $scope.session = Sessions.getNewSession($scope.shops[0].id);
      $scope.order = {
        sessionId: $scope.session.id,
        foodOrders: []
      };
      $scope.session.orders.push($scope.order);
      $rootScope.$broadcast('initSessionInfo');

      $scope.changeSelectedShop($scope.session.shopId);
    }


    $scope.mappedSessions = [];

    $scope.initExistingSessions = function() {
      $scope.isNewSession = false;
      Sessions.getSession({ id: $routeParams.id }).then(function(session) {
        $scope.session = session;
        var order = _.find($scope.session.orders, function(order) {return order.owner.id === $rootScope.currentUser.id});
        if (order) {
          $scope.isExistingOrder = true;
          $scope.sessionInfoTitle = "Редактирование заказа";
          $scope.order = order;
        } else {
          $scope.isNewOrder = true;
          $scope.sessionInfoTitle = "Создание заказа";
          $scope.order = {
            sessionId: $scope.session.id,
            foodOrders: []
          }
          $scope.session.orders.push($scope.order);
        }
        $rootScope.$broadcast('initSessionInfo');
        return Shops.getShop({ id: $scope.session.shopId });
      }).then(function(shop) {
        $scope.selectedShop = shop;
        $scope.mappedSessions.push(Sessions.convertSessionToNormalFormat($scope.session, shop))
      }).catch($scope.catchError);
    }




    $scope.init = function() {
      $rootScope.getShops().then(function(shops) {
        $scope.shops = shops;
        if ($routeParams.id === 'new') {
          $scope.initNewSession();
        } else {
          $scope.initExistingSessions();
        }
      }).catch($scope.catchError);
    };


    $scope.addFoodToCart = function(food, quantity) {
      let indexOrder = Orders.findOrderIndexByFoodId($scope.order.foodOrders, food.id);

      if (indexOrder != -1) {
        $scope.order.foodOrders[indexOrder].quantity += quantity;
      } else {
        $scope.order.foodOrders.push({
          quantity: quantity,
          price: food.price * quantity,
          food: food,
        });
      }
    }

    $scope.emptyOrderMessage = 'Список товаров пуст.';

    $scope.isEmptyOrder = function (order) {
      if (order.foodOrders.length === 0){
        $scope.emptyOrderMessageShow = true;
        
        $timeout(function() { 
          $scope.emptyOrderMessageShow = false;
        }.bind(this),1000);

        return true;
      }else{
        return false;
      }
    }


    $scope.createSessionParams = function (session) {
      var date = new Date();
      var timeParts = /(\d{1,2}):(\d{1,2})/.exec(session.orderTime);
      date.setHours(timeParts[1]);
      date.setMinutes(timeParts[2]);
      var sessionParams = {
        shopId: session.shopId,
        orderTime: date.toISOString(),
        address: session.address
      }
      return sessionParams;
    }

    $scope.saveNewSession = function (order) {
      console.log("Сохраняем новую сессию")
      var sessionParams = $scope.createSessionParams($scope.session);
      console.log("sessionParams",sessionParams);

      Sessions.createSession(sessionParams).then(function(session) {
        $rootScope.session = session;
        console.log($rootScope.session);
        var orderParams = {
          sessionId: session.id,
          foodOrders: _.map(order.foodOrders, function(foodOrder) { 
            return { foodId: foodOrder.food.id, quantity: foodOrder.quantity } 
          })
        }
        $scope.session = session;
        return Orders.createOrder(orderParams);
      }).then(function(order) {
        $location.path('/session/' + $scope.session.id);
      }).catch($scope.catchError);
    }


    $scope.saveNewOrder = function (order) {
      var orderParams = {
          sessionId: $scope.session.id,
          foodOrders: _.map(order.foodOrders, function(foodOrder) { 
            return { foodId: foodOrder.food.id, quantity: foodOrder.quantity } 
          })
        }
        Orders.createOrder(orderParams).then(function(order) {
          $location.path('/session/' + $scope.session.id);
        }).catch($scope.catchError);
    }


    $scope.saveExistingOrder = function (order) {
      if (Sessions.isSessionCreator($scope.session)) {
          var sessionParams = {
            id: $scope.session.id,
            /*orderTime: moment({hours: $scope.session.orderTime.split(':')[0], minutes: $scope.session.orderTime.split(':')[1]}).toDate(),
            deliveryTime: $scope.session.deliveryTime && moment({hours: $scope.session.deliveryTime.split(':')[0], minutes: $scope.session.deliveryTime.split(':')[1]}).toDate()*/
          }
          Sessions.updateSession(sessionParams).then(function(session) {
            var orderParams = {
              id: $scope.order.id,
              isPaid: false,
              foodOrders: _.map(order.foodOrders, function(foodOrder) { return { foodId: foodOrder.food.id, quantity: foodOrder.quantity } })
            }
            return Orders.updateOrder(orderParams);
          }).then(function(order) {
            $location.path('/session/' + $scope.session.id);
          });
        } else {
          var orderParams = {
            id: $scope.order.id,
            isPaid: false,
            foodOrders: _.map(order.foodOrders, function(foodOrder) { return { foodId: foodOrder.food.id, quantity: foodOrder.quantity } })
          }
          Orders.updateOrder(orderParams).then(function(order) {
            $location.path('/session/' + $scope.session.id);
          });
        }
        Orders.updateOrder(orderParams).then(function(order) {
          $location.path('/session/' + $scope.session.id);
        }).catch($scope.catchError);
    }



    $scope.saveOrder = function(order) {
      if($scope.isEmptyOrder(order)) return;

      if ($scope.isNewSession) {
        $scope.saveNewSession(order);
      } else if ($scope.isNewOrder) {
        $scope.saveNewOrder(order);
      } else if ($scope.isExistingOrder) {
        $scope.saveExistingOrder(order);
      }
    }



    $scope.changeSelectedShop = function (shopId) {
      Shops.getShop({ id: shopId }).then(function (shop) {
        $scope.selectedShop = shop;
        $scope.order.foodOrders = [];
      }).catch($scope.catchError);
    };

    $scope.$on('selectedShopChanged', function(event, shopId) {
      $scope.changeSelectedShop(shopId);
    });

    $scope.init();
  }]);
