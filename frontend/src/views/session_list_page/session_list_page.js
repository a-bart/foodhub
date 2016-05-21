var _ = require('lodash');

angular.module('Foodhub')
  .controller('SessionListPageController', ['$scope', 'Sessions', '$rootScope', '$filter', function($scope, Sessions, $rootScope, $filter) {
    $rootScope.pageTitle = $rootScope.projectConfig.nameProject + ' - Агригатор доставок пищи';


    $scope.convertSessions = function() {
      return _.map($scope.sessions, function(session) {
        var shop = _.find($scope.shops, { id: session.shopId });
        return Sessions.convertSessionToNormalFormat(session, shop);
      });
    };
        

    $scope.hideError = function() {
      $scope.errorCaught = false;
      console.log($scope.errorCaught);
    }
    $scope.init = function() {
      $rootScope.getShops().then(function(shops) {
        $scope.shops = shops;
        return Sessions.getSessions();
      }).then(function(response) {
        $scope.sessions = response.sessions;
        $scope.mappedSessions = $scope.convertSessions();

        $scope.mappedSessionsActive = [];
        $scope.mappedSessionsWait = [];
        $scope.mappedSessionsLast = [];

        $scope.mappedSessions.forEach(function (session) {
          if(session.status == 0)
            $scope.mappedSessionsActive.push(session);

          if(session.status == 1)
            $scope.mappedSessionsWait.push(session);

          if(session.status == 2)
            $scope.mappedSessionsLast.push(session);
        })


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
