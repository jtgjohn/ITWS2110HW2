John Gay
gayj@rpi.edu

Homework 2: JQuery Plugin - Hexed!

Team 8 members: Talia Leong, Jonny Koppelman, Allison Saputo

1. Writing a plugin allows for the generic implementation of the code.
Writing regular javascript makes it specific to the html document, but the plugin
allows it to be used on any document. This makes the implementation simpler and the 
overall workload is smaller, along with the reuse of the plugin.

2. The jQuery plugin adheres to the best practices because it dynamically builds the game. 
The only javaScript or jQuery required to add the game to any page is a single line pointing
to the html location to add it. This is a good practice because the code for it only has
to be touched once, and now that it is built it does not need to be modified because it 
is fully functional on its own. Additionally, the code is written well and is clearly
documented, so that anyone wishing to understand the implementation of the plugin should
be able to do so. 

3. No, nothing prevents us from posting the scores to a server on a different domain. 
To accomplish this, we could create a button that appears after the game is finished to start
a new game instead of sending an alert. Using PHP, we could save the information of all the 
scores and send them through the post method. One way to do this would be to create an invisible
form that stores the final score with a visible submit button to start the new game, so that
when clicked the action will be the same page and since the submit button is set the PHP code
will insert the score into a scores table that stores all the high scores. It would then 
be a simple select query to output the highest scores using "ORDER BY score DESC". This
is a relatively simple way we could post the final scores and store them in a table.

Sources:
http://learn.jquery.com/plugins/
https://www.w3schools.com/js/js_random.asp
http://www.javascripter.net/faq/rounding.htm
https://stackoverflow.com/questions/313893/how-to-measure-time-taken-by-a-function-to-execute