'use strict';

let angular = require('angular');
require('angular-route');
require('angular-resource');
require('angular-cookies');
let config = require('./config/config');

function appConfig($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      template: require('./views/session_list_page/session_list_page.html'),
      controller: 'SessionListPageController'
    })

    .when('/profile', {
      template: require('./views/user_page/user_page.html'),
      controller: 'UserPageController'
    })

    .when('/order/:id', {
      template: require('./views/last_page/last_page.html'),
      controller: 'LastPageController'
    })

    .when('/food/:id', {
      template: require('./views/session_page/session_page_food/session_page_food.html'),
      controller: 'SessionPageFoodController'
    })

    .when('/session/:id', {
      template: require('./views/session_page/session_page_users/session_page_users.html'),
      controller: 'SessionPageUsersController'
    })

    .when('/sign_in', {
      template: require('./views/sign_in_page/sign_in_page.html'),
      controller: 'SignInPageController'
    })

    .otherwise({
      redirectTo: '/'
    });

  $httpProvider.interceptors.push('errorInterceptor');
}

appConfig.$inject = ['$routeProvider', '$httpProvider'];

function appRun($rootScope, Shops, $timeout, $cookies, $location) {
  $rootScope.defaultAvatarUrl = 'http://cdn.fishki.net/upload/post/201506/08/1559628/9df18f050741a1da79d70751018f8811.jpg';
  $rootScope.projectConfig = config;
  try {
    $rootScope.currentUser = JSON.parse($cookies.get('currentUser'));
  } catch(e) {
    $location.path('/sign_in');
  }
  
  $rootScope.getShops = function() {
    if ($rootScope.shops) {
      return $timeout(function() { return $rootScope.shops });
    } 

    return Shops.getShops().then(function(response) {
      $rootScope.shops = response.shops;
      return response.shops;
    });
  };
}

appRun.$inject = ['$rootScope', 'Shops', '$timeout', '$cookies', '$location'];

let app = angular
  .module('Foodhub', [
    'ngRoute',
    'ngResource',
    'ngCookies'
  ])
  .config(appConfig)
  .run(appRun);

require('./components/footer/footer');
require('./components/header/header');
require('./components/sub_header/sub_header');
require('./components/button/button');
require('./components/session_list/session_list');
require('./components/food_order/food_order');
require('./components/user_card/user_card');
require('./components/button/button');
require('./components/text_input/text_input');
require('./components/cart/cart');
require('./components/quantity-input/quantity-input');
require('./components/product_card/product_card');
require('./components/menu_tabs/menu_tabs');
require('./components/session_info/session_info');
require('./components/sign-in/sign-in');
require('./components/form/form');

require('./views/session_list_page/session_list_page');
require('./views/last_page/last_page');
require('./views/user_page/user_page');
require('./views/session_page/session_page_food/session_page_food');
require('./views/session_page/session_page_users/session_page_users');
require('./views/sign_in_page/sign_in_page');

require('./services/timeHelper');
require('./services/shops');
require('./services/users');
require('./services/orders');
require('./services/sessions');
require('./services/postOrder');
require('./services/auth');
require('./filters/money_filter');
require('./filters/timeFilter');
require('./errorIntercepter');
