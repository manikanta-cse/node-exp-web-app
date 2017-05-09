
var authorContoller = function (bookService, nav) {


    var middleware = function (req, resp, next) {
        if (!req.user) {
            resp.redirect('/');
        }
        next();
    };


    var getAuthors = function (req, resp) {
        bookService.getAuthors(function (err, results) {
            resp.render('authorListView', {
                title: 'Authors', nav: nav,
                author: results
            });
        });
    };

    return {
        getAuthors: getAuthors,
        middleware: middleware
    };
};

module.exports = authorContoller;