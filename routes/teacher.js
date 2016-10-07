var User = require('../models/user');
var Course = require('../models/course');

var async = require('async');

module.exports = function(app){
    app.route('/become-an-instructor')
    
    .get(function(req, res, next){
        res.render('teacher/become-instructor');
    })
    
    .post(function(req, res, next){
        async.waterfall([
            function(callback){
                var course = new Course();
                course.title = req.body.title;
                course.save(function(err){
                    callback(err, course);
                });
            } 
        ]);
    }
    );
};
