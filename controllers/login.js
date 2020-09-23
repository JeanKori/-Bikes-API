const passport = require('../config/passport');
const User = require('../models/users');
const Token = require('../models/token');
const rol=['ordinary','admin','Super_admin'];

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

exports.resertPassword_view = function(req, res){
    Token.findOne({token: req.params.token}, function(err, token){
        if (!token){
            return res.render('login/ErrorToken',{info: {type: 'Not Verified', message: 'Token inexistente o no valido. Verifique que el token no haya expirado.'}});
        }
        User.findById(token._userId, function(err, user){
            if(!user){
                return res.render('login/ErrorToken',{info: {type: 'User not existent', message: 'No existe un usuario asociado al Token.'}});
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

//Middleware de verificacion de Login --
exports.loggedIn =function loggedIn(req, res, next){
    if(req.user){
        req.role = req.user.role;
        next();
    }
    else{
        console.log('usuario no logueado');
        res.redirect('/bicynet/_');
    }
};

// Middleware para verificar los permisos de usuario no ordinario
exports.permision_roles = function typeroles(req, res, next){
    if(req.user.role != rol[0]){
        next();
        console.log('usuario con permisos de administrador');
    }
    else{
        console.log('usuario no tiene permisos de administrador');
        res.redirect('/bicynet/');
    }
};

//Middleware para pestaña de login
exports.userlogueado =function logueado(req, res, next){
    if(req.user){
        res.redirect('/bicynet/');
        console.log('usuario logueado');
    }
    else{
        next();
    }
};

//Middleware para el caso de creacion de usuario que utilizamos una misma vista
exports.permision_create_user =function create_user(req, res, next){
    if(req.user){
        req.role = req.user.role;
        next();
    }
    else{
        req.role= "denegate"
        console.log('usuario sin permisos para vista');
        next();
    }
};








