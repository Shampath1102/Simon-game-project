var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level =1;
var started = false;


function playSound(name){
  var audio = new Audio("./sounds/"+ name +".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
    setTimeout(function() { $("#"+currentColour).removeClass("pressed"); } , 100);
}

$(".btn").click(function(){
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});


$(document).keydown(function(){
  if(started!=true)
   nextSequence();
   started = true;
 });


function nextSequence()
{

userClickedPattern = [];

$("h1").text("Level "+level );

var randomNumber =Math.floor( Math.random() * 4 );

var randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour);

$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColour);


level++;

}


function checkAnswer(currentlevel){

  if (userClickedPattern[currentlevel] === gamePattern[currentlevel]) {
    console.log("true");
      if(userClickedPattern.length === gamePattern.length){
        setTimeout(function() {
           nextSequence();
         } , 1000);
      }

  }
  else {
    console.log("false");
    playSound("wrong");
    $("body").addClass("game-over");
      setTimeout(function() { $("body").removeClass("game-over"); } , 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }


}


function startOver() {

  gamePattern = [];
  started = false;
  level = 1;

}
