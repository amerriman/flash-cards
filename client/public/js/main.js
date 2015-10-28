$(document).on('ready', function(){
  listCardSets();
  checkboxSets();

});
//temp - holds name for cardset - get rid of this eventually
var $name;

//This holds the array of questions that the user has chosen with the radio buttons
// var chosenCardSet = [];

//This holds the current card object that the user is reviewing
var currentQuestion =[];

//This is the shuffled array of cards that will be eventually destroyed as the user goes through the review
var currentReview = [];

//holding cell while new flashcard arrays are being created
var tempHold = [];


//create cardset and first card.
$('form').on('submit', function(event){
  event.preventDefault();
  var $question = $('#question').val();
  var $answer = $('#answer').val();
  $name = $(".card-set-name").html();
  var payload = {
    question: $question,
    answer: $answer,
    name: $name
  };

    $('#question').val("");
    $('#answer').val("");

  $.post('api/flashcards/', payload, function(data){
    //Why do these not work in here?
    // $('#question').val("");
    // $('#answer').val("");
    // $('#card-tableness').html("");
    // listCardSets();
    $('#user-cards').html("");
    listFlashCards($name);
    $('#card-table').css('display', 'block');
  });
  $("#card-tableness").html("");
  listCardSets();
});


//grab cardset title, append to next screen
$(document).on('click', '#create-cardset-btn',function(event){
  event.preventDefault();
  if($('#new-title').val()=== ""){
    alert("You need to enter a title!");
  } else{
    $("#create-cardset-title").css('display','none');
    $('#create-cards-container').css('display', 'block');
    $name = $('#new-title').val();
    $(".card-set-name").html($name);
    $('#new-title').val('');
    $('#flashcards').css('display', "block");
  }
});


// delete a cardSET from the form (form not visible to users currently)
$(document).on('click', '.delete-button', function(){
  $.ajax({
    method: "DELETE",
    url: '/api/flashcards/'+$(this).attr('id')
  }).done(function(data) {
    $("#card-tableness").html("");
    $( "#results" ).html('Success!');
    listCardSets();
  });
});


//To remove ONE CARD
$(document).on('click', '.delete-card', function(){
  $name = $(".card-set-name").html();
  $.ajax({
    method: "PUT",
    url: '/api/flashcard/'+ $(this).attr('name')+ '/' + $(this).attr('id')
  }).done(function(data) {
    $("#user-cards").html("");
    listFlashCards($name);
  });

});

//begin to review with new created set
$(document).on('click', '#new-set-begin', function(){
  getNewCards(readyCards);
  $('#create-cards-container').css('display','none');
  $("#review-space").css('display','block');
  $('#submit-answer').css('display', 'block');
  // $('#next-question').css('display', 'none');
  $('#new-set-begin').css('display', 'none');
  $('#card-table').css('display', 'none');
});


//used directly above
function getNewCards(cb){
  $name = $(".card-set-name").html();
  $.ajax({
    method: "GET",
    url: '/api/flashcard/cards/'+ $name
  })
  .done(function(data){
    cb(data);
  }).fail(function(err){
    console.log(err);
  });
}


//used for radioselect cards
function getCheckedCards(cb){
  $id = $('input[type="radio"]:checked').val();
  $.ajax({
    method: "GET",
    url: '/api/flashcard/cardsID/'+ $id
  })
  .done(function(data){
    cb(data);
  }).fail(function(err){
    console.log(err);
  });
}

//helper function - this shows ALL cards.  Will use this elsewhere later.
function listCardSets(){
  $.get('/api/flashcards', function(data){
    for (var i = 0; i < data.length; i++) {
      $('#card-tableness').append(
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

//show already created cardsets
function checkboxSets(){
  $.get('/api/flashcards', function(data){
    for (var i = 0; i < data.length; i++) {
      $('#cardsets').append(
        '<label class="radio-inline bigger">'+ '<img class="radio-icons" src="' + data[i].image + '" height="75px" width="75px" alt="user">' + '<br>'+ "<input type='radio' value="+ data[i]._id + " name='cardsets'>"+data[i].name+"</label>"
      );
    }
  });
}


//list individual flash cards for user to delete or edit
function listFlashCards(name) {
  $.get('/api/flashcard/cards/'+name, function(data){
    for (var j = 0; j < data.length; j++) {
      $('#user-cards').append(
        "<tr>" +
        "<td class='questions'>" + data[j].question + "</td>" +
          "<td class='answers'>" + data[j].answer + "</td>"+
          '<td><a class="delete-card '+ name +'" id="'+data[j]._id+'" name="'+ name +'" role="button"><span class="glyphicon glyphicon-trash"></span></a>'+'</tr>'
      );
    }
  });
}

//keep for when edit works
      // $('#user-cards').append(
      //   "<tr>" +
      //   "<td class='questions'>" + data[j].question + "</td>" +
      //     "<td class='answers'>" + data[j].answer + "</td>"+
      //     '<td><a class="delete-card '+ name +'" id="'+data[j]._id+'" name="'+ name +'" role="button"><span class="glyphicon glyphicon-trash"></span></a>'+'&nbsp;<a class="btn btn-primary btn-xs edit-card" id="'+data[j]._id+'" name="'+name+'" role="button">Edit</a></td>'+
      //     '</tr>'
      // );
