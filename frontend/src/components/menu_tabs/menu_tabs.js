angular.module('Foodhub')
  .directive('menuTabs', function() {
    return {
      restrict: 'AE',
      transclude: true,
      template: require('./menu_tabs.html'),
      scope:{
        isDark: '@',
      },
      replace: true,
      controller: ['$scope', function($scope) {
        var panes = $scope.currentPanes = [];
        var stepLength = 300;

        $scope.toLeft = function () {
          $scope.leftPosition +=  stepLength;
        }

        $scope.toRight = function () {
          $scope.leftPosition -= stepLength;
        }

        $scope.isShowRight = function (leftPosition) {
          let widthBlock = document.getElementsByClassName('menu-tabs__small-container')[0].offsetWidth;
          let widthFullContent = document.getElementsByClassName('menu-tabs__big-container')[0].offsetWidth;

          if(widthFullContent - Math.abs(leftPosition) >= widthBlock) return true;
          return false;
        }

        $scope.isDarkTabs = function() {
          return ( typeof( $scope.isDark)  !== 'undefined');
        };


        $scope.leftPosition = 0;

        $scope.select = function selectPane(pane) {
          angular.forEach(panes, function(pane) {
            pane.selected = false;
          });
          pane.selected = true;
        };

        this.addPane = function addPane(pane) {
          if (panes.length === 0) {
            $scope.select(pane);
          }

          panes.push(pane);
        };
      }]
    };
  })
  .directive('menuPane', function() {
    return {
      require: '^menuTabs',
      restrict: 'AE',
      transclude: true,
      template: require('./menu_pane.html'),
      replace: true,
      scope:{
        title: '@'
      },
      link: function(scope, element, attrs, tabsCtrl) {
        tabsCtrl.addPane(scope);

      }
    };
  });
