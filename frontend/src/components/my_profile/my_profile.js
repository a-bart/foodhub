angular.module('Foodhub')
  .directive('myProfile', ['Auth', '$location', function(Auth, $location) {
    return {
      template: require('./my_profile.html'),
      replace: true,
      restrict: 'E',
      link: function($scope) {
        $scope.logout = function() {
          Auth.logout().then(function() {
            $location.path('/sign_in');
          }).catch(function() {
            $location.path('/sign_in');
          });
        };
      }
    };
  }]);
