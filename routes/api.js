var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var SetOfCards = mongoose.model('create_set');


//show ALL flashcards
router.get('/flashcards', function(req, res) {
  SetOfCards.find(function(err, flashcards){
    res.json(flashcards);
  });
});


//show the individual cards
router.get('/flashcard/:name', function(req, res){
  // var query = {"name": "Javascript"};
  var query = {"name": req.params.name};
  SetOfCards.findOne(query, function(err, flashcard){
    //console.log(flashcard.cards, "FLASHCARD");
    if (err){
      console.log("No cards to show");
    }
    res.json(flashcard.cards);
  });
});


//post ALL flashcards (creates a new flashcard set and cards from /create page)
router.post('/flashcards', function(req, res) {
  var query = {"name": req.body.name};
  var options = {upsert: true, new: true};
  var update = {"creator":"User", $push: {"cards":{"question": req.body.question, "answer":req.body.answer}}};
  SetOfCards.findOneAndUpdate(query, update, options, function(err, flashcard){
    if (err){
      console.log("Something went wrong");
    }
    else {
      console.log("New Set Created!");
      // res.json()
    }
  });
  res.end();
});


//get ONE flashcard set
router.get('/flashcard/:id', function(req, res){
  var query = {"name": req.params.name};
  SetOfCards.findOne(query, function(err, flashcard){
  res.json(flashcard);
  });
});


//update ONE flashcard set
router.put('/flashcard/:id', function(req, res) {
  var query = {"_id": req.params.id};
  var update = {name : req.body.name};
  var options = {new: true};
  SetOfCards.findOneAndUpdate(query, update, options, function(err, flashcard){
  res.json(flashcard);
  });
});


//deletes one flashcard (UPDATES the document)
router.put('/flashcard/:name/:id', function(req, res) {
  var query = {"name": req.params.name};
  var id = req.params.id;
  SetOfCards.findOneAndUpdate(query, {
    $pull: {
      "cards": {"_id": id}
    }
  }, function(err, flashcard){
      console.log(flashcard, "FLASHCARD DELETE??");
      res.json(flashcard);
    });
});


//delete ONE flashcard SET
router.delete('/flashcard/:id', function(req, res) {
  var query = {"_id": req.params.id};
  console.log(query, "SET-QUERY");
  SetOfCards.findOneAndRemove(query, function(err, flashcard){
    console.log(flashcard, "SET-sDELETE");
    // res.redirect('/api/flashcards');
    res.json(flashcard);
  });
});



module.exports = router;
