var errors = require('../errors/errors');

module.exports = function isLogin(req, res, next) {
  if(req.user) return next();
  return next(new errors.unauthorized('Access allowed only for registered users'));
};
