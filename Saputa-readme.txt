1) What are the advantages to writing a jQuery plugin over regular JavaScript that uses jQuery?
	A plugin is useful because it saves time by using things in an abstract form. They are more portable/adaptable than
	a regular Javascript function because it is abstract. It reduces the scope of conflict within the Javascript. They should be able to 
	be used on various browsers and webpages and not just hardcoded. They are easier to implement using less effort, time and energy. 

2) Explain how your jQuery plugin adheres to best practices in JavaScript and jQuery development.
	It adheres to the best practices of JavaScript and jQuery. The program is not hard coded and it is dynamic. The plugin calls any object with the init calls 
	in the beginning. Our code used an id called "hexed" but wasn't exclusively calling for an id labeled "hexed". The data that is used to create the game
	is also dynamic. The functions of the site are added in by the plugin, and is not preset in the html. This means it can be added in to any website, because the
	core structure is determined in the plugin, not by the html. 

3) Does anything prevent you from POSTing high scores to a server on a different domain? If so, what? If
not, how would we go about it (written explanation/pseudocode is fine here)?
		Nothing prevents you from posting to a server on a different domain using AJAX/PHP. You can use PHP to post to a server and save it in a table filled
		with other high scores using player ID's. It can also store the difficulty and number of turns. Pulling from the database, you can display it on the page if 
		the player's score is within the top 10 for the matching turns and difficulties. 
		
		

		
		
		
		
Sources: https://j11y.io/javascript/why-create-a-jquery-plugin/
