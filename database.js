var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// var Flashcard = new Schema(
//   {question : String,
//    answer : String
//   }
// );

var SetOfCards = new Schema(
  {
    name : String,
    cards : [
      {
        question : String,
        answer : String
      }
    ]
  }
);

//do I need a schema for the flashcards as a set and individually?

//mongoose.model('create_flashcards', Flashcard);
mongoose.model('create_set', SetOfCards);


//???Do I need something else here...unclear what this is doing
mongoose.connect('mongodb://localhost/node-setofcards');
