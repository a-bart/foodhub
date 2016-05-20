var models = require('../models/models');

module.exports = function stubAuth(req, res, next) {
  models.User.findById(1).then(function(user) {
    req.user = user;
    return next();
  });  
};
