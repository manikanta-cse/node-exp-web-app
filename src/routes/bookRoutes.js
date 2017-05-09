var express = require('express');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;



var bookRouter = express.Router();

var router = function (nav) {

    var bookService = require('../services/goodreadsService')(); // importing book service

    var bookController = require('../controllers/bookController')(bookService, nav); // importing book controller

    bookRouter.use(bookController.middleware);

    bookRouter.route('/')
        .get(bookController.getIndex);

    bookRouter.route('/:id')
        .get(bookController.getById);

    return bookRouter;

};



module.exports = router;