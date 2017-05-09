/**
 * Created by kattamum on 9/27/2016.
 */

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();




var port = process.env.PORT || 5000;

var nav = [
    { Link: '/Books', Text: 'Book' },
    { Link: '/Authors', Text: 'Author' }
];

var bookRouter = require('./src/routes/bookRoutes')(nav); // importing book router
var adminRouter = require('./src/routes/adminRoutes')(nav); // importing admin router
var authRouter = require('./src/routes/authRoutes')(nav); // importing auth router
var authorRouter = require('./src/routes/authorRoutes')(nav); // importing author router

//to use static files
app.use(express.static('public'));
//app.use(express.static('src/views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded()); //used for transform the posted data into json

app.use(cookieParser());
app.use(session({ secret: 'library' }));

require('./src/config/passport')(app); // passport auth

app.set('views', './src/views');
//app.set('view engine','jade');  // setting jade view engine

// var handlebars= require('express-handlebars');
// app.engine('.hbs',handlebars({extname:'.hbs'}));

// app.set('view engine','.hbs');  // setting hbs view engine

app.set('view engine', 'ejs');  // setting ejs view engine

// app.get('/', function (req,resp) {
//     resp.send('welcome to my express api');

// });


app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);
app.use('/Authors', authorRouter);


app.get('/', function (req, resp) {
    resp.render('index', {
        title: 'Hello from render', nav: [
            { Link: '/Books', Text: 'Books' },
            { Link: '/Authors', Text: 'Authors' }
        ]
    }); // list passed to view

});


app.listen(port, function () {
    console.log('running on port:' + port);
});

