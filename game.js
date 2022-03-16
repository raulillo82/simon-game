var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

$(".btn").on("click", function() {
  //Get the clicked button
  var userChosenColour = $(this).attr("id");
  //Store the clicked button into the array
  userClickedPattern.push(userChosenColour);
});

function nextSequence() {
  //4 possible colours, generate a random number for the index
  var randomNumber = Math.floor(Math.random() * 4);
  //Use the previous random index for selecting a real colour.
  var randomChosenColour = buttonColours[randomNumber];
  //Add the colour to the pattern.
  gamePattern.push(randomChosenColour);

  //Animation with flash to the button selected
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //Play the corresponding sound
  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
}
