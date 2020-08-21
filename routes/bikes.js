const express = require('express');
var router = express.Router();
var bikesController = require('../controllers/bikes');

router.get('/bicicletas', bikesController.bicicleta_list);
router.get('/bicicleta', bikesController.bicicleta_create_get);
router.post('/bicicleta', bikesController.bicicleta_create);
router.get('/bicicleta/:id', bikesController.bicicleta_update_view);
router.post('/bicicleta/update/:id', bikesController.bicicleta_update);
router.post('/bicicleta/:id', bikesController.bicicleta_remove);

module.exports= router;

