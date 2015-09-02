$(document).on('ready', function(){
  listCardSets();

});
//temp - holds name for cardset - get rid of this eventually
var $name;


//create cardset and first card.
$('#create-cards-container').on('submit', function(event){
  event.preventDefault();
  //SO MANY THINGS
  var $question = $('#question').val();
  var $answer = $('#answer').val();
  $name = $("#card-set-name").html();

  var payload = {
    question: $question,
    answer: $answer,
    name: $name
  };

    $('#question').val("");
    $('#answer').val("");

  $.post('api/flashcards/', payload, function(data){
    $('#card-table').html("");
    listCardSets();
  });
});


//grab cardset title, append to next screen
$('#create-cardset-title').on('submit', function(event){
  event.preventDefault();
  $("#create-cardset-title").css('display','none');
  $('#create-cards-container').css('display', 'block');
  $name = $('#new-title').val();

  $("#card-set-name").html($name);

  $('#new-title').val('');

});



//This deletes a cardset from the form - though ultimately this needs to look different.  Maybe I need to make two tables until this gets nailed down
$(document).on('click', '.delete-button', function(){

  $.ajax({
    method: "DELETE",
    url: '/api/flashcard/'+$(this).attr('id')
  }).done(function(data) {
    $("#card-table").html("");
    $( "#results" ).html('Success!');
    listCardSets();
  });

});

//This holds the array of questions that the user has chosen with the radio buttons
var chosenCardSet = [];

//This holds the current card object that the user is reviewing
var currentQuestion =[];

//This is the shuffled array of cards that will be eventually destroyed as the user goes through the review
var currentReview = [];

//holding cell while new flashcard arrays are being created
var tempHold = [];



//helper function - this shows ALL cards.  Will use this elsewhere later.
function listCardSets(){
  $.get('/api/flashcards', function(data){
    for (var i = 0; i < data.length; i++) {
      $('#card-table').append(
        '<tr class="display-to-user">'+
          '<td><a href="#">'+data[i].name+'</a></td>'+
          // '<td>'+data[i].question+'</td>'+
          // '<td>'+data[i].answer+'</td>'+
          '<td><a class="btn btn-danger btn-xs delete-button" id="'+data[i]._id+'" role="button">Delete</a>'+
          '&nbsp;<a class="btn btn-primary btn-xs edit-button" id="'+data[i]._id+'" role="button">Edit</a></td>'+
          '</tr>'
      );
    }
  });
}


function listFlashCards() {
  $.get('/api/flashcard/:id', function(data){
    for (var i = 0; i < data.length; i++) {

    }



  });
  // body...
}



// ///BASE CONSTRUCTORS

// function Card(question, answer){
//   this.question = question;
//   this.answer = answer;
// }


// function SetOfCards(name){
//   this.name = name;
//   this.cards = [];
// }

// function MasterCardSet(name){
//   this.name = name;
//   this.cardSets = [];
// }


// //////MASTER CLASS FUNCTIONS

// //add a set of cards to the master card array
// MasterCardSet.prototype.addSet = function(setName){
//   this.cardSets.push(setName);
// };


// //////SET OF CARD FUNCTIONS

// //add a flash card to the SetOfCards cards array
// SetOfCards.prototype.addCard = function(card){
//   this.cards.push(card);
// };

// SetOfCards.prototype.duplicateQuestionCheck = function(question, answer){


// };



// //Master set for ALL cards
// var allFlashCards = new MasterCardSet("All Flash Cards");

// //Master set for all USER CREATED cards
// var userCards = new MasterCardSet("User Cards");

// //hard-coded card-sets
// var javaScript = new SetOfCards("JavaScript");

// javaScript.cards = [
//   {question:"TRUE or FALSE - '2' is a string.", answer: "true"},
//   {question: "The five primitives are boolean, undefined, string, number and _________", answer: "null"},
//   {question: "The logical operator for 'and' is _________", answer: "&&"},
// ];

// var basicMath = new SetOfCards("Basic Math");

// basicMath.cards = [
//   {question:"What is 5 + 5?", answer:"10"},
//   {question:"What is 2 x 2?", answer:"4"},
//   {question:"What is 9 / 3?", answer:"3"},
// ];

// var geography = new SetOfCards("Geography");

// geography.cards = [
//   {question:"How many continents are there on Earth?", answer:"7"},
//   {question:"What is the name for a group of islands?", answer:"archipelago"},
//   {question:"Which ocean borders California?", answer:"The Pacific Ocean"},
// ];

// //adding hard coded flash cards to master set
// allFlashCards.addSet(javaScript);
// allFlashCards.addSet(basicMath);
// allFlashCards.addSet(geography);
