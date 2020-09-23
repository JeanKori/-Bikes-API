var express = require('express');
var router = express.Router();
const UsuarioController = require('../controllers/users');
const login = require('../controllers/login');


// Middleware para garantizar el logueo de usuario
const logueado= login.loggedIn;

// Middleware para garantizar solo usuarios con permisos
const permision= login.permision_roles;

// middleware para la creacion de usuario
const user_create = login.permision_create_user;

router.get('/', logueado, permision, UsuarioController.user_list);
router.get('/create', logueado, permision, UsuarioController.user_create_view);
router.post('/create',user_create, UsuarioController.user_create);
router.get('/update/:id', logueado, permision, UsuarioController.user_update_view);
router.post('/update/:id', logueado, permision, UsuarioController.user_update);
router.post('/delete/:id', logueado, permision, UsuarioController.user_remove);

module.exports = router;
