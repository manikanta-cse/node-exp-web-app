/**
 * Created by kattamum on 9/27/2016.
 */

var express=require('express');

var app=express();


var port=process.env.PORT ||5000;

//to use static files
app.use(express.static('public'));
//app.use(express.static('src/views'));
app.set('views','./src/views');
//app.set('view engine','jade');  // setting jade view engine

// var handlebars= require('express-handlebars');
// app.engine('.hbs',handlebars({extname:'.hbs'}));

// app.set('view engine','.hbs');  // setting hbs view engine

app.set('view engine','ejs');  // setting ejs view engine

// app.get('/', function (req,resp) {
//     resp.send('welcome to my express api');

// });

app.get('/', function (req,resp) {
    resp.render('index',{title:"Hello from render",list:['a','b']}); // list passed to view

});


app.listen(port, function () {
    console.log('running on port:'+port);
});

