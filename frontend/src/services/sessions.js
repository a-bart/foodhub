var config = require('../config/config');
angular.module('Foodhub')
  .factory('Sessions', ['$resource', function Sessions($resource) {
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

    return {
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
