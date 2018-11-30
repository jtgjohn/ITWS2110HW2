$.fn.hexed = function(settings) {
  var difficulty = 5;
  var turns=0;
  var maxTurns=10;
  var totalScore=0;
  function init(init) {
    $(init).html("");
    maxTurns=10;
    turns=0;
    totalScore=0;
    difficulty=5;
    $(init).append('<h2 class="demoHeaders">Hexed</h2>');
    $(init).append('<div id="difficultySlider" class="slider"></div>');
    $(init).append('<label for="difficultyAmount">Difficulty Level: </label>');
    $(init).append('<label id="difficultyAmount">5</label>')
    $(init).append('<p></p>')
    $(init).append('<div id="turnsSlider" class = "slider"></div>');
    $(init).append('<label for="turnsAmount">Number of Turns: </label>');
    $(init).append('<label id="turnsAmount">10</label>')
    $(init).append('<p></p>');
    $(init).append('<button id="start">Start</button>');
    
    $("#difficultySlider").slider({
      orientation: "horizontal",
      range: "min",
      max: 10,
      min: 1,
      value: 5,
      slide: function(event, ui) {
          $("#difficultyAmount").html("" + ui.value);
          difficulty = ui.value;
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
          maxTurns = ui.value;
      }
    });
    $("#start").click(function() {
      start(init);
    });
  }
  
  init(this);

  function start(init) {
    $(init).html("");
    
    $(init).append("<h2 class='demoHeaders'>Hexed</h2>");
    $(init).append('<label for="redAm">R: </label>');
    $(init).append('<label id="redAm">255</label>');
    $(init).append('<div id="red"></div>');
    $(init).append('<label for="blueAm">B: </label>');
    $(init).append('<label id="blueAm">255</label>');
    $(init).append('<div id="blue"></div>');
    $(init).append('<label for="GreenAm">G: </label>');
    $(init).append('<label id="GreenAm">255</label>');
    $(init).append('<div id="green"></div>');
    $(init).append('<label id="time"></label>');
    $(init).append('<label id="endTime"></label>');
    $(init).append('<br>');
    $(init).append('<button id="submit">Submit</button> ');
    $(init).append('<div id="guess" class="ui-widget-content ui-corner-all"></div>');
    $(init).append('<div id="target" class="ui-widget-content ui-corner-all"></div>');
    $(init).append('<table id="board"> </table>');

    $(document).ready(function(){
        $("#guess").css("background-color", "rgb(" + 255 + "," + 255 + "," + 255 + ")");
        $("#target").css("background-color", randomColor());
        $("#time").html(Date.now);
        $("#board").append("<tr>;" +
                    "<th> Turn</th>;" +
                    "<th> Score</th>;" +
                    "<th> Time</th>;" +
                    "<th> Total Score</th>;" +
                    "</tr>;");
        
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
        turns+=1;
        
        $("#endTime").html(Date.now);
        $timeTakenMs= parseInt($("#endTime").html()) - parseInt($("#time").html());
        $scoreTurn = score($timeTakenMs,difficulty);
        totalScore+=$scoreTurn;
        console.log($scoreTurn);
        alert("Correct Answer:  " + document.getElementById("target").style.backgroundColor + "\n" + "Your answer:  " + document.getElementById("guess").style.backgroundColor + "\n" + "Points:  " + $scoreTurn);
    
        $("#target").css("background-color",randomColor() );
        $("#time").html(Date.now);
        $("#board").append("<tr>;" +
                "<td> " + turns + "</td>;" +
                "<td> " + $scoreTurn + "</td>;" +
                "<td> " + $timeTakenMs + "ms" + "</td>;" +
                "<td> " + totalScore + "</td>;" +
                "</tr>;");
        if(turns >= maxTurns){
            alert("Final Score: " + totalScore);
            console.log(document.getElementById("hexed"));
            location.reload();
        }
    });
  }
  
  function score(time_taken, difficulty) {
    
    var targetColor = document.getElementById("target").style.backgroundColor;
    var guessColor = document.getElementById("guess").style.backgroundColor;
    var targetVals = targetColor.substring(targetColor.indexOf('(') + 1, targetColor.length - 1).split(', ');
    var guessVals = guessColor.substring(guessColor.indexOf('(') + 1, guessColor.length - 1).split(', ');

    var rpo = (Math.abs(guessVals[0] - targetVals[0])/255) * 100;
    var gpo = (Math.abs(guessVals[1] - targetVals[1])/255) * 100;
    var bpo = (Math.abs(guessVals[2] - targetVals[2])/255) * 100;
    var avgPercOff = Math.floor((rpo + gpo + bpo) / 3);

    var score = ((15 - difficulty - avgPercOff) / (15 - difficulty)) * (15000 - time_taken);
    score = Math.max(0, score);

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
