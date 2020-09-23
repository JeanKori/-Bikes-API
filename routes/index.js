var express = require('express');
var router = express.Router();
var user = require('../models/users');

const logged = require('../controllers/login');//Middelware

/* GET home page. */
router.get('/',logged.loggedIn, function(req, res) {
      res.render('index', { title: 'Express',usuario_rol: req.role, validate: true });
});

router.get('/_', function(req, res) {
    res.render('index', { title: 'Express',validate: true });
});

module.exports = router;
