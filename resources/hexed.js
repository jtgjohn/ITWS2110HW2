$.fn.hexed = function(settings) {

    init(this);

    //variables to hold the final and current total score
    var totalScore = 0;
    var finalScore = 0;

    //variables to hold time
    var seconds = 0;
    var minutes = 0;

    //variables to hold difficulty and number of turns
    var difficulty = 0;
    var totalTurns = 0;

    //holds current turn
    var turns = 1;

    //Scoreboard will be initialized when the game starts
    var scoreboard_initialized = false;

    //get the number of turns chosen by the user
    function get_turn() {
        return document.getElementById("turnAmount").value;
    }

    //get the difficulty of the game chosen by the user
    function get_difficulty() {
        return document.getElementById("difficultyAmount").value;

    }

    //before the game, set up sliders for users to input the number of turns and difficulty of the game
    //initial game settings
    function init(init) {
        //initialize timer variable

        var timer = 0;
        // difficulty slider
        $(init).append('<div id="difficultySlider" class="">');
        $(init).append('  <p>');
        $(init).append('      <label for="difficultyAmount">Difficulty Level: </label>');
        $(init).append('      <input type="text" id="difficultyAmount" readonly style="border:0; color:#f6931f; font-weight:bold;">');
        $(init).append('  </p>');
        $(init).append('</div>');

        $(init).append('<br><br>');

        //turn slider
        $(init).append('<div id="turnSlider" class="">');
        $(init).append('  <p>');
        $(init).append('      <label for="turnAmount">Number of turns: </label>');
        $(init).append('      <input type="text" id="turnAmount" readonly style="border:0; color:#f6931f; font-weight:bold;">');
        $(init).append('  </p>');
        $(init).append('</div>');
        $(init).append('<br><br>');

        //button to start the game
        $(init).append('<button id="startButton" class="">START THE GAME</button>');

    }

    //when the game is started
    function start() {

        //save the initial game settings
        totalTurns = get_turn();
        difficulty = get_difficulty();

        //get rid of the turn and difficulty sliders
        $("#hexed").html("");

        //add the red, green, and blue color sliders
        $("#hexed").append('<div class="colorSlider"><div id="red"></div><input type="text" id="redHexNum" /></div>');
        $("#hexed").append('<div class="colorSlider"><div id="green"></div><input type="text" id="greenHexNum" /></div>');
        $("#hexed").append('<div class="colorSlider"><div id="blue"></div><input type="text" id="blueHexNum" /></div>');

        //add the color swatch the user will try to match
        $("#hexed").append('<h5>Target</h5>');
        $("#hexed").append('<div id="answer" class="ui-widget-content ui-corner-all"></div>');

        //add the swatch showing what color is made out of the current rgb values
        $("#hexed").append('<h5>Yours</h5>');
        $("#hexed").append('<div id="swatch" class="ui-widget-content ui-corner-all"></div>');

        //button for user to click when they think they've matched with the color swatch
        $("#hexed").append('<button id="gotIt"> GOT IT! </button>');

        //table to hold scores
        $("#hexed").append('<table id="scoreBoard"> </table>');

        //Add Div to hold dialog box
        $("#hexed").append('<div id="dialog" title="Good Game"><p>Would you like to play again?</p></div>');

        //Now that the div to hold the dialog has been added, the dialog box can be set up
        setDialog();

        //set up the red, green, and blue sliders
        // code from jquery ui START
        $("#red, #green, #blue").slider({
            orientation: "horizontal",
            range: "min",
            max: 255,
            value: 127,
            slide: refreshSwatch,
            change: refreshSwatch
        });
        $("#red").slider("value", 255);
        $("#green").slider("value", 140);
        $("#blue").slider("value", 60);
        // code from jquery ui END

        //get the first color swatch the user has to match
        refreshAnswer();
    }

    //refresh the swatch that shows the user the color their rgb values equal
    function refreshSwatch() {
        //get the values from the sliders
        // code from jquery ui START
        var red = $("#red").slider("value");
        var green = $("#green").slider("value");
        var blue = $("#blue").slider("value");

        //refresh the color of the swatch based on the values
        $("#swatch").css("background-color", "rgb(" + red + "," + green + "," + blue + ")");
        // code from jquery ui END

        //update the numbers showing the rgb values next to the sliders
        $("#redHexNum").val(red);
        $("#greenHexNum").val(green);
        $("#blueHexNum").val(blue);
    }

    //set the color of the swatch the user has to find the rbg balues of
    function refreshAnswer() {
        $("#answer").css("background-color", getAnswer());
    }


    //start the timer
    function startTimer() {

            //initialize the table
            if (!scoreboard_initialized) {
                $("#scoreBoard").append("<tr>;" +
                    "<th> Turn</th>;" +
                    "<th> Score</th>;" +
                    "<th> Time</th>;" +
                    "<th> Total Score</th>;" +
                    "</tr>;");
                scoreboard_initialized = true;
            }
            //for the timer, run the incrementTime function every 1000 ms
            timer = setInterval(function() {
                incrementTimer();
            }, 1000);
        }
    //helper function to calculate the time
    //add a second
    function incrementTimer() {
        seconds++;
        if (seconds == 60) {
            minutes++;
            seconds = 0;
        }
    }

    //Sets up the dialog box to appear when game is over
    function setDialog(){
        $("#dialog").dialog({
            autoOpen: false,
            modal: true,
            draggable: false,
            resizable: false,
            buttons: {
                //if user wants to replay the game, refresh the page
                "Yes": function() {
                    location.reload();
                },
                //else close the dialog box
                "No": function() {
                    $(this).dialog("close");
                }
            }
        });
    }


    // When the player manually enters a rgb number, the program will update the slider
    $("#hexed").on('change', "#redHexNum", function(){
        $("#red").slider("value", $(this).val());
    });

    $("#hexed").on('change', "#greenHexNum", function(){
        $("#green").slider("value", $(this).val());
    });

    $("#hexed").on('change', "#blueHexNum", function(){
        $("#blue").slider("value", $(this).val());
    });

    //when the user chooses to start the game
    $("#startButton").click(function() {
        //run the start function
        start();

        //start the timer
        startTimer();

    });

    //On Click Function for Got it button displays score and gets new swatch color to match
    $("#hexed").on('click', "#gotIt", function(){ 
        // When the check button is pressed, we calculate the score here
        // Get rgb values from swatch
        var str = document.getElementById("answer").style.backgroundColor;
        var vals = str.substring(str.indexOf('(') + 1, str.length - 1).split(', ');
        var r = vals[0];
        var g = vals[1];
        var b = vals[2];

        // Calculate % off and average it
        var redOff = (Math.abs($("#red").slider("value") - r) / 255) * 100;
        var greenOff = (Math.abs($("#green").slider("value") - g) / 255) * 100;
        var blueOff = (Math.abs($("#blue").slider("value") - b) / 255) * 100;
        var avg = Math.floor((redOff + blueOff + greenOff) / 3);

        // Calculate score
        var score = ((15 - difficulty - avg) / (15 - difficulty)) * (15000 - (((minutes * 60) + seconds) * 1000));
        if (score < 0) {
            score = 0;
        }

        //round the score to 2 decimal places
        score = ((Math.round(score * 100))/100);

        //add the score to the total score
        totalScore += score;

        // if the game isn't over yet
        if (turns <= totalTurns) {
            //append information to the table
            $("#scoreBoard").append("<tr>;" +
                "<td> " + turns + "</td>;" +
                "<td> " + score + "</td>;" +
                "<td> " + minutes + "m" + seconds + "s" + "</td>;" +
                "<td> " + totalScore + "</td>;" +
                "</tr>;");
            //alert the user of the correct color and how their choice compared, along with their score
            alert("Correct Answer:  " + str + "\n" + "Your answer:  " + document.getElementById("swatch").style.backgroundColor + "\n" + "Points:  " + score);
            //reset the time
            seconds = 0;
            minutes = 0;
            //get a new color swatch for the user to match
            refreshAnswer();
        }

        //a turn has been completed
        ++turns;

        //if the game is over, set the final score variable
        if (turns == totalTurns){
            finalScore = totalScore;
        }

        //If the game is over, show the final score and then a dialog box asking the user to play again
        if (turns > totalTurns){
            alert("Final Score: " + finalScore);
            $("#dialog").dialog("open");
        }

    });


    //function to return random number for the color swatch
    function randomNum() {
        return Math.floor(Math.random() * (255) + 1);
    }

    //gets a new color value for the user to try and match
    function getAnswer() {
        var colorString = "rgb(" + randomNum() + "," + randomNum() + "," + randomNum() + ")";
        return colorString;
    }

}

//initial difficulty and turns values
var settings = {
    "difficulty": 5,
    "turns": 10
}
