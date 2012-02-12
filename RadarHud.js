#pragma strict
#pragma implicit
#pragma downcast

var radar : Radar;

private var boxWidth = 240;
private var boxHeight = 140;
private var padding = 5;

function Update () {
	
}

function DrawGUI(event:Event) {
	// Generate the sensor text
	var debugText = "";
	
	debugText += "Front: " + radar.pieSlice[0] + "\n";
	debugText += "Left: " + radar.pieSlice[1] + "\n";
	debugText += "Back: " + radar.pieSlice[2] + "\n";
	debugText += "Right: " + radar.pieSlice[3] + "\n";
	
	// Draw the feeler box
	GUI.TextArea(new Rect(Screen.width - boxWidth - padding, (padding * 3) + (boxHeight * 2), boxWidth, boxHeight), debugText);
}
