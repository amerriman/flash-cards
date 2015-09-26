var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var SetOfCards = mongoose.model('create_set');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'FlashCards' });
});

router.get('/create', function(req, res){
  res.render('create');
});

router.get('/play', function(req, res, next){
  res.render('play');
});

//////////////////////////////////////////////////////////
// router.get('/play/:name', function(req, res, next){
//   var cards = SetOfCards.find({name: req.params.name})
//   res.render('play', {cards: cards});
// });


/// on Continue add the name to the link on your Button
/// on Play redirect to /play/:name
/// use :name to look up cards
/// use swig to put cards on page
/// profit



module.exports = router;
