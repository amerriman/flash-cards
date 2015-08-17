$(document).on('ready', function() {

  //shows user pre-made card sets
  $('#pre-made').on('click', function(){
    $('.initial').css('display', 'none');
    $('#checkbox-space').css('display','block');
  });

  //shows user the create card-set title screen
  $('#create-own').on('click', function(){
    $('.initial').css('display', 'none');
    $('#create-cardset-title').css('display','block');
  });


  //User creates new cardset - with no cards yet
  $('#create-cardset-title').on('submit', function(event){
    event.preventDefault();
    //grab user input name for card set
    var userInputtedTitle = $('#new-title').val();
    //creates new instance of SetOfCards with user title
    var newTitle = new SetOfCards(userInputtedTitle);
    //adds the new cardset title to the already created cards section
    $('#cardsets').append('<label class="radio-inline bigger">' + '<img class="radio-icons" src="img/user.png" height="75px" width="75px" alt="user-created">' + '<br>' + '<input type="radio" value="'+ userInputtedTitle + '">' + newTitle.name + '</label');
    //holds the new cardset temporarily so we can add cards to it
    tempHold = newTitle;
    // removes the "create a title" div and displays the 'create questions and answers' div
    $('#create-cardset-title').css('display','none');
    $("#create-cards-container").css('display','block');
    // appends new title to new card set page
    $(".new-cardset").html(userInputtedTitle);
    //clear the user input field
    $('#new-title').val('');
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
    // adds card data to dom in a table
    $('#card-table').append(
      "<tr class='display-to-user'>" +
          "<td>" + newQuestion + "</td>" +
          "<td>" + newAnswer + "</td>" +
        "</tr>"
    );
    // clear user inputs
    $('#question').val('');
    $('#answer').val('');
  });


  //user click on the 'Begin Review' button
  $('#new-set-begin').on('click', function(event){
    event.preventDefault();
    //changes viewing screen to card area
    $('#create-cards-container').css('display','none');
    $("#review-space").css('display','block');
    //adds user created flashcards to main card array(s)
    chosenCardSet = tempHold.cards.slice(0);
    allFlashCards.addSet(tempHold);
    userCards.addSet(tempHold);
    //starts the review with the most recently created set.
    shuffle(chosenCardSet);
    showCards(currentReview);
    //clears the card creation question and answer table display
    $('.display-to-user').remove();
   });


  //when user chooses a flash card set, the cards are shuffled and the first one is shown
  $('#check-box-start').on('click', function(){
    var chosen = $('input[type="radio"]:checked').val();
    //alert if they don't choose a set
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
    $('.show-cards-question').html('');
    compareAnswers(userAnswer);
    //clears user answer space and the flashcard space
    $('#user-answer').val('');
    //adds class for card flip effect
    $('.flip').addClass('flipped');
    $('#show-cards-wrapper').addClass('flipped');
    //hide button and show next q button
    $('#submit-answer').css('display', 'none');
    $('#next-question').css('display','block');
  });


  //"Next Question button clears the card field and shows the next question"
  $('#next_question-btn').on('click', function(){
    $('.show-cards').html(" ");
    //removes class for card-flip effect
    $('#show-cards-main').removeClass('flipped');
    $('#show-cards-wrapper').removeClass('flipped');
    //as long as there are cards in the array, keep reviewing
    if(currentReview.length >= 1){
      showCards(currentReview);
      //hide next question button and show submit answer button
      $('#next-question').css('display', 'none');
      $('#submit-answer').css('display','block');
    }
    else{
      //when cards run out - show all done message, hide the input areas, and ask if they want to review more
      $('.show-cards-question').append("<p>All done!</p>");
      $('#submit-answer').css('display', 'none');
      $('#next-question').css('display', 'none');
      $('#study-more').css('display', 'block');
    }
  });

  //if user clicks "study more", they are directed 'home'
  $('#study-more-btn').on('click', function(){
    console.log("ARAREARWER");
    //show main choice area, hide review area
    $('#submit-answer').css('display','block');
    $('.show-cards').html("");
    $('#next-question').css('display', 'none');
    $('#study-more').css('display', 'none');
    $('#review-space').css('display', 'none');
    $('.initial').css('display', 'block');
  });


});
