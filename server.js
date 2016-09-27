var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");
var ejs = require("ejs");
var engine = require("ejs-mate");
var passport = require("passport");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var MongoStore = require("connect-mongo/es5")(session);
var flash = require("express-flash");


var app = express();

var secret = require("./config/secret");

mongoose.connect(secret.database, function(err){
    if(err){
        console.log(err);
    } else {
        console.log('Connected to DB');
    }
});


app.use(express.static(__dirname + "/public"));
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
    resave : true,
    saveUninitialized : true,
    secret : secret.secretKey,
    store : new MongoStore({url : secret.database, autoReconnect : true})
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


require("./routes/main")(app);
require("./routes/user")(app);

app.listen(process.env.PORT, process.env.IP, function(err){
    if(err){
        console.log(err);
    } else {
        console.log('Running on port ' + process.env.PORT);
    }    
});