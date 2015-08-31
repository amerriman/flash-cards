var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'FlashCards' });
});

router.get('/create', function(req, res, next){
  res.render('create');
});



module.exports = router;
