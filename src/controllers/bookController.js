var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;


var bookController = function (bookService, nav) {

    var middleware = function (req, resp, next) {
        if (!req.user) {
            resp.redirect('/');
        }
        next();
    };

    var getIndex = function (req, resp) {


        var url = 'mongodb://localhost:27017/libararyApp';

        mongodb.connect(url, function (err, db) {

            var collection = db.collection('books');

            collection.find({}).toArray(function (err, results) {
                //console.log(results);
                resp.render('bookListView', {
                    title: 'Books', nav: nav,
                    books: results
                });

            });

        });


    };

    var getById = function (req, resp) {

        var url = 'mongodb://localhost:27017/libararyApp';
        var id = new objectId(req.params.id);

        mongodb.connect(url, function (err, db) {

            var collection = db.collection('books');

            collection.findOne({ _id: id }, function (err, results) {
                console.log(results);
                if (results.bookId) {
                    bookService.getBookById(results.bookId, function (err, book) {

                        results.book = book;

                        resp.render('bookView', {
                            title: 'Books', nav: nav,
                            book: results
                        });
                    });
                }

                else {
                    resp.render('bookView', {
                        title: 'Books', nav: nav,
                        book: results
                    });
                }



            });

        });

    };

    return {
        getIndex: getIndex,
        getById: getById,
        middleware: middleware

    };

};

module.exports = bookController;