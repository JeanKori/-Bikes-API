var bicicleta = require('../models/bikes');

exports.bicicleta_list = ((req, res) => {
    res.render('bicicletas/index', {bicis : bicicleta.allBicis});
});

exports.bicicleta_create_get = ((req, res) => {
    res.render('bicicletas/create');
});

exports.bicicleta_create = ((req,res)=>{
    var bici = new bicicleta(req.body.id, req.body.Color, req.body.Modelo);
    bici.ubicacion = [req.body.Lat, req.body.Long];
    bicicleta.add(bici);
    res.redirect('/bicynet/network/bicicletas');
});

exports.bicicleta_update_view = ((req, res) => {
    var bici = bicicleta.findByID(req.params.id);

    res.render('bicicletas/update', {bici});
});

exports.bicicleta_update = ((req,res)=>{
    var bici = bicicleta.findByID(req.params.id);
    bici.id= req.body.id;
    bici.color= req.body.Color;
    bici.modelo= req.body.Modelo;
    bici.ubicacion = [req.body.Lat, req.body.Long];

    res.redirect('/bicynet/network/bicicletas');
});

exports.bicicleta_remove = ((req, res) => {
    var id = req.body.id;
    bicicleta.removeByID(id);
    res.redirect('/bicynet/network/bicicletas');
});