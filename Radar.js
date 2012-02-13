
var radarRange : float = 5;

var pieSlice : int[];

function Start () {
	
	pieSlice = new int[4];
	
	for (var i = 0; i < 4; i++) {
		pieSlice[i] = 0;
	}
	
}

function Update () {
	
	var debugVec1 : Vector3 = new Vector3(Mathf.Sqrt(12.5), 0, (0-Mathf.Sqrt(12.5)));
	var debugVec2 : Vector3 = new Vector3((0-Mathf.Sqrt(12.5)), 0, (0-Mathf.Sqrt(12.5)));
	
	debugVec1 = transform.TransformDirection(debugVec1);
	debugVec2 = transform.TransformDirection(debugVec2);
	
	Debug.DrawRay(transform.position, debugVec1, Color.blue);
	Debug.DrawRay(transform.position, debugVec2, Color.blue);
	
	for (var i = 0; i < 4; i++) {
		pieSlice[i] = 0;
	}
	
	for (var otherObj : GameObject in GameObject.FindGameObjectsWithTag("agent")) {
		
		var dist:float = Vector3.Distance(transform.position, otherObj.transform.position);
		if (dist < radarRange && otherObj != gameObject) {
			
			var index : int = inSlice(otherObj);
			pieSlice[index]++;
			
		}
		
	}
	
}

private function inSlice (obj : GameObject) : int {
	
	// Find angle from gameObject
    var dir : Vector3 = obj.transform.position - transform.position;
    var angle : float = Vector3.Angle(transform.forward, dir);
	
	var v1 : Vector2 = new Vector2(dir.z, dir.x);
	var v2 : Vector2 = new Vector2(transform.forward.z, transform.forward.x);
	
	var cross : Vector3 = Vector3.Cross(v2, v1);
	
	//if (transform.position.x < otherObj.transform.position.x) {
	if (cross.z > 0) {
		angle = 360-angle;
	}
	
	// (45, 135, 225, 315)
	if (angle <= 45 || angle > 315) {
		return 0;
	} else if (angle <= 135 && angle > 45) {
		return 1;
	} else if (angle <= 225 && angle > 135) {
		return 2;
	} else if (angle <= 315 && angle > 225) {
		return 3;
	}
	return 0;
	
}