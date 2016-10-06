var Course = require("../models/course");
var User = require('../models/user');

var async = require('async');

module.exports = function(app){
    app.get('/', function(req, res, next){
        res.render('main/home');
    });
    
    app.get('/courses', function(req, res, next){
        Course.find({}, function(err, courses){
            res.render('courses/courses', { courses: courses });
        });
    });
};