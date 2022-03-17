var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

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
});

//Detect key press
$(document).on("keypress", function() {
  //Only start the game in the first key press.
  if (!started) {
    //Change title.
    $("#level-title").text("Level " + level);
    //Generate the next sequence in the pattern.
    nextSequence();
    //Make sure the game is not started again
    started = true;
  }
});

function nextSequence() {
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
  audioName = "sounds/" + randomChosenColour + ".mp3";
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
