var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// var Flashcard = new Schema(
//   {question : String,
//    answer : String
//   }
// );

var SetOfCards = new Schema(
  {
    //can I make this a boolean?
    creator : String,
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
//mongoose.connect('mongodb://localhost/node-setofcards');
mongoose.connect(process.env.MONGOLAB_URI || "mongodb://heroku_3kmn6hks:6f59lavhkcntktlhlc6dh7l7be@ds035653.mongolab.com:35653/heroku_3kmn6hks")
