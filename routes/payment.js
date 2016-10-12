var User = require('../models/user');
var Course = require('../models/course');
var stripe = require('stripe')('');
var async = require('async');

module.exports = function(app){
    app.post('/payment', function(req, res, next){
        var stripeToken = req.body.stripeToken;
        var courseId = req.body.courseId;
        
        console.log(courseId);
        
        async.waterfall([
            function(callback){
                Course.findOne({ _id: courseId }, function(err, foundCourse){
                    if(foundCourse)
                        callback(err, foundCourse);
                });
            }    
        ]);
    });
};