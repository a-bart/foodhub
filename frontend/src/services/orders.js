var config = require('../config/config');
angular.module('Foodhub')
  .factory('Orders', ['$resource', function Orders($resource) {
    var resource = $resource(config.apiUrl + '/orders/:id', {}, {
      create: {
        method: 'POST'
      },
      update: {
        method: 'PUT'
      },
      destroy: {
        method: 'DELETE',
        params: {
          id: '@id'
        }
      }
    });

    return {
      updateOrder: function(params) {
        return resource.update(params).$promise;
      },

      createOrder: function(params) {
        return resource.create(params).$promise;
      },

      destroyOrder: function(params) {
        return resource.destroy(params).$promise;
      }
    };
  }]);
