
var radarRange : float = 5;

var pieSlice : int[];

function Start () {
	pieSlice = new int[4];
	
	for (var i = 0; i < 4; i++) {
		pieSlice[i] = 0;
	}
}

function Update () {
	
	for (var i = 0; i < 4; i++) {
		pieSlice[i] = 0;
	}
	
	for (var otherObj : GameObject in GameObject.FindGameObjectsWithTag("agent")) {
		
		var dist:float = Vector3.Distance(transform.position, otherObj.transform.position);
		if (dist < radarRange && otherObj != gameObject) {
			
			if (inSlice(0, otherObj)) {        // Front
				pieSlice[0]++;
			} else if (inSlice(1, otherObj)) { // Left
				pieSlice[1]++;
			} else if (inSlice(2, otherObj)) { // Back
				pieSlice[2]++;
			} else if (inSlice(3, otherObj)) { // Right
				pieSlice[3]++;
			}
			
		}
		
	}
}

private function inSlice (slice : int, obj : GameObject) : boolean {
	
	/*var head : Vector3;
	var dir : Vector3;
	
	dir = otherObj.transform.position - transform.position;
	Vector3.Normalize(dir);
	
	head = (transform.forward).normalized;
	
	var dotprod : float = Vector3.Dot(head, dir);*/
	
	return true;
	
}