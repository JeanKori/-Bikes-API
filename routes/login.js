const LG = require('../controllers/login');
var express = require('express');
var router = express.Router();

router.get('/',LG.Login);
router.post('/',LG.login_acceso);
router.get('/logout',LG.Logout);
router.get('/forgotpassword',LG.view_forgot_password);
router.post('/forgotpassword',LG.forgot_password);
router.get('/resetpassword/:token', LG.resertPassword_view);
router.post('/resetpassword', LG.resetPassword);

module.exports = router;