var express = require('express');
var passport = require('passport');
var morgan = require('morgan');
var cookie = require('cookie-parser');
var parser = require('body-parser');
var session = require('express-session');
var config = require('./config/config');
var routes = require('./routes/routes');
var errors = require('./errors/errors');
var stubAuth = require('./middleware/stubAuth');

var app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Credentials', false);
  res.header('Access-Control-Max-Age', '86400');
  res.header('X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

app.use(morgan('combined'));

app.use(cookie());

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 2000000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(parser.urlencoded({
  extended: true
}));

app.use(parser.json());

//app.use(stubAuth);

app.use('/api/v1', routes.router);
app.use(express.static('./frontend/build'));
app.use(errors.handler);

app.listen(config.serverPort, function() {
  console.log('Server is on ' + config.serverPort + ' port.');
});
