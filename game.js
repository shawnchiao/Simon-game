var gamePattern= [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern= [];
var started = false;
var level = 0;
var games = 0

// sound playing function
function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}
// check answer function

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }
        ,1000)


    }
  }else{
    failed();
  }
}

// failed function
function failed(){
  var failedSoud = new Audio("sounds/wrong.mp3");
  failedSoud.play();
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200)
  $("#level-title").text("Game Over, Press  Any Key to Restart");
  startover();
}

// start over function
function startover(){
  level = 0;
  started = false;
  gamePattern = [];
}
// Animations to User Clicks fucntion
function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  },100)
}
// radom button selected function
function nextSequence(){
  userClickedPattern=[];
  var randomNumber= Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("#level-title").text("Level "+level)
}

// user choice collecting
$(".btn").on("click", function(){
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

// start the game

$("body").keydown(function(event){
  if (!started){
    $("#level-title").text("Level "+level)
    nextSequence()
    started = true;
  };

})
