/* Web3.D.view.sphere [untested]
*  ()
* 
*  Returns a vector which when it's method multiply scaler is called, creates a sphere.
*
*  Center is 0,0,0 (add it to a group and move the group to change this)
*  and doesn't multiply by scaler to leave the caller capable of doing cool things
*  like a fly out/in effect. 
*  Adding to a group would also allow rotation of what looks like a sphere. 
*
*  If it is needed visually, it may be good to add some logic to the positioning. */

Web3.D.view = {
	sphere : function() {
		var vector = new THREE.Vector3(Math.random() - 0.5,
																	Math.random() - 0.5,
																	Math.random() - 0.5)
		vector.normalize()
		return vector;
	}
}
