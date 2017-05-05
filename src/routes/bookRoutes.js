var express = require('express');

var bookRouter = express.Router();

var router = function (nav) {

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
        }
    ];

    bookRouter.route('/')
        .get(function (req, resp) {
            resp.render('bookListView', {
                title: 'Books', nav: nav,
                books: books
            });
        });

    bookRouter.route('/:id')
        .get(function (req, resp) {
            var id = req.params.id;
            resp.render('bookView', {
                title: 'Books', nav: nav,
                book: books[id]
            });
        });

    return bookRouter;

};



module.exports = router;