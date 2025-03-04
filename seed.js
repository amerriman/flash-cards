var mongoose = require('mongoose');
// var SetOfCards = mongoose.model('create_set');
var SetOfCards = require('./server/models/flashcards.js');


//create pre-seeded database
var setOfCardsSeed = [
  {
    creator : "Ashley",
    name : "Basic Math",
    image: 'http://mathforkeeps.com/img/math_number.jpg',
    cards : [
      {
        question : "What is 2 + 2",
        answer : "4"
      },
      {
        question : "What is 2 - 2",
        answer : "0"
      },
      {
        question : "What is 2 / 2",
        answer : "1"
      }
    ]
  },
  {
    creator : "Ashley",
    name : "Javascript",
    image: 'http://www.seoexpresso.com/wp-content/uploads/2014/11/javascript.png',
    cards : [
      {
        question : "TRUE or FALSE - '2' is a string.",
        answer : "true"
      },
      {
        question : "The five primitives are boolean, undefined, string, number and _________",
        answer : "null"
      },
      {
        question : "The logical operator for 'and' is _________",
        answer : "&&"
      },
    ]
  },
];


function databaseSeed(){
  SetOfCards.find({}, function(err, documents){
    //console.log(documents);
    if(!err && documents.length === 0){
      for (var i = 0; i < setOfCardsSeed.length; i++) {
        var newSetOfCards = new SetOfCards(setOfCardsSeed[i]);
        newSetOfCards.save(function(err, success){
          if(!err){
          console.log(
            'database seeded!');
          }
        });
      }
    }
  });
}

module.exports = databaseSeed;

//in api.js
//use post request to model the databaseSeed function


//put below in app.js
// var databaseSeed = require('./seed');
// databaseSeed();
