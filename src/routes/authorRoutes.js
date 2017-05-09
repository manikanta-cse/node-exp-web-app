var express = require('express');

var authorRouter = express.Router();

var router = function (nav) {



    var bookService = require('../services/goodreadsService')(); // importing book service

    var AuthorController = require('../controllers/authorController')(bookService, nav); // importing author controller

    authorRouter.use(AuthorController.middleware);

    authorRouter.route('/')
        .get(AuthorController.getAuthors);

    return authorRouter;
};

module.exports = router;