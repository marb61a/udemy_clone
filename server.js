var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");


var app = express();

// mongodb://root:abcd1234@ds019866.mlab.com:19866/udemy_clone 
// 
mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds019866.mlab.com:19866/udemy_clone', function(err){
    if(err){
        console.log(err);
    } else {
        console.log('Connected to DB');
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(morgan('dev'));

app.get('/', function(req, res, next){
    res.json('home');
});

app.listen(process.env.PORT, process.env.IP, function(err){
    if(err){
        console.log(err);
    } else {
        console.log('Running');
    }    
});