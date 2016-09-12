var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");


var app = express();

var secret = require("./config/secret");

mongoose.connect(secret.database, function(err){
    if(err){
        console.log(err);
    } else {
        console.log('Connected to DB');
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(morgan('dev'));

require("./routes/main")(app);

app.listen(process.env.PORT, process.env.IP, function(err){
    if(err){
        console.log(err);
    } else {
        console.log('Running on port ' + process.env.PORT);
    }    
});