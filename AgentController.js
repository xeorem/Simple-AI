public var speed:float = 5;
public var rotateSpeed:float = 5;

function Update () {
	var controller:CharacterController = gameObject.GetComponent(CharacterController);
	
	/* rotate around y-axis */
	gameObject.transform.Rotate(0, Input.GetAxis("Horizontal") * rotateSpeed, 0);
	
	/* move forward/backward */
	
	var forward:Vector3 = transform.TransformDirection(Vector3.forward);
	var currentSpeed:float = speed * Input.GetAxis("Vertical");
	controller.SimpleMove(forward * currentSpeed);
	
	/* set appropriate animation */
	var anim:Animation = gameObject.GetComponent(Animation);
	if(currentSpeed != 0) anim.Play("run");
	else anim.Play("idle");
}