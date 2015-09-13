//adds pop-up bootstrap alert in case of user-input error
function showAlert(message) {
  $('.alert_placeholder').append('<div id="alertdiv" class="alert alert-danger"><a class="close" data-dismiss="alert">×</a><span>'+message+'</span></div>');
  // this will automatically close the alert and remove this if the users doesn't close it in 5 secs
  setTimeout(function() {
    $("#alertdiv").remove();
  }, 4000);
}


//Find user chosenset of flash cards in the master flash card array
//Creates a copy of flash cards into 'chosenArray'
function findMatchingCardSet(checked){
  for(i = 0; i < allFlashCards.cardSets.length; i++){
    if(allFlashCards.cardSets[i].name === checked){
      chosenCardSet = allFlashCards.cardSets[i].cards.slice(0);
      return chosenCardSet;
    }
  }
}

//TESTING - to use as a callback function
function readyCards(data){
  // var currentReview = [];
  for (var i = 0; i < data.length; i++) {
    currentReview.push(data[i]);
  }
  console.log(currentReview, "CR in ready cards function before shuffle");
  shuffle(currentReview);
  console.log(currentReview, "CR in ready cards function after shuffle");
  showCards(currentReview);
  console.log(currentReview, "CR in ready cards function after shuffle AND showCards functions");
  return currentReview;
}


//when user chooses set:
//shuffle it, and assign it to a global variable array (currentReview)
function shuffle(arr){
  var result=[];
  var workA = arr;
  while(workA.length > 0) {
    var random = Math.floor(Math.random() * workA.length);
    result.push(workA.splice(random,1)[0]);
    currentReview = result;

  }
  return currentReview;
}

//Shifts first 'card' off array and appends it to the flashcard space for user to see
function showCards(arr){
  console.log(arr[0], "arr0");
    currentQuestion = arr.shift(arr[0]);
    console.log(currentQuestion.question, "cq.q");
    $('.show-cards-question').append('<p>' + currentQuestion.question + '</p>');
}

//checks user input answer against card answer
function compareAnswers(userInput, currentReview){
  if(userInput === currentQuestion.answer.toLowerCase()){
    renderCorrect();
    return true;
  }
  else {
    renderIncorrect();
    //when answer is incorrect, card is returned to the array, at a random index, to be used again
    var random = Math.floor(Math.random() * currentReview.length+1);
    currentReview.splice(random, 0, currentQuestion);
    return false;
  }
}

//removes a card from the user created set
function removeCard(question, answer){
  for(var i = 0; i<tempHold.cards.length; i++){
    if(question === tempHold.cards[i].question && answer === tempHold.cards[i].answer){
      console.log(i);
      tempHold.cards.splice([i], 1);
      break;
    }
  }
}


//appends answer and message to the flashcard display when user is correct
function renderCorrect(){
  $('.show-cards-answer').append('<p>Correct! The answer to "' + currentQuestion.question + '" is ' + currentQuestion.answer + '</p>');
  $('.show-cards-answer').css("color", "#88AB75");
}

//appends message and answer to the flashcard display when user is incorrect
function renderIncorrect(){
  $('.show-cards-answer').append('<p>Incorrect. The answer to "' + currentQuestion.question + '" is ' + currentQuestion.answer + '</p>');
  $('.show-cards-answer').css("color", "#EE6352");
}


//checks for duplicates
function duplicateQuestionCheck(question, answer){
  var toAdd = 0;
  console.log(tempHold, "temphold at start of loop");
  for (var i = 0; i <tempHold.cards.length; i++){
   if (tempHold.cards[i].question.toLowerCase() === question.toLowerCase()){
      toAdd = 1;
      $('#duplicate-question-alert').append('<div id="alertdiv" class="alert alert-danger"><a class="close" data-dismiss="alert">×</a><span>'+"It looks like you have already created that question!"+'</span></div>');
          setTimeout(function() {
            $("#alertdiv").remove();
          }, 4000);
      console.log("got it!");
      console.log(tempHold.cards[i].question, question);
    }
  }
  console.log(toAdd, "toAdd at the end of loop");
  if(toAdd === 0){
    var newCard = new Card(question, answer);
//       //add the new card to the new set, which is currently living in a temporary holding variable.
      tempHold.addCard(newCard);
//       // adds card data to dom in a table
      $('#card-table').append(
      "<tr class='display-to-user'>" +
          "<td class='questions'>" + question + "</td>" +
          "<td class='answers'>" + answer + "</td>" +
          "<td>" + "<a href='#' class='delete'>remove</a>" + "</td>" +
        "</tr>"
       );
       $('#question').val('');
       $('#answer').val('');
  }
}




