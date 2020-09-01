var express= require('express');
var router = express.Router();
var UsuarioController= require('../../controllers/api/users');

router.get('/',UsuarioController.usuarios_list);
router.post('/create', UsuarioController.usuarios_create);
router.post('/reservar',UsuarioController.usuario_reservar);

module.exports= router;
