var Usuario = require('../models/users');

exports.user_list = ((req, res) => {
    Usuario.find({}, (err, users)=>{
        res.render('users/index', {usuarios: users, usuario_rol: req.role});
    });
});

exports.user_update_view = ((req, res) => {
    Usuario.findById(req.params.id, (err, user)=>{
        res.render('users/update', {errors:{}, usuario: user, usuario_rol: req.role});
    });
});

exports.user_update = ((req, res) => {
    var updateValues = ({nombres: req.body.nombres, apellidos: req.body.apellidos, telefono: req.body.telefono, email: req.body.email});
    Usuario.findByIdAndUpdate(req.params.id, updateValues, (err, user)=>{
        if(err){
            console.log(err);
            res.render('users/update',{errors: err.errors, usuario: new Usuario({nombres: req.body.nombres, apellidos: req.body.apellidos, telefono: req.body.telefono, email: req.body.email}), usuario_rol:req.role});
        }
        else{
            res.redirect('/bicynet/users/');
            return;
        }
    });
});

exports.user_create_view = ((req, res) =>{
    var rol = req.role;
    if( rol == 'Super_admin'){
        res.render('login/index', {errors:{}, usuario:new Usuario(), usuario_rol: req.role});
    }
    else{
        res.redirect('/bicynet/');
    }
});

exports.user_create = ((req, res)=>{
    var rol = req.role;

    if(req.body.password != req.body.confirm_password){
        if(rol=="denegate"){
        res.render('login/index', {errors: {confirm_password:{message:'La contraseña no coincide.'}}, usuario: new Usuario({nombres: req.body.nombres, apellidos: req.body.apellidos, telefono: req.body.telefono, email: req.body.email, password: req.body.password})});
        return;
        }
        if(rol=="Super_admin"){
            res.render('login/index', {errors: {confirm_password:{message:'La contraseña no coincide.'}}, usuario_rol: rol,usuario: new Usuario({nombres: req.body.nombres, apellidos: req.body.apellidos, telefono: req.body.telefono, email: req.body.email, password: req.body.password, role: req.body.rol})});
            return;
        }
    }
    if(rol=="Super_admin"){
        Usuario.create({nombres: req.body.nombres, apellidos: req.body.apellidos, telefono: req.body.telefono, email: req.body.email, password: req.body.password, role: req.body.rol}, function(err, newuser){
            if(err){
                res.render('login/index',{errors: err.errors, usuario_rol: rol, usuario: new Usuario({nombres: req.body.nombres, apellidos: req.body.apellidos, telefono: req.body.telefono, email: req.body.email, password: req.body.password, role: req.body.rol})});
            }
            else{
                newuser.enviar_email_bienvenida();
                res.redirect('/bicynet/users/');
            }
        });
    }
    if(rol=="denegate"){
        Usuario.create({nombres: req.body.nombres, apellidos: req.body.apellidos, telefono: req.body.telefono, email: req.body.email, password: req.body.password}, function(err, newuser){
            if(err){
                res.render('login/index',{errors: err.errors, usuario: new Usuario({nombres: req.body.nombres, apellidos: req.body.apellidos, telefono: req.body.telefono, email: req.body.email, password: req.body.password})});
            }
            else{
                newuser.enviar_email_bienvenida();
                res.redirect('/login');
            }
        });
    }
});

exports.user_remove = ((req, res)=>{
    Usuario.findByIdAndDelete(req.body.id, function(err){
        if(err){
            next(err);
        }
        else{
            res.redirect('/bicynet/users/');
        }
    });
});


