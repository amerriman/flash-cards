var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var SetOfCards = mongoose.model('create_set');

//show ALL flashcards
router.get('/flashcards', function(req, res) {
  SetOfCards.find(function(err, flashcards){
    console.log(flashcards);
    res.json(flashcards);
    // res.render(
    //   'api',
    //   {title: 'Flashcard API', flashcards: flashcards}
    // );
  });
});

//post ALL flashcards
router.post('/flashcards', function(req, res) {
  new SetOfCards(
    {
      name : req.body.name,
      cards : [
        {
          question: req.body.question,
          answer: req.body.answer
        }
      ]

    })
  .save(function(err, flashcard){
    //console.log(req.body);
  //res.redirect('/api/flashcards');
  res.json({message: 'Success!'});
  });
});

//get ONE flashcard set
router.get('/flashcard/:id', function(req, res){
  var query = {"_id": req.params.id};
  SetOfCards.findOne(query, function(err, flashcard){
    //console.log(flashcard);
    // res.render(
    //   'flashcard',
    //   {title: 'Flashcard API - ' + flashcard.name,
    //   flashcard: flashcard
    //   }
    // );
  res.json(flashcard);
  });
});

//update ONE flashcard set
router.put('/flashcard/:id', function(req, res) {
  var query = {"_id": req.params.id};
  var update = {name : req.body.name};
  var options = {new: true};
  SetOfCards.findOneAndUpdate(query, update, options, function(err, flashcard){
    //console.log(flashcard);
    // res.render(
    //   'flashcard',
    //   {title : 'Flashcard API - ' + flashcard.name, flashcard : flashcard}
    // );
  res.json(flashcard);
  });
});

//delete ONE flashcard set
router.delete('/flashcard/:id', function(req, res) {
  var query = {"_id": req.params.id};
  SetOfCards.findOneAndRemove(query, function(err, flashcard){
    // console.log(flashcard);
    // res.redirect('/api/flashcards');
    res.json(flashcard);
  });
});


module.exports = router;
