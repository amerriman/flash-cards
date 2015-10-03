var mongoose = require('mongoose');
var Schema   = mongoose.Schema;



var SetOfCards = new Schema(
  {
    creator : String,
    name : String,
    image: String,
    cards : [
      {
        question : String,
        answer : String
      }
    ]
  }
);

module.exports = mongoose.model('create_set', SetOfCards);

