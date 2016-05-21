var moment = require('moment/min/moment-with-locales.js');
moment.locale('ru');

var config = require('../config/config');

angular.module('Foodhub')
  .factory('Sessions', ['$resource', '$rootScope', 'TimeHelper', function Sessions($resource, $rootScope, TimeHelper) {

    var resource = $resource(config.apiUrl + '/sessions/:id', {}, {
      index: {
        method: 'GET',
        params: {
          isArray: true
        }
      },
      show: {
        method: 'GET',
        params: {
          id: '@id'
        }
      },
      create: {
        method: 'POST'
      },
      update: {
        method: 'PUT'
      }
    });


    var helpers = {};

    helpers.isSessionCreator = function(session) {
      if (!$rootScope.currentUser || !session) return false;
      return $rootScope.currentUser.id === session.owner.id;
    }

    helpers.getNewSession = function(shopId) {
      var date = new Date();
      return {
        shopId: shopId,
        orderTime: moment(date).format('LT'),
        deliveryTime: null,
        address: '',
        price: 0,
        orders: [],
        owner: $rootScope.currentUser
      }
    }


    helpers.convertSessionToNormalFormat = function (session, shop) {
      let normalSession = {
        id: session.id,
        status: session.status,
        image: shop.logoUrl,
        deliveryUrl: shop.siteUrl,
        deliveryTimetable: shop.deliveryTime,
        minimalDeliveryPrice: shop.minOrderPrice,
        authorName: session.owner.firstName + ' ' + session.owner.lastName,
        totalPrice: session.price,
        priceLeft: session.price < shop.minOrderPrice ? shop.minOrderPrice - session.price : 0,
      };

      normalSession.orderTime = TimeHelper.getNormalTime(session.orderTime);
      normalSession.orderTimeLeft = "45 минуток";
      
      if(normalSession.deliveryTime){
        normalSession.deliveryTime = TimeHelper.getNormalTime(session.deliveryTime);
        normalSession.deliveryTimeLeft = "15 минуток";
      }


      return normalSession;
    }


    return {
      convertSessionToNormalFormat : helpers.convertSessionToNormalFormat,
      isSessionCreator : helpers.isSessionCreator,
      getNewSession : helpers.getNewSession,

      getSessions: function(params) {
        return resource.index(params).$promise;
      },

      getSession: function(params) {
        return resource.show(params).$promise;
      },

      updateSession: function(params) {
        return resource.update(params).$promise;
      },

      createSession: function(params) {
        return resource.create(params).$promise;
      }
    };
  }]);
