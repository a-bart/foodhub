var moment = require('moment/min/moment-with-locales.js');
moment.locale('ru');


angular.module('Foodhub')
  .factory('TimeHelper', [function Sessions() {
    var helpers = {};

    // 2016-05-12T14:41:50.000Z -> 14:41
    helpers.getNormalTime = function (date) {
      return moment(new Date(date)).format('LT');
    };

    helpers.timeFromNow = function(date) {
      return (date > new Date()) ? moment(date).fromNow(true) : 0;
    };

    return helpers;
}]);
