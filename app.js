/**
 * Created by kattamum on 9/27/2016.
 */

var express=require('express');

var app=express();


var port=process.env.PORT ||5000;

//to use static files
app.use(express.static('public'));
app.use(express.static('src/views'));

app.get('/', function (req,resp) {
    resp.send('welcome to my express api');

});


app.listen(port, function () {
    console.log('running on port:'+port);
});

