const express = require('express');
var router = express.Router();

var verificarUsuer = require('../../controllers/api/auth').verificarLogged;//LoggedIn para API

var bicicleta = require('../../controllers/api/bikes');

router.get('/bicicletas', bicicleta.bicicletas_list);
router.post('/bicicleta/create',verificarUsuer, bicicleta.bicicletas_create);
router.delete('/bicicleta/delete', verificarUsuer, bicicleta.bicicletas_delete);
router.put('/bicicleta/update', verificarUsuer, bicicleta.bicicletas_update);

module.exports= router;