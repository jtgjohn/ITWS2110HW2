$(function() {
    //slider for the difficulty of the game
    $("#difficultySlider").slider({
        value: 5,
        min: 0,
        max: 10,
        step: 1,
        slide: function(event, ui) {
            $("#difficultyAmount").val("" + ui.value);
        }
    });
    //updates the value of the difficulty slider as it moves
    $("#difficultyAmount").val("" + $("#difficultySlider").slider("value"));

    //slider for the number of turns the game has
    $("#turnSlider").slider({
        value: 10,
        min: 1,
        max: 100,
        step: 1,
        slide: function(event, ui) {
            $("#turnAmount").val("" + ui.value);
        }
    });
    //updates the number of turns as the slider is moved
    $("#turnAmount").val("" + $("#turnSlider").slider("value"));


});

//set up the game
$("#hexed").hexed(settings);
