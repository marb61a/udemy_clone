module.exports = {
    database : 'mongodb://root:abcd1234@ds019866.mlab.com:19866/udemy_clone',
    port : 8080,
    facebook : {
        clientId : '1772337306315495',
        clientSecret : '9132b1538e1b03f8e20835c2fe2c1bfb',
        profileFields : ['emails', 'displayName'],
        callbackURL : 'https://node-testing-marb.c9.io:8080/auth/facebook/callback'
    }
};

