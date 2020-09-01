const Bicicleta = require('../../models/bikes');


exports.bicicletas_list = ((req, res) => {
    Bicicleta.allBicis(function(err,bicis){
        res.status(200).json({
            bicicletas: bicis
        });
    });
});

exports.bicicletas_create = ((req, res) => {
    var bici = ({code: req.body.code, color: req.body.Color, modelo:req.body.Modelo, ubicacion:[req.body.Lat, req.body.Long]});

    Bicicleta.add(bici, function(err,newbici){
        if(err) console.log(err);
        res.status(200).json({
            bicicleta: newbici
        });
    });
});

exports.bicicletas_update = ((req, res) => {
    var bici = ({code: req.body.code, color: req.body.Color, modelo:req.body.Modelo, ubicacion:[req.body.Lat, req.body.Long]});
    
    Bicicleta.updateByCode(bici.code,bici,function(err, biciupdate){
        if(err) console.log(err);
        res.status(200).json({
            bicicleta: biciupdate,
            message: 'Bicicleta Actualizada'
        });
    });
});

exports.bicicletas_delete = ((req,res) => {
    var code = req.body.code;
    Bicicleta.removeByCode(code, function(err,bicidelete){
        res.status(204).json({
            message: 'Bicicleta Eliminada'
        });
    });
});