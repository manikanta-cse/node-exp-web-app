var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var router = function () {

    var AuthController = require('../controllers/authController')(); // importing auth controller

    authRouter.route('/signUp')
        .post(AuthController.signUp);


    authRouter.route('/signIn')
        .post( passport.authenticate('local', {
            failureRedirect: '/'
        }), function (req, resp) {
            resp.redirect('/auth/profile');
        });

    authRouter.route('/profile')
        .all(AuthController.middleware)
        .get(AuthController.getProfile);


    return authRouter;
};

module.exports = router;

