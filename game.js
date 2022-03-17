var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

//Detect key press
$(document).on("keypress", function() {
  checkStartGame();
});

function checkStartGame () {
  //Only start the game in the first key press.
  if (!started) {
    //Change title.
    $("#level-title").text("Level " + level);
    //Generate the next sequence in the pattern.
    nextSequence();
    //Make sure the game is not started again
    started = true;
  }
}

$(document).on("click", function(event) {
  if ($(event.target).closest(".btn").length === 0) {
    checkStartGame();
  }
});

//Detect cliks on any of the buttons
$(".btn").on("click", function() {
  //Get the clicked button
  var userChosenColour = $(this).attr("id");
  //Store the clicked button into the array
  userClickedPattern.push(userChosenColour);
  //Play the sounds
  playSound("sounds/" + userChosenColour + ".mp3");
  //Show animation with the click
  animatePress(userChosenColour);

  //Check the answer
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
  //Check most recent answer
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    //console.log("success");
    //Check if sequence is finished
    if (userClickedPattern.length === gamePattern.length){
          setTimeout(function() {
            nextSequence();
          }, 1000);
    }

  } else {
    //console.log("wrong");
    //Play sound
    playSound("sounds/wrong.mp3");
    //Change style
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    //Change title.
    $("#level-title").text("Game Over, Press Any Key to Restart (or click outside the buttons)");
    startOver();
  }
}

function nextSequence() {
  //Reset the clicked pattern
  userClickedPattern = [];
  //Increase the Level
  level ++;
  //Change title.
  $("#level-title").text("Level " + level);

  //4 possible colours, generate a random number for the index
  var randomNumber = Math.floor(Math.random() * 4);
  //Use the previous random index for selecting a real colour.
  var randomChosenColour = buttonColours[randomNumber];
  //Add the colour to the pattern.
  gamePattern.push(randomChosenColour);

  //Animation with flash to the button selected
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //Play the corresponding sound
  var audioName = "sounds/" + randomChosenColour + ".mp3";
  playSound(audioName);
}

function playSound(name) {
  var audioName = new Audio(name);
  audioName.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver(){
  gamePattern = [];
  started = false;
  level = 0;
}
