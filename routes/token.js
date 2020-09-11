var express = require('express');
var router = express.Router();
var TokenController = require('../controllers/token');

router.get('/confirmation/:token', TokenController.confirmationGet);

module.exports = router;