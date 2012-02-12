#pragma strict
#pragma implicit
#pragma downcast

var sensor : AgentSensor;

private var boxWidth = 240;
private var boxHeight = 140;
private var padding = 5;

function Update () {
	
}

function DrawGUI(event:Event) {
	// Generate the sensor text
	var debugText = "";
	for(var i = 0; i < sensor.count; i++)
	{
		debugText += "Distance: " + sensor.sensedObjDist[i] + ", Angle: " + sensor.sensedObjAngl[i] + "\n";
	}
	
	// Draw the feeler box
	GUI.TextArea(new Rect(Screen.width - boxWidth - padding, padding + boxHeight + padding, boxWidth, boxHeight), debugText);
}
