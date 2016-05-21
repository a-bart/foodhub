'use strict';

angular.module('Foodhub').component('customButton', {
  bindings: {
    'title': '<',
    'href': '<',
    'isBlank': '@',
    'isStretch': '@',
    'isSmall': '@',
    'isNotHover': '@',
    'isTransparent': '@',
    'onClick': '&',
  },

  template: require('./button.html'),

  controller: function() {
    this.isTransparentBtn = function() {
      return ( typeof(  this.isTransparent)  !== 'undefined');
    };

    this.isStretchBtn = function() {
      return ( typeof( this.isStretch)  !== 'undefined');
    };

    this.isNotHoverBtn = function() {
      return ( typeof( this.isNotHover)  !== 'undefined');
    };

    this.isSmallBtn = function() {
      return ( typeof( this.isSmall)  !== 'undefined');
    };

    this.getTargetData = function() {
      return ( typeof( this.isBlank)  !== 'undefined') ? '_blank' : '_self';
    };

    this.click_btn = function() {
      this.onClick();
    };

  }
});
