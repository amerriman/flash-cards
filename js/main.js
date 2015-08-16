//Global variables - can I make these go away?

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



//take the first card off the shuffled array and store it in another global variable.  Also, clear the screen and append the question to the screen
// SetOfCards.prototype.showCards = function(arr){
//   if (arr.length >= 1){
//     currentQuestion = arr.shift(arr[0]);
//     $('.show-cards').append('<h4>' + currentQuestion.question+'</h4>');
//     //return currentQuestion; I don't think I need this
//   }
//   else{
//     $('.show-cards').append('<h4>All done!</h4>');
//     $('#submit-answer').css('display', 'none');
//     $('#review-again').css('display', 'block');
//   }
// };


function showCards(arr){
  console.log(arr[0], "arr0");
    currentQuestion = arr.shift(arr[0]);
    $('.show-cards').html(currentQuestion.question);
}


//checks if answer is correct - shows user the correct answer.  If incorrect, pushes flashcard back into the array to be shown again. !!!!need to make this go to a random place in the array.
// SetOfCards.prototype.compareAnswers = function(userInput){
//   if(!userInput){
//     //don't let the input be blank!
//     showAlert("Oh snap! You need to enter an answer!");
//   }
//   else if(userInput === currentQuestion.answer){
//     console.log(this);
//     this.renderCorrect();
//     return true;
//   }
//   else {
//     this.renderIncorrect();
//     //when answer is incorrect, card is returned to the array to be used again
//     currentReview.push(currentQuestion);
//     return false;
//   }
// };



// //appends answer and message to the flashcard display when user is correct
// SetOfCards.prototype.renderCorrect = function(){
//   $('.show-cards').append('<h4>Correct! The answer is ' + currentQuestion.answer +'.</h4>');
// };



// //appends message and answer to the flashcard display when user is incorrect
// SetOfCards.prototype.renderIncorrect = function(){

//   $('.show-cards').append('<h4>Incorrect. The answer is ' + currentQuestion.answer +'.</h4>');
// };

//for true -- $('.show-cards').append('<h4>Correct! The answer is ' + currentQuestion.answer +'.</h4>');

//for false -- $('.show-cards').append('<h4>Incorrect. The answer is ' + currentQuestion.answer +'.</h4>');





//Master set for ALL cards
var allFlashCards = new MasterCardSet("All Flash Cards");

//Master set for all USER CREATED cards
var userCards = new MasterCardSet("User Cards");

//hard-coded card-sets
var javaScript = new SetOfCards("JavaScript");

javaScript.cards = [
  {question:"q1", answer: "a1"},
  {question: "q2", answer: "a2"},
  {question: "q3", answer: "a3"},
];

var basicMath = new SetOfCards("Basic Math");

basicMath.cards = [
  {question:"What is 2 + 2?", answer:"4"},
  {question:"What is 2 x 2?", answer:"4"},
  {question:"What is 2 / 2?", answer:"1"},
];

//adding hard coded flash cards to master set
allFlashCards.addSet(javaScript);
allFlashCards.addSet(basicMath);

