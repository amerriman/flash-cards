$(document).on('ready', function() {

  //click on the 'Begin Review' button shuffles the flashcards and displays the first question
  $('.begin-review').on('click', function(event){
    event.preventDefault();
    //Add tempHold to the main card array, automatically check the current cardset, then do the whole find matching, chosen set etc.  Or maybe just add the temp to the array and remember that it was the one we want to use?  make a "save flashcards" button that adds it to the main set AND a 'my cards set?'  then present "my" choices for studying?  Or just make it start with this set.BLARCH!

   });

  //when user chooses a flash card set, the cards are shuffled and the first one is shown
  $('#check-box-start').on('click', function(event){
    event.preventDefault();
    var chosen = $('input[type="checkbox"]:checked').val();
    findMatchingCardSet(chosen);
    chosenCardSet.shuffle(chosenCardSet.cards);
    chosenCardSet.showCards(cardArrayForScreen);
  });



  //'Check Answer' button checks the answer, and displays a correct, or incorect message.  Also clears the user input field
  $('#submit-user-answer').on('click', function(){
    var userAnswer = $('#user-answer').val();
    basicMath.compareAnswers(userAnswer);
    $('#user-answer').val('');
  });



  //"Next Question button clears the card field and shows the next question"
  $('#next_question').on('click', function(){
    $('.show-cards').html(" ");
    basicMath.showCards(cardArrayForScreen);
  });



  //User creates new cardset - with no cards yet
  $('#create-cardset-btn').on('click', function(event){
    event.preventDefault();
    //grab user input name, create a value for it
    var newTitle = $('#new-title').val();
    var value = newTitle;
   //create new set of cards
    newTitle = new SetOfCards(newTitle);
    //append the new cardset title to the div with the rest of the created flash card sets.
    $('#cardsets').append('<label class="checkbox-inline">' + '<input type="checkbox" value="'+ value + '">' + newTitle.name + '</label');
    //holds the new cardset temporarily so we can add cards to it
    tempHold = newTitle;
    //clear the user input field
    $('#new-title').val('');
  });


  //User creates new cards
  $('#create-card-btn').on('click', function(event){
    event.preventDefault();
    //grab the user input questions and answers
    var newQuestion = $('#question').val();
    var newAnswer = $('#answer').val();
    //create the new card
    var newCard = new Card(newQuestion, newAnswer);
    //add the new card to the new set, which is currently living in a temporary holding variable.
    tempHold.addCard(newCard);
    //clear the input screen
    $('#question, #answer').val('');
  });




});
