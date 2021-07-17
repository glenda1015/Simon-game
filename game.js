//array that holds the colors of the game
var buttonColours = ["red", "blue", "green", "yellow"];

//empty array created
var gamePattern = [];

//empty array to store the buttons that the user clicked
var userClickedPattern = [];

var startedToToggle = false;
var level = 0;

//Keyboard has been detected
$(document).on("keypress", function(event) {

  if (!startedToToggle && event.key === " ") {
    $("#level-title").text("Level " + level);
    nextSequence();
    startedToToggle = true;
  }
})

//Click has been detected
$(".btn").on("click", function() {

  if (startedToToggle === true) {
    var userChosenColour = $(this).attr("id");

    //add the color that the user clicked to the empty array
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    //after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    var currentLevel = userClickedPattern.length - 1;
    checkAnswer(currentLevel);

  } else {
    return;
  }

});

function nextSequence() {
  //empty the array once the next sequence gets triggered
  userClickedPattern = [];

  //Increases the level and changes the text
  level++;
  $("#level-title").text("Level " + level);

  //generates a new random number between 0 and 3
  var randomNumber = Math.floor(Math.random() * 4);

  //choses a random color based on then random number generated
  var randomChosenColour = buttonColours[randomNumber];

  //add the random color to the empty array
  gamePattern.push(randomChosenColour);

  //the id of the random color gets called and animates with a flash
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

//function that plays the sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//function that makes the animation when the user pressess the button
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    //check the length
    if (userClickedPattern.length === gamePattern.length) {
      //Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  } else {
    console.log("wrong");

    //if user got the wrong answer play the wrong sound
    playSound("wrong");

    //adds red style when the user gets the answer wrong
    $("body ").addClass("game-over");
    setTimeout(function() {
      $("body ").removeClass("game-over");
    }, 200);

    //changes the h1 text to say game over
    $("#level-title").text("Game Over, Press Any Key to Restart ");

    //calls the start over function bc the user got the sequence wrong
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  startedToToggle = false;
}
