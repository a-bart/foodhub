var errors = require('../errors/errors');

exports.validParamsID = function (req, res, next) {
  if (isNaN(Number(req.params.id))) {
    return next(new errors.badRequest('ID is invalid or missing'));
  } else {
    return next();
  }
}

exports.validBodyID = function (req, res, next) {
  if (isNaN(Number(req.body.id))) {
    return next(new errors.badRequest('ID is invalid or missing'));
  } else {
    return next();
  }
}

exports.validBodySessionID = function (req, res, next) {
  if (isNaN(Number(req.body.sessionId))) {
    return next(new errors.badRequest('SessionID is invalid or missing'));
  } else {
    return next();
  }
}

exports.alowedToModifyUser = function (req, res, next) {
  if (req.user.id !== Number(req.body.id)) {
    return next(new errors.forbidden('You are not allowed to update this user'));
  } else {
    return next();
  }
}
