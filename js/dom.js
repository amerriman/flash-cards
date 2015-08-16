$(document).on('ready', function() {

  //takes user to card-set choice area
  $('#pre-made').on('click', function(){
    $('.initial').css('display', 'none');
    $('#checkbox-space').css('display','block');
  });

  //takes user to create title of new flashcard set
  $('#create-own').on('click', function(){
    $('.initial').css('display', 'none');
    $('#create-cardset-title').css('display','block');
  });

  //user clicks button to begin their newly created flashcard set
  $('#new-set-begin').on('click', function(){
    $('#create-cards-container').css('display','none');
    $("#review-space").css('display','block');
  });


  //click on the 'Begin Review' button shuffles the flashcards and displays the first question
  $('#new-set-begin').on('click', function(event){
    event.preventDefault();
    //adds user created flashcards to main card array(s)
    chosenCardSet = tempHold.cards.slice(0);
    allFlashCards.addSet(tempHold);
    userCards.addSet(tempHold);
    //starts the review with the most recently created set.
    shuffle(chosenCardSet);
    showCards(currentReview);
   });


  //when user chooses a flash card set, the cards are shuffled and the first one is shown
  $('#check-box-start').on('click', function(){
    var chosen = $('input[type="radio"]:checked').val();
    if(!chosen){
      showAlert("Please choose a card set!");
    }
    else{
      $('input[type="radio"]').prop('checked', false);
      $('#checkbox-space').css('display','none');
      $("#review-space").css('display','block');
      findMatchingCardSet(chosen);
      shuffle(chosenCardSet);
      showCards(currentReview);
    }
  });


  //when users submits with the 'Check Answer' button it checks the answer, and displays a correct, or incorect message.  Also clears the user input field.  Will not allow a blank field. It then hides the check answer button and shows the next question button
  $('#submit-answer').on('submit', function(event){
    event.preventDefault();
    var userAnswer = $('#user-answer').val();
    $('.show-cards').html('');
    compareAnswers(userAnswer);
    //clears user answer space and the flashcard space
    $('#user-answer').val('');

    //hide button and show next q button
    $('#submit-answer').css('display', 'none');
    $('#next-question').css('display','block');
  });



  //"Next Question button clears the card field and shows the next question"
  $('#next_question-btn').on('click', function(){
    $('.show-cards').html(" ");
    if(currentReview.length >= 1){
      showCards(currentReview);
      //hide button and show submit answer button
      $('#next-question').css('display', 'none');
      $('#submit-answer').css('display','block');
    }
    else{
      $('.show-cards').html("All done!");
      $('#submit-answer').css('display', 'none');
      $('#next-question').css('display', 'none');
      $('#study-more').css('display', 'block');
    }

  });

  //if user clicks "study more", they are directed 'home'
  $('#study-more-btn').on('click', function(){
    console.log("ARAREARWER");

    $('#submit-answer').css('display','block');
    $('.show-cards').html("");
    $('#next-question').css('display', 'none');
    //$('#study-more-btn').css('display', 'none');
    $('#review-space').css('display', 'none');
    $('.initial').css('display', 'block');
  });


  //User creates new cardset - with no cards yet
  $('#create-cardset-title').on('submit', function(event){
    event.preventDefault();
    //grab user input name, create a value for it
    var userInputtedTitle = $('#new-title').val();

    // if(!userInputtedTitle){
    //   showAlert("Please create a title!");
    // }
    // else {
     //create new set of cards
      var newTitle = new SetOfCards(userInputtedTitle);
      //append the new cardset title to the div with the rest of the created flash card sets.
      $('#cardsets').append('<label class="radio-inline">' + '<input type="radio" value="'+ userInputtedTitle + '">' + newTitle.name + '</label');
      //holds the new cardset temporarily so we can add cards to it
      tempHold = newTitle;
      //TESTING -below
      //allFlashCards.addSet(newTitle);
      //console.log(newTitle, "newTitle");
      //console.log(tempHold, "tempHold");
      // removes the "create a title" div and displays the 'create questions and answers' div
      $('#create-cardset-title').css('display','none');
      $("#create-cards-container").css('display','block');
      // appends new title to new card set page
      $(".new-cardset").html(userInputtedTitle);
      //clear the user input field
      $('#new-title').val('');

    // }

  });


  //User creates new cards
  $('#create-cards-container').on('submit', function(event){
    event.preventDefault();
    //grab the user input questions and answers
    var newQuestion = $('#question').val();
    var newAnswer = $('#answer').val();
    //create the new card
    var newCard = new Card(newQuestion, newAnswer);
    //add the new card to the new set, which is currently living in a temporary holding variable.
    tempHold.addCard(newCard);
    //all

    console.log(tempHold, 'tempHold after card created');
    console.log(newCard, 'newcard after card created');
    // adds data to dom
    $('#card-table').append(
      "<tr>" +
          "<td>" + newQuestion + "</td>" +
          "<td>" + newAnswer + "</td>" +
        "</tr>"
    );
    // clear user inputs
    $('#question').val('');
    $('#answer').val('');
  });




});
