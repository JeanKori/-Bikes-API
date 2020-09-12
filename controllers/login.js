const passport = require('../config/passport');
const User = require('../models/users');
const Token = require('../models/token');


exports.Login = function(req, res){
    res.render('login/index', {errors:{},usuario:new User()});
};

exports.login_acceso = function(req, res, next){
    passport.authenticate('local', function(err, user, info){
        if(err) return next(err);
        if(!user) return res.render('login/index',{info,errors:{},usuario:new User()});
        req.logIn(user, function(err){
            if(err) return next(err);
            return res.redirect('/bicynet/');
        });
    })(req, res, next);
};

exports.Logout = function(req, res){
        req.logout();
        res.redirect('/bicynet');
};

exports.view_forgot_password = function(req, res){
    res.render('login/forgotpassword');
};

exports.forgot_password = function(req, res){
    User.findOne({email:req.body.email},function(err, user){
        if(!user) return res.render('login/forgotpassword',{info: {message: 'Correo electronico no registrado. Verifique nuevamente el correo ingresado.'}});

        user.resetpassword(function(err){
            if (err) return (err);
            console.log('login/forgotpswMessage');
        });

        res.render('login/forgotpswMessage');
    })
};

exports.resertPassword_view = function(req, res, next){
    Token.findOne({token: req.params.token}, function(err, token){
        if (!token){
            return res.status(400).send({
                type: 'not-verified',
                msg: 'Token inexistente o no valido. Verifique que el token no haya expirado.'
            });
        }
        User.findById(token._userId, function(err, user){
            if(!user){
                return res.status(400).send({
                    msg: 'No existe un usuario asociado al Token.'
                });
            }
            res.render('login/resetPassword', {errors: {}, usuario: user});
        })
    });
};

exports.resetPassword = function(req, res){
    if(req.body.password != req.body.confirm_password){
        res.render('login/resetPassword', {errors: {confirm_password: {message: 'Las contraseñas ingresadas no coinciden.'}},
            usuario: new User({email: req.body.email}) }
        );
        return;
    }
    User.findOne({email: req.body.email}, function(err, user){
        user.password= req.body.password;
        user.save(function(err){
            if(err){
                res.render('login/resetPassword', {errors: err.errors, usuario: new User({email: req.body.email})});
            }
            else{
                res.redirect('/login');
            }
        });
    });
}

//Metodo de verificacion de Login --que se utilizara como middleware
exports.loggedIn =function loggedIn(req, res, next){
    if(req.user){
      next();
    }
    else{
      console.log('usuario no logueado');
      res.redirect('/login');
    }
};


