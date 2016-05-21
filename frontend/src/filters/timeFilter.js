const angular = require('angular');

function timeFilter() {
  return function(date) {
    if (!date) return false;
    let regex = /(\d{1,2}):(\d{1,2})/;
    let dateString = date.toTimeString();
    return regex.exec(dateString)[0];
  };
}

angular.module('Foodhub').filter('timeFilter', timeFilter);
