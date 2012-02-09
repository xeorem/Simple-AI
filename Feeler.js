
var viewSpectrumDegrees:int = 90;

var numFeelers:int = 3;

var feelerDistance:float = 10;
var feelerDirection:float = 0f;

var rayDistances : float[];

private var feelerDirections:float[];
private var characterHeight;
private var characterRadius;

var pilotObject:GameObject;
var physicalObject:GameObject;

function Start() 
{
	// find the parent (or target) object
	if(physicalObject == null) physicalObject = this.gameObject;
	if(pilotObject == null) pilotObject = GameObject.Find(physicalObject.transform.parent.name);
	characterHeight = physicalObject.GetComponent(CharacterController).height;
	characterRadius = physicalObject.GetComponent(CharacterController).radius;

	// initialize the feelers
	rayDistances = new float[numFeelers];
	feelerDirections = new float[numFeelers];
	var viewSpectrumRads = viewSpectrumDegrees * Mathf.Deg2Rad;
	var directionIncrement = viewSpectrumRads / (numFeelers-1);
	var startDirection = Mathf.PI/2 - viewSpectrumRads / 2;
	for(var i = 0; i < rayDistances.Length; i++) 
	{
		rayDistances[i] = -1;
		feelerDirections[i] = startDirection + directionIncrement * i;
	}
}

function Update () 
{
	// set origin point for feelers
	var origin = getFeelerOrigin();
	
	for(var i = 0; i < numFeelers; i++)
	{
		// generate directional vector
		var vectorDirection:Vector3 = getFeelerDirectionalVector(i);
		
		// cast the ray
		var hitDetails : RaycastHit;
		var hit = Physics.Raycast(origin, vectorDirection, hitDetails, feelerDistance);
		
		// draw the ray
		var color = hit ? Color.red : Color.green;
		Debug.DrawRay(origin, vectorDirection, color);
		
		// update ray distance information
		rayDistances[i] = hit ? hitDetails.distance : -1;
	}
}

private function getFeelerDirectionalVector(feelerIndex:int):Vector3
{
	var xMag = feelerDistance * Mathf.Cos(feelerDirections[feelerIndex]);
	var yMag = 0;
	var zMag = feelerDistance * Mathf.Sin(feelerDirections[feelerIndex]);
	var vectorDirection:Vector3 = pilotObject.transform.TransformDirection(xMag, yMag, zMag);
	return vectorDirection;
}

private function getFeelerOrigin()
{
	var origin = new Vector3(physicalObject.transform.position.x, physicalObject.transform.position.y + characterHeight, physicalObject.transform.position.z + characterRadius);
	return origin;
}