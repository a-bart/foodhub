require('../my_profile/my_profile.js');

angular.module('Foodhub')
  .directive('foodhubHeader', function() {
    return {
      template: require('./header.html'),
      replace: true,
      restrict: 'E',
      controller: function($scope, $attrs, $rootScope) { 
        
      }
    };
  });
