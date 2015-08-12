

var Cards = function(question, answer){
  this.question = question;
  this.answer = answer;
};

var SetOfCards = function(setName){
  this.setName = setName;
  this.cards = [];
};

//add a flash card to the SetOfCards cards array
SetOfCards.prototype.addCard = function(card){
  this.cards.push(card);
};

//when user chooses set:
//make a copy of the set, and shuffle it.
SetOfCards.prototype.shuffle = function(arr){
  var result = [];
  var workA = arr.slice(0);
  console.log(workA, "workA");
  while(workA.length > 0) {
    var random = Math.floor(Math.random() * workA.length);
    console.log(random, "random");
    result.push(workA.splice(random,1)[0]);
    console.log(result, "result");
  }
  return result;
};

//show the first card question to the user
//this might need to be a while loop...while the array has cards in it, do these things.
SetOfCards.prototype.showCards = function(arr){
  var temp;
  var count = 0;
  while(count < arr.length) {
    temp = arr[count].question;
    count++;
    console.log(temp, "temp");
    console.log(count, "count");

  }
  return "wooooo";
};

//user needs to type in answer

//if answer correct, Hooray and card is removed

//if answer is incorrec, boo and card is put back into array at random location.

//make a div to hold the flashcards and append the questions to it.

//make a user input area to hold the user answer to each card


var javaScriptSet = new SetOfCards("JavaScript");

javaScriptSet.cards = [
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


//need to create a new SetOfCards before starting to create the cards...add a button for this, and then show the form for adding questions.

//need checkboxes for flashcard sets that are hardcoded.

//need to be able to add a new set to the checkboxes

//STRETCH add a way to shuffle them all



$(document).on('ready', function() {

  //click on first button, shows the create cards form and hides the first button
  $('#initial').on('click', function(event){
    event.preventDefault();
    // $('#create-cards').show();
    // $('#initial').hide();
  });

   //when create card button clicked, hide the form and show the double buttons div(what if I need to show the buttons individually?? added class to each button and will test)
   $('#create-card-btn').on('click', function(event){
    event.preventDefault();
    // $('#create-cards').hide();
    // $('.make-or-begin').show();

  });

   //if user chooses to make another question, the double buttons get hidden, and the form appears again
   $('#make-another').on('click', function(event){
    event.preventDefault();
    // $('.make-or-begin').hide();
    // $('#create-cards').show();

   });

   $('#begin-review').on('click', function(event){
    event.preventDefault();
    // $(".make-or-begin").hide();

   });



  //for later - for getting question answer fields
  //$('input[type=text]').val();


});
