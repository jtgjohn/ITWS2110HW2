1) What are the advantages to writing a jQuery plugin over regular JavaScript that uses jQuery?
	A plugin can be added to any existing page with much less effort than trying to add JavaScript
	to an existing page. A plugin can just be downloaded, referenced, and called within the
	existing page, whereas JavaScript that uses jQuery would have to be copied and pasted into the
	existing page.
2) Explain how your jQuery plugin adheres to best practices in JavaScript and jQuery development.
	Our plugin adheres to the best practices in JavaScript and jQuery development because all of our
	code is dynamic. We allow our plugin to be called on any object, in this case we made a div with
	id "hexed" that we used to call our plugin, but any html object can be used. Our plugin then
	dynamically adds all the elements and functionality of the game a user needs to play the game.
	By coding out plugin in this fashion, a user could implement their own website and place our
	game at the bottom of their page, at the top, or wherever they wish with little difficulty.
	The user just has to call function hexed on any html object they wish.
3) Does anything prevent you from POSTing high scores to a server on a different domain? If so, what? If
not, how would we go about it (written explanation/pseudocode is fine here)?
	Nothing prevents us from POSTing high scores to a server. When showing the alert for the player's
	final score, we would use PHP to post the high scores to a server and save it in a table corresponding
	to the player's id, the difficulty, and the number of turns. After doing that, we could pull
	the data from the table with corresponding difficulty and number of turns to see if the player's
	score is within the top 10 or so. We could also display the top 10 scores for the corresponding
	difficulty and number of turns, and highlight the player's score if it appears in the top 10.