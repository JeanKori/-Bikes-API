var Usuario = require('../models/users');
var Token = require('../models/token');

exports.confirmationGet =function(req, res, next){
    Token.findOne({token: req.params.token}, function(err, token){
        if(!token){
            return res.render('login/ErrorToken',{info: {type: 'Not Verified', message: 'El Token no coincide con ninguno asigando. Quizas haya expirado y debas de solicitar un nuevo Token.'}});
            // return res.status(400).send({
            //     type: 'not-verified',
            //     msg: 'El Token no coincide con ninguno asigando. Quizas haya expirado y debas de solicitar un nuevo Token.'
            // });
        }
        Usuario.findById(token._userId, function(err, usuario){
            if(!usuario){
                return res.render('login/ErrorToken',{info: {type: 'User not existent', message: 'No existe un usuario asociado a este Token de confirmacion de Cuenta.'}});
                // return res.status(400).send({
                //     msg: 'No encontramos un usuario con este token asignado.'
                // });
            }
            if(usuario.verificado) return res.redirect('/bicynet/users/');
            usuario.verificado = true;
            usuario.save(function(err){
                if(err){
                    return res.status(500).send({
                        msg: err.message
                    });
                }
                res.redirect('/bicynet/')
            });
        });
    });
}