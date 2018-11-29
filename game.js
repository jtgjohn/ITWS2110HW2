

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

