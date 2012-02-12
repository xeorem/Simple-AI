
var sensorRange : float = 5;
var maxObjects : int = 50;

var count : int;
var sensedObjDist : float[];
var sensedObjAngl : float[];

function Start() {
	var angle : float;
	var dir : Vector3;
	count = 0;
	sensedObjDist = new float[maxObjects];
	sensedObjAngl = new float[maxObjects];
	for(var i = 0; i < sensedObjDist.Length; i++) 
	{
		sensedObjDist[i] = -1;
		sensedObjAngl[i] = -1;
	}
}

function Update () {
	count = 0;
	for (var otherObj : GameObject in GameObject.FindGameObjectsWithTag("agent")) {
		// check if in range of transform.position
		var dist:float = Vector3.Distance(transform.position, otherObj.transform.position);
		if (dist < sensorRange && count < maxObjects && otherObj != gameObject) {
			// Store in list:
			//   distance
			//   angle
			
			sensedObjDist[count] = dist;
			
			// Find angle from gameObject
    		dir = otherObj.transform.position - transform.position;
    		angle = Vector3.Angle(transform.forward, dir);
			
			var cross : Vector3 = Vector3.Cross(transform.forward, dir);
			
			//if (transform.position.x < otherObj.transform.position.x) {
			if (cross.z > 0) {
				angle = 360-angle;
			}
			
			sensedObjAngl[count] = angle;
			
			count++;
		}
	}
	for (var i = count; i < sensedObjDist.Length; i++) {
		sensedObjDist[i] = -1;
		sensedObjAngl[i] = -1;
	}
}