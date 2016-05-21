angular.module('Foodhub')
.component('foodhubForm', {
  bindings: {
    phoneValue: '=?',
    firstName: '=?',
    lastName: '=?',
    mailValue: '=?',
    paytypeValue: '=?',
    address: '=?'
  },
  template: require('./form.html'),
  controller: function($scope) {
    $scope.phonePattern = '\+375\s[0-9]{2}\s[0-9]{3}\s[0-9]{2}\s[0-9]{2}';
  }
});
