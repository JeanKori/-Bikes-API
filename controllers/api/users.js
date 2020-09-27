var usuario= require('../../models/users');
var Reserva = require('../../models/reserva');
const { model } = require('../../models/bikes');

exports.usuarios_list = function(req, res){
    usuario.find({}, function(err, users){
        res.status(200).json({
            usuarios:users 
        });
    });
};

exports.usuarios_create = function(req, res){
    var user= new usuario({nombres: req.body.nombres, apellidos: req.body.apellidos, telefono: req.body.telefono, email: req.body.email, password: req.body.password, role: req.body.role});
    user.save(function(err, users){
        if(err){
            res.status(500).send({
                error: err
            });
        }else{
            users.enviar_email_bienvenida();
            res.status(200).json({
                usuario:users 
            });
        }
    });
};

exports.usuario_reservar = function(req, res){
    usuario.findById(req.body.userid, function(err, users){
        console.log(users);
        users.reservar(req.body.biciid, req.body.desde, req.body.hasta, function(err, reservas){
            Reserva.findOne({_id: reservas.id},(err, reserva)=>{
                res.status(200).send({
                    message: "Reserva exitosa!!!",
                    Reservacion: reserva
                });
            });
        });
    });
};

