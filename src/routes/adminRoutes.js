var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [

    {
        title: 'Test 1',
        genre: 'Test Genre 1',
        author: 'self 1 ',
        read: false
    },
    {
        title: 'Test 2',
        genre: 'Test Genre 2',
        author: 'self 2',
        read: false
    },
    {
        title: 'Test 3',
        genre: 'Test Genre 3',
        author: 'self 3',
        read: false
    },
    {
        title: 'Test 4',
        genre: 'Test Genre 4',
        author: 'self 4',
        read: false
    }

];


var router = function (nav) {

    adminRouter.route('/addBooks')
        .get(function (req, resp) {
            var url = 'mongodb://localhost:27017/libararyApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.insertMany(books, function (err, results) {
                    resp.send(results);
                    db.close();
                });

            })
            //resp.send('inserting books');

        })

    return adminRouter;
}


module.exports = router;
