
public var viewSpectrumDegrees:int = 90;

public var numFeelers:int = 3;

public var feelerDistance:float = 10;
public var feelerDirection:float = 0f;

public var rayDistances : float[];

private var feelerDirections:float[];
private var characterHeight;
private var characterRadius;

public var pilotObject:GameObject;
public var physicalObject:GameObject;

private var stepHeight:float = 0.2; // the maximumm height an object can be before being considered a wall

function Start()
{
	// find the parent (or target) object
	if(physicalObject == null) physicalObject = this.gameObject;
	if(pilotObject == null) pilotObject = this.gameObject;
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
		if(hit && (hitDetails.collider.tag == "agent" || hitDetails.collider.tag == "Player")) hit = false;
		
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
	var origin = new Vector3(physicalObject.transform.position.x, physicalObject.transform.position.y + stepHeight, physicalObject.transform.position.z);
	//origin += this.transform.rotation * 6;
	return origin;
}