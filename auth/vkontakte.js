var passport = require('passport');
var Strategy = require('passport-vkontakte').Strategy;
var config = require('../config/config');
var db = require('../db');
var User = db.import('../models/User');
var init = require('./init');

passport.use(new Strategy({
  clientID: config.auth.vkontakte.id,
  clientSecret: config.auth.vkontakte.secret,
  callbackURL: config.auth.vkontakte.callback
},
function(accessToken, refreshToken, profile, cb) {
  console.log(profile);
  User.findOrCreate(
    {
      where: {
        externalUserId: profile.id
      },
      defaults: {
        firstName: profile.displayName.trim().split(' ')[0],
        lastName: profile.displayName.trim().substring(profile.displayName.trim().split(' ')[0].length, profile.displayName.length).trim(),
        email: null,
        phone: null,
        token: accessToken,
        paymentOption: 0,
        address: '',
        avatarUrl: profile.photos.value,
        registrationService: 1
      }
    }).spread(function(user, created){
      return cb(null, user);
    });
}));

init();
