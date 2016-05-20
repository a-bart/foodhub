var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController');
var usersController = require('../controllers/usersController');
var shopsController = require('../controllers/shopsController');
var sessionsController = require('../controllers/sessionsController');
var ordersController = require('../controllers/ordersController');
var postOrderController = require('../controllers/postOrderController');
var passport = require('passport');
var isAuthenticated = require('../middleware/isAuthenticated');
var validators = require('../middleware/validators');

//Authentication//
router.get('/login/facebook', authController.loginFacebook);
router.get('/login/facebook/return',
  passport.authenticate('facebook', {
    failureRedirect: '/api/v1'
  }),
  authController.loginFacebookResult);
router.get('/login/vkontakte', authController.loginVkontakte);
router.get('/login/vkontakte/return',
  passport.authenticate('vkontakte', {
    failureRedirect: '/api/v1'
  }),
  authController.loginVkontakteResult);
router.post('/logout', isAuthenticated, authController.logout);

//Users//
router.get('/users', isAuthenticated, usersController.index);
router.get('/users/:id', isAuthenticated, validators.validParamsID, usersController.show);
router.put('/users', isAuthenticated, validators.validBodyID, validators.alowedToModifyUser, usersController.update);

//Shops//
router.get('/shops', isAuthenticated, shopsController.index);
router.get('/shops/:id', isAuthenticated, validators.validParamsID, shopsController.show);

//Sessions//
router.get('/sessions', isAuthenticated, sessionsController.index);
router.get('/sessions/:id', isAuthenticated, validators.validParamsID, sessionsController.show);
router.post('/sessions', isAuthenticated, sessionsController.create);
router.put('/sessions', isAuthenticated, validators.validBodyID, sessionsController.update);

//Orders//
router.post('/orders', isAuthenticated, validators.validBodySessionID, ordersController.create);
router.put('/orders', isAuthenticated, validators.validBodyID, ordersController.update);
router.delete('/orders/:id', isAuthenticated, validators.validParamsID, ordersController.delete);

//Post order//
router.post('/postorder', isAuthenticated, validators.validBodyID, postOrderController.create);

exports.router = router;
