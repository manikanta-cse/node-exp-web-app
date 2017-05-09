var http = require('http');
var xml2js = require('xml2js');
var parser = xml2js.Parser({ explicitArray: false });

var goodreadsService = function () {

    var getBookById = function (id, cb) {

        var options = {
            host: 'www.goodreads.com',
            path: '/book/show/' + id + '?format=xml&key=FtWPx8xRE6IOzwL7RolgA'
        };

        var callback = function (response) {
            var str = '';

            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                console.log(str);
                parser.parseString(str, function (err, result) {
                    console.log('json', result);
                    cb(null, result.GoodreadsResponse.book);
                });
            });


        };


        http.request(options, callback).end();
    };

    var getAuthors = function (cb) {

        var options = {
            host: 'www.goodreads.com',
            path: '/author/list/18541?format=xml&key=FtWPx8xRE6IOzwL7RolgA'
        };

        var callback = function (response) {
            var str = '';

            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                console.log(str);
                parser.parseString(str, function (err, result) {
                    console.log('authors json', result.GoodreadsResponse.author.books.book[0]);
                    cb(null, result.GoodreadsResponse.author);
                });
            });


        };


        http.request(options, callback).end();
    };

    return {
        getBookById: getBookById,
        getAuthors: getAuthors
    };

};


module.exports = goodreadsService;