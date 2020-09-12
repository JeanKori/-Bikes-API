const Users = require('../../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.authenticate = function(req, res, next){
    Users.findOne({email: req.body.email}, function(err, userInfo){
        if(err){
            next();
        } 
        else{
            if(userInfo==null){
                return res.status(401).json({
                    status:'error',
                    message: 'Invalido email/contraseña',
                    data: null
                });
            }
            if(userInfo!=null && bcrypt.compareSync(req.body.password, userInfo.password)){
                // userInfo.save(function(err, user){
                    const token = jwt.sign({id: userInfo._id}, req.app.get('SecretKey'),{expiresIn: '7d'});
                    res.status(200).json({
                        message: 'Usuario encontrado', 
                        data: {usuario: userInfo, token: token}
                    });
                // });
            }
            else{
                res.status(401).json({
                    status: 'error',
                    message: 'Invalido email/contraseña',
                    data: null
                });
            }
        }
    });
};

exports.forgotpassword = function(req, res, next){
    Users.findOne({email: req.body.email}, function(err, user){
        if(!user){
            return res.status(401).json({
                message: 'Usuario no registrado',
                data: null
            });
        }
        user.resetpassword(function(err){
            if(err){
                return next(err);
            }
            res.status(200).json({
                message: 'Se ha enviado a su cuenta de email, las instrucciones para el restablecimiento de la contraseña.',
                data: null
            });
        });
    });
}

//Metodo de verificacion de Login Para api --que se utilizara como middleware
exports.verificarLogged= function validaruser(req, res, next){
    jwt.verify(req.headers['x-access-token'], req.app.get('SecretKey'), function(err, decoded){
      if(err){
        res.json({status:'error', message:err.message, data:null});
      }
      else{
        req.body.userId= decoded.id;
        console.log('jwt verify: ' +decoded);
        next();
      }
    });
};