const Bicicleta = require('../../models/bikes');


exports.bicicletas_list = ((req, res) => {
    res.status(200).json({
        bicicletas: Bicicleta.allBicis
    });
});

exports.bicicletas_create = ((req, res) => {
    var bici = new Bicicleta(req.body.id, req.body.Color, req.body.Modelo);
    bici.ubicacion = [req.body.Lat, req.body.Long];

    Bicicleta.add(bici);

    res.status(200).json({
        bicicleta: bici
    });
});

exports.bicicletas_update = ((req, res) => {
    var updatebici= Bicicleta.findByID(req.body.id);
    updatebici.id = req.body.id;
    updatebici.color = req.body.Color;
    updatebici.modelo = req.body.Modelo;
    updatebici.ubicacion = [req.body.Lat, req.body.Long];

    res.status(200).send({
        bicicleta: updatebici,
        message: 'Bicicleta Actualizada'
    });
});

exports.bicicletas_delete = ((req,res) => {
    var id = req.body.id;
    Bicicleta.removeByID(id);
    res.status(204).send();
});