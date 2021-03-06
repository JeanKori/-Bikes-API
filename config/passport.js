const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
const Usuario = require('../models/users');

// Usuario.validatepassword

// Estrategia local
passport.use(new LocalStrategy(
    function(email, password, done){
        Usuario.findOne({email: email}, function(err, user){
            if(err) return done(err);
            if(!user) return done(null, false, {message: 'No existe un usuario registrado con el email: '+email});
            if(!user.validPassword(password)) return done(null, false, {message: 'Contraseña incorrecta'}); 
            if(!user.verificado) return done(null, false, {message: 'Es necesario que su cuenta este verificada, para poder acceder.\n Si ya ha registrado sus credenciales, puede dirigirse a su correo donde se le ha enviado un mensaje, para verificar su cuenta'});
            return done(null, user);
        });
    }
));

// Estrategia google outh 2.0
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.WEB_URL + "/auth/google/callback"
    },  function(accessToken, refreshToken, profile, cb){
            console.log(profile);

            Usuario.findOneOrCreateByGoogle(profile, function(error, user){
                return cb(error, user);
            });
        }
));

// Estrategia outh con facebook a traves de verificacion de token
passport.use(new FacebookTokenStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET
    }, function (accessToken, refreshToken, profile, done) {
        try {
            Usuario.findOneOrCreateByFacebook(profile,function (err,user){
                if (err) console.log('err'+err);
                return done(err,user);
            });
        } catch(error) {
            console.log(error);
            return done(error, null);
        }
    }
));


passport.serializeUser(function(user,cb){
    cb(null, user.id);
});

passport.deserializeUser(function(id,cb){
    Usuario.findById(id, function(err, user){
        cb(err, user);
    });
});

module.exports = passport;