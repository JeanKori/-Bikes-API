var express = require('express');
var router = express.Router();
var user = require('../models/users');
const path = require('path');

const logged = require('../controllers/login');//Middelware

/* GET home page. */
router.get('/',logged.loggedIn, function(req, res) {
      res.render('index', { title: 'Bicycle Network',usuario_rol: req.role, validate: true });
});

router.get('/_', function(req, res) {
    res.render('index', { title: 'Bicycle Network',validate: true });
});

router.get('/privacy_policy', function(req, res){
    res.sendFile(path.resolve('public/privacy_policy.html'));
});

module.exports = router;
