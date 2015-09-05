var mongoose = require('mongoose');
var Schema   = mongoose.Schema;



var SetOfCards = new Schema(
  {
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

//mongoose.model('create_flashcards', Flashcard);
mongoose.model('create_set', SetOfCards);

//connects the database?
mongoose.connect('mongodb://localhost/node-setofcards');
// mongoose.connect(process.env.MONGOLAB_URI || "mongodb://heroku_3kmn6hks:6f59lavhkcntktlhlc6dh7l7be@ds035653.mongolab.com:35653/heroku_3kmn6hks");
