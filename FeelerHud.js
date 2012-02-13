/**
 *
 * @author Anthony Reyes
 * @author Brent Bertrand
 *
 */

#pragma strict
#pragma implicit
#pragma downcast

var feeler : Feeler;

private var boxWidth = 240;
private var boxHeight = 140;
private var padding = 5;

function Update () {

}

function DrawGUI(event:Event) {
	// Generate the feeler text
	var debugText = "";
	for(var i = 0; i < feeler.rayDistances.length; i++)
	{
		debugText += "Feeler " + (i+1) + ": " + feeler.rayDistances[i] + "\n";
	}
	
	// Draw the feeler box
	GUI.TextArea(new Rect(Screen.width - boxWidth - padding, padding, boxWidth, boxHeight), debugText);
}
