var express = require('express');
var router = express.Router();
const UsuarioController = require('../controllers/users');

router.get('/', UsuarioController.user_list);
router.get('/create', UsuarioController.user_create_view);
router.post('/create', UsuarioController.user_create);
router.get('/update/:id', UsuarioController.user_update_view);
router.post('/update/:id', UsuarioController.user_update);
router.post('/delete/:id', UsuarioController.user_remove);

module.exports = router;
