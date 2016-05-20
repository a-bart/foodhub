exports.badRequest = function(message) {
  this.message = message || 'Request params are incorrect';
  this.status = 400;
};

exports.unauthorized = function(message) {
  this.message = message || 'Unauthorized';
  this.status = 401;
};

exports.forbidden = function(message) {
  this.message = message || 'Forbidden';
  this.status = 403;
};

exports.notFound = function(message) {
  this.message = message || 'Resource not found';
  this.status = 404;
};

exports.internal = function(message) {
  this.message = message || 'Internal Server Error';
  this.status = 500;
};

exports.handler = function(err, req, res, next) {
  var error = {
    code: err.status || 500,
    message: err.message,
  };
  if (process.env.NODE_ENV !== 'production') {
    error.stacktrace = (new Error().stack).split(/\n */)
  };
  res.status(error.code).json(error);
};
