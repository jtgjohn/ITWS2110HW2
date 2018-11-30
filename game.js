$.fn.hexed = function(settings) {
  function init(init) {
    $("#hexed").append('<h2 class="demoHeaders">Hexed</h2>');
    $("#hexed").append('<div id="difficultySlider" class="slider"></div>');
    $("#hexed").append('<label for="difficultyAmount">Difficulty Level: </label>');
    $("#hexed").append('<label id="difficultyAmount">5</label>')
    $("#hexed").append('<p></p>')
    $("#hexed").append('<div id="turnsSlider" class = "slider"></div>');
    $("#hexed").append('<label for="turnsAmount">Number of Turns: </label>');
    $("#hexed").append('<label id="turnsAmount">10</label>')
    $("#hexed").append('<p></p>');
    $("#hexed").append('<button id="start">Start</button>');
    
    $("#difficultySlider").slider({
      orientation: "horizontal",
      range: "min",
      max: 10,
      min: 1,
      value: 5,
      slide: function(event, ui) {
          $("#difficultyAmount").html("" + ui.value);
      }
    });
    $("#turnsSlider").slider({
      orientation: "horizontal",
      range: "min",
      min: 1,
      max: 100,
      value: 10,
      slide: function(event, ui) {
          $("#turnsAmount").html("" + ui.value);
      }
    });
    $("#start").click(function() {
      start();
    });
  }
  
  init();

  function start() {
    $("#hexed").html("");
    
    $("#hexed").append("<h2 class='demoHeaders'>Hexed</h2>");
    $("#hexed").append('<label for="redAm">R: </label>');
    $("#hexed").append('<label id="redAm">255</label>');
    $("#hexed").append('<div id="red"></div>');
    $("#hexed").append('<label for="blueAm">B: </label>');
    $("#hexed").append('<label id="blueAm">255</label>');
    $("#hexed").append('<div id="blue"></div>');
    $("#hexed").append('<label for="GreenAm">G: </label>');
    $("#hexed").append('<label id="GreenAm">255</label>');
    $("#hexed").append('<div id="green"></div>');
    $("#hexed").append('<label id="time"></label>');
    $("#hexed").append('<label id="endTime"></label>');
    $("#hexed").append('<br>');
    $("#hexed").append('<button id="submit">Submit</button> ');
    $("#hexed").append('<div id="guess" class="ui-widget-content ui-corner-all"></div>');
    $("#hexed").append('<div id="target" class="ui-widget-content ui-corner-all"></div>');

    $(document).ready(function(){
        $("#guess").css("background-color", "rgb(" + 245 + "," + 200 + "," + 100 + ")");
        $("#target").css("background-color", randomColor());
        $("#time").html(Date.now);
    });
   
    $( "#red" ).slider({
        orientation: "horizontal",
        range: "min",
        max: 255,
        value: 255,
        slide: function(event, ui) {
            $("#redAm").html("" + ui.value);
            $redVal=$("#red").slider('option','value');
            $blueVal=$("#blue").slider('option','value');
            $greenVal=$("#green").slider('option','value');
            $("#guess").css("background-color", "rgb(" + $redVal + "," + $greenVal + "," + $blueVal + ")");
        }
    });
    $( "#blue" ).slider({
        orientation: "horizontal",
        range: "min",
        max: 255,
        value: 255,
        slide: function(event, ui) {
            $("#blueAm").html("" + ui.value);
            $redVal=$("#red").slider('option','value');
            $blueVal=$("#blue").slider('option','value');
            $greenVal=$("#green").slider('option','value');
            $("#guess").css("background-color", "rgb(" + $redVal + "," + $greenVal + "," + $blueVal + ")");
        }
    });
    $( "#green" ).slider({
        orientation: "horizontal",
        range: "min",
        max: 255,
        value: 255,
        slide: function(event, ui) {
            $("#GreenAm").html("" + ui.value);
            $redVal=$("#red").slider('option','value');
            $blueVal=$("#blue").slider('option','value');
            $greenVal=$("#green").slider('option','value');
            $("#guess").css("background-color", "rgb(" + $redVal + "," + $greenVal + "," + $blueVal + ")");
        }
    });
    $("#submit").click(function(){

        //Calculates time taken for turn.
        $("#endTime").html(Date.now);
        $timeTakenMs= parseInt($("#endTime").html()) - parseInt($("#time").html());


        console.log($timeTakenMs);
    });
  }
  
  function score(time_taken) {
    var difficulty = document.getElementById("difficultySlider").slider("option","value");
    var targetColor = document.getElementById("target").style.backgroundColor;
    var guessColor = document.getElementById("guess").style.backgroundColor;
    var targetVals = targetColor.substring(str.indexOf('(') + 1, str.length - 1).split(', ');
    var guessVals = guessColor.substring(str.indexOf('(') + 1, str.length - 1).split(', ');

    var rpo = (Math.abs(guessColor[0] = targetColor[0])/255) * 100;
    var gpo = (Math.abs(guessColor[1] = targetColor[1])/255) * 100;
    var bpo = (Math.abs(guessColor[2] = targetColor[2])/255) * 100;
    var avgPercOff = Math.floor((rpi + gpo + bpo) / 3);

    var score = ((15 - difficulty - avgPercOff) / (15 - difficulty)) * (15000 - time_taken);
    score = max(0, score);

    score = Math.round(100 * score)/100;

    return score;
  }

  function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }

}
var settings = {
    "difficulty": 5,
    "turns": 10
}

$("#hexed").hexed(settings);
