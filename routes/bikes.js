const express = require('express');
var router = express.Router();
var bikesController = require('../controllers/bikes');
const login = require('../controllers/login');

// Middleware para asegurar el inicio de session
router.use(login.loggedIn);
//Middleware con permisos
router.use(login.permision_roles);

router.get('/bicicletas', bikesController.bicicleta_list);
router.get('/bicicleta', bikesController.bicicleta_create_get);
router.post('/bicicleta',bikesController.bicicleta_create);
router.get('/bicicleta/:id', bikesController.bicicleta_update_view);
router.post('/bicicleta/update/:id', bikesController.bicicleta_update);
router.post('/bicicleta/:id', bikesController.bicicleta_remove);


module.exports= router;

