const express = require('express');
var router = express.Router();

var bicicleta = require('../../controllers/api/bikes');

router.get('/bicicletas', bicicleta.bicicletas_list);
router.post('/bicicleta/create', bicicleta.bicicletas_create);
router.delete('/bicicleta/delete', bicicleta.bicicletas_delete);
router.put('/bicicleta/update', bicicleta.bicicletas_update);

module.exports= router;