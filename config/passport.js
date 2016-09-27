var passport = require("passport");
var FacebookStrategy = require("passport-facebook").Strategy;
var secret = require("../config/secret");
var async = require("async");
var request =require("request");

var User = require("../models/user");

passport.serializeUser(function(user, done){
    done(null, user._id);    
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);    
    });  
});

passport.use(new FacebookStrategy(secret.facebook, function(req, token, refreshToken, profile, done){
    User.findOne({ facebook : profile.id }, function(err, user){
        if(err) return done(err);
        
        if(user){
            return done(null, user);
            req.flash('loginMessage', 'Successfully loggedIn with Facebook');
        } else {
            async.waterfall([
                function(callback){
                    var newUser = new User;
                    newUser.email = profile._json.email;
                    newUser.facebook = profile.id;
                    newUser.tokens.push({kind : 'facebook', token : token});
                    newUser.profile.name = profile.displayName;
                    newUser.profile.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
                    
                    newUser.save(function(err){
                        if(err){
                            throw err;
                        }
                        
                        req.flash('loginMessage', 'Successfully loggedIn with Facebook');
                        callback(err, newUser);
                    });
                },
                
                function(callback){
                    
                }
            ]);
        }
    });
    
}));