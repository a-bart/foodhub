var passport = require('passport');
var db = require('../db');
var User = db.import('../models/User');

module.exports = function() {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id).then(function(user){
      done(null, user);
    }).catch(function(error){
      done(error);
    });
  });
};
