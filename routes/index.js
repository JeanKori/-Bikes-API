var express = require('express');
var router = express.Router();

const logged = require('../controllers/login').loggedIn;//Middelware

/* GET home page. */
router.get('/',logged, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
