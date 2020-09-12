var Usuario = require('../models/users');

exports.user_list = ((req, res, next) => {
    Usuario.find({}, (err, users)=>{
        res.render('users/index', {usuarios: users});
    });
});

exports.user_update_view = ((req, res, next) => {
    Usuario.findById(req.params.id, (err, user)=>{
        res.render('users/update', {errors:{}, usuario: user});
    });
});

exports.user_update = ((req, res, next) => {
    var updateValues = ({nombres: req.body.nombres, apellidos: req.body.apellidos, telefono: req.body.telefono, email: req.body.email});
    Usuario.findByIdAndUpdate(req.params.id, updateValues, (err, user)=>{
        if(err){
            console.log(err);
            res.render('users/update',{errors: err.errors, usuario: new Usuario({nombres: req.body.nombres, apellidos: req.body.apellidos, telefono: req.body.telefono, email: req.body.email})});
        }
        else{
            res.redirect('/bicynet/users/');
            return;
        }
    });
});

exports.user_create_view = ((req, res) =>{
    res.render('login/index', {errors:{}, usuario:new Usuario()});
    //res.redirect('/login');
});

exports.user_create = ((req, res, next)=>{
    if(req.body.password != req.body.confirm_password){
        res.render('login/index', {errors: {confirm_password:{message:'La contraseña no coincide.'}}, usuario: new Usuario({nombres:req.body.nombres, apellidos: req.body.apellidos, telefono: req.body.telefono, email:  req.body.email, password: req.body.password})});
        return;
    }

    Usuario.create({nombres: req.body.nombres, apellidos: req.body.apellidos, telefono: req.body.telefono, email: req.body.email, password: req.body.password}
        , function(err, newuser){
        if(err){
            res.render('login/index',{errors: err.errors, usuario: new Usuario({nombres: req.body.nombres, apellidos: req.body.apellidos, telefono: req.body.telefono, email: req.body.email, password: req.body.password})});
        }
        else{
            newuser.enviar_email_bienvenida();
            res.redirect('/bicynet/users/');
        }
    });
});

exports.user_remove = ((req, res, next)=>{
    Usuario.findByIdAndDelete(req.body.id, function(err){
        if(err){
            next(err);
        }
        else{
            res.redirect('/bicynet/users/');
        }
    });
});


