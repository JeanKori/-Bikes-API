var bicicleta = require('../models/bikes');

exports.bicicleta_list = ((req, res) => {
    bicicleta.allBicis(function(err, bici){
        res.render('bicicletas/index', {bicis : bici, usuario_rol:req.role});
    });
});

exports.bicicleta_create_get = ((req, res) => {
    res.render('bicicletas/create',{usuario_rol:req.role});
});

exports.bicicleta_create = ((req,res)=>{
    var bici = ({code: req.body.code, color: req.body.Color, modelo:req.body.Modelo, ubicacion:[req.body.Lat, req.body.Long]});
    bicicleta.add(bici, function(err, newBici){
        if(err){
            res.render('bicicletas/create',{bici: newBici});
        }
        res.redirect('/bicynet/network/bicicletas');
    })
});

exports.bicicleta_update_view = ((req, res) => {
    bicicleta.findByIdBici(req.params.id, function(err, bicy){
        res.render('bicicletas/update', {bici: bicy, usuario_rol:req.role});
    });
});

exports.bicicleta_update = ((req,res)=>{
    var bici = ({code: req.body.code, color: req.body.Color, modelo:req.body.Modelo, ubicacion:[req.body.Lat, req.body.Long]});
    bicicleta.updateByCode(bici.code, bici, function(err,updateBici){
        if(err) res.render('bicicletas/update',{bici: updateBici});
        res.redirect('/bicynet/network/bicicletas');
    });
});

exports.bicicleta_remove = ((req, res) => {
    bicicleta.removeByIdBici(req.body.id, function(err){
        res.redirect('/bicynet/network/bicicletas');
    })
});