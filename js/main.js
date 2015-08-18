//This holds the array of questions that the user has chosen with the checkbox
var chosenCardSet = [];

//This holds the current card object that the user is reviewing
var currentQuestion =[];

//This is the shuffled array of cards that will be eventually destroyed as the user goes through the review
var currentReview = [];

//holding cell while new flashcard arrays are being created
var tempHold = [];



///BASE CONSTRUCTORS

function Card(question, answer){
  this.question = question;
  this.answer = answer;
}


function SetOfCards(name){
  this.name = name;
  this.cards = [];
}

function MasterCardSet(name){
  this.name = name;
  this.cardSets = [];
}


//////MASTER CLASS FUNCTIONS

//add a set of cards to the master card array
MasterCardSet.prototype.addSet = function(setName){
  this.cardSets.push(setName);
};


//////SET OF CARD FUNCTIONS

//add a flash card to the SetOfCards cards array
SetOfCards.prototype.addCard = function(card){
  this.cards.push(card);
};


//Master set for ALL cards
var allFlashCards = new MasterCardSet("All Flash Cards");

//Master set for all USER CREATED cards
var userCards = new MasterCardSet("User Cards");

//hard-coded card-sets
var javaScript = new SetOfCards("JavaScript");

javaScript.cards = [
  {question:"TRUE or FALSE - '2' is a string.", answer: "true"},
  {question: "The five primitives are boolean, undefined, string, number and _________", answer: "null"},
  {question: "The logical operator for 'and' is _________", answer: "&&"},
];

var basicMath = new SetOfCards("Basic Math");

basicMath.cards = [
  {question:"What is 5 + 5?", answer:"10"},
  {question:"What is 2 x 2?", answer:"4"},
  {question:"What is 9 / 3?", answer:"3"},
];

//adding hard coded flash cards to master set
allFlashCards.addSet(javaScript);
allFlashCards.addSet(basicMath);
