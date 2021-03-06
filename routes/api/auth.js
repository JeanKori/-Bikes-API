const express = require('express');
const router = express.Router();
const passport = require('../../config/passport');

const authController = require('../../controllers/api/auth');

router.post('/authenticate', authController.authenticate);
router.post('/forgotpassword', authController.forgotpassword);
router.post('/facebookToken', passport.authenticate('facebook-token'), authController.authFacebookToken);
 
module.exports = router;

//http://localhost:3000/token/confirmation/be6f959a085600001c5827eaf3db74ee81245aa422ce5945222ac05f6a51839b