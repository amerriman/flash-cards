//adds alert in case of user-input error
function showAlert(message) {
  //$('#alert_placeholder').html("test");
  $('.alert_placeholder').append('<div id="alertdiv" class="alert alert-danger"><a class="close" data-dismiss="alert">×</a><span>'+message+'</span></div>');

  setTimeout(function() { // this will automatically close the alert and remove this if the users doesn't close it in 5 secs
    $("#alertdiv").remove();
  }, 5000);
}


//when user chooses from already created sets, after they choose the checkbox and click to begin the review, this searches the 'allFlashCards' set to find the correct set of questions. When it finds the set, it puts it into the 'chosenArray' variable
function findMatchingCardSet(checked){
  for(i = 0; i < allFlashCards.cardSets.length; i++){
    if(allFlashCards.cardSets[i].name === checked){
      chosenCardSet = allFlashCards.cardSets[i].cards.slice(0);
      return chosenCardSet;
    }
  }
}


//when user chooses set:
//make a copy of the set, and shuffle it, and assign it to a global variable array (currentReview)
function shuffle(arr){
  var result = [];
  var workA = arr;
  while(workA.length > 0) {
    var random = Math.floor(Math.random() * workA.length);
    result.push(workA.splice(random,1)[0]);
    currentReview = result;
  }
  return currentReview;
}



function compareAnswers(userInput){
  if(userInput === currentQuestion.answer){
    renderCorrect();
    return true;
  }
  else {
    renderIncorrect();
    //when answer is incorrect, card is returned to the array to be used again
    currentReview.push(currentQuestion);
    return false;
  }
}

//appends answer and message to the flashcard display when user is correct
function renderCorrect(){
  $('.show-cards').append('Correct! The answer to ' + currentQuestion.question + ' is ' + currentQuestion.answer);
}

//appends message and answer to the flashcard display when user is incorrect
function renderIncorrect(){
  $('.show-cards').html('Incorrect. The answer to ' + currentQuestion.question + ' is ' + currentQuestion.answer);
}
