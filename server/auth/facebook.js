var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var config = require('../config/config');
var db = require('../db');
var User = db.import('../models/User');
var init = require('./init');

passport.use(new Strategy({
    clientID: config.auth.facebook.id,
    clientSecret: config.auth.facebook.secret,
    callbackURL: config.auth.facebook.callback
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate(
      {
        where: {
          externalUserId: profile.id
        },
        defaults: {
          firstName: profile.displayName.trim().split(' ')[0],
          lastName: profile.displayName.trim().substring(profile.displayName.trim().split(' ')[0].length, profile.displayName.length).trim(),
          email: null,
          phone: '',
          token: accessToken,
          paymentOption: 0,
          address: '',
          avatarUrl: 'http://cdn.fishki.net/upload/post/201506/08/1559628/9df18f050741a1da79d70751018f8811.jpg',
          registrationService: 0
        }
      }).spread(function(user, created){
        return cb(null, user);
      })
  }));

init();
