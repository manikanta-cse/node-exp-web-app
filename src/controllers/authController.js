var mongodb = require('mongodb').MongoClient;

var authController = function () {


    var signUp = function (req, res) {
        console.log(req.body);

        var url = 'mongodb://localhost:27017/libararyApp';

        mongodb.connect(url, function (err, db) {

            var collection = db.collection('users');
            var user = {
                username: req.body.userName,
                password: req.body.password
            };

            collection.insert(user, function (err, results) {

                req.login(results.ops[0], function () {
                    res.redirect('/auth/profile');
                });
            });

        });

    };




    var getProfile = function (req, res) {
        res.json(req.user);
    };

    var middleware = function (req, resp, next) {
        if (!req.user) {
            resp.redirect('/');
        }
        next();
    };

    return {
        signUp: signUp,
        getProfile: getProfile,
        middleware: middleware

    };
};


module.exports = authController;
