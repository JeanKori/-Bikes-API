const LG = require('../controllers/login');
var express = require('express');
var router = express.Router();

// Middleware para loggin
const logueado = require('../controllers/login').userlogueado;

router.get('/',logueado,LG.Login);
router.post('/',logueado,LG.login_acceso);
router.get('/logout',LG.Logout);
router.get('/forgotpassword', logueado,LG.view_forgot_password);
router.post('/forgotpassword',logueado,LG.forgot_password);
router.get('/resetpassword/:token',logueado, LG.resertPassword_view);
router.post('/resetpassword',logueado, LG.resetPassword);

module.exports = router;