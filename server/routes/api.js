var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var SetOfCards = require('../models/flashcards.js');


//show ALL flashcards  WORKING
router.get('/flashcards', function(req, res) {
  SetOfCards.find(function(err, flashcards){
    res.json(flashcards);
  });
});


//get ONE flashcard set WORKING
//should be flashcards?
router.get('/flashcard/:name', function(req, res){
  var query = {"name": req.params.name};
  SetOfCards.findOne(query, function(err, flashcards){
    if (err) throw err;
  res.json(flashcards);
  });
});


//get the cards array by name WORKING
// should be flashcards
router.get('/flashcard/cards/:name', function(req, res){
  var query = {"name": req.params.name};
  SetOfCards.findOne(query, function(err, flashcard){
    if (err){
      console.log("No cards to show");
    }
    res.json(flashcard.cards);
  });
});


//get the cards array by id
// should be flashcards
router.get('/flashcard/cardsID/:id', function(req, res){
  var query = {"_id": req.params.id};
  SetOfCards.findById(query, function(err, flashcard){
    if (err){
      console.log("No cards to show");
    }
    res.json(flashcard.cards);
  });
});


//post ALL flashcards (creates a new flashcard set and cards from /create page) WORKING
router.post('/flashcards', function(req, res) {
  var query = {"name": req.body.name};
  var options = {upsert: true, new: true};
  var update = {
    "creator":"User",
    "image": "http://www.homeadinc.com/hsb/wp-content/uploads/2015/02/GenericProfilePhoto-Blue-Round.png",
    $push: {
      "cards":{
        "question": req.body.question,
        "answer":req.body.answer
      }
    }
  };

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


//update ONE flashcard set name- does this even work???
// should be flashcards
router.put('/flashcards/:id', function(req, res) {
  var query = {"_id": req.params.id};
  var update = {name : req.body.name};
  var options = {new: true};
  SetOfCards.findOneAndUpdate(query, update, options, function(err, flashcard){
  res.json(flashcard);
  });
});


//deletes one individual flashcard (UPDATES the document) WORKING
// should be flashcards/cards/name/id?
router.put('/flashcard/:name/:id', function(req, res) {
  var query = {"name": req.params.name};
  var id = req.params.id;
  SetOfCards.findOneAndUpdate(query, {
    $pull: {
      "cards": {"_id": id}
    }
  }, function(err, flashcard){
      res.json(flashcard);
    });
});


//delete ONE flashcard SET  WORKING
//should be flashcards
router.delete('/flashcards/:id', function(req, res) {
  var query = {"_id": req.params.id};
  SetOfCards.findOneAndRemove(query, function(err, flashcard){
    res.json(flashcard);
  });
});



module.exports = router;
