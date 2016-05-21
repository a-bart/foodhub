'use strict';

angular.module('Foodhub').component('sessionList', {
  bindings: {
    'list': '<',
    'isShort': '@',
  },

  template: require('./session_list.html'),

  controller: function() {
    this.isShortView = function() {
      return ( typeof( this.isShort)  !== 'undefined');
    };

    this.isHistory = function(status) {
      return (status === 2);
    };

    this.isSent = function(status) {
      return (status === 1);
    };

    this.isActive = function(status) {
      return (status === 0);
    };
  }
});
