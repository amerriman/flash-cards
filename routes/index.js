var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var SetOfCards = mongoose.model('create_set');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'FlashCards' });
});

router.get('/create', function(req, res, next){
  res.render('create');
});

router.get('/play', function(req, res, next){
  res.render('play');
});






// router.post('', function(req, res){

// });


module.exports = router;