/* Web3.D.Scene
*  class which abstracts upon generic THREE.js scene setup. Provides:
*  - smart selection of a WebGL/Canvas/SVG renderer 
*  - basic camera and lighting setup 
*  - mouse, touch, and drag events forwarding (unimplemented)
*  - "ontick" callbacks (unimplemented)
*
*  Code roughly follows the tutorial @ http://www.aerotwist.com/tutorials/getting-started-with-three-js/
*
*  Dependancies:
*  - Three.js
*  - Modernizr
*
*  Properties:
*  - THREE.Scene scene - exposed for adding 3D objects to. 
*  - domElement - exposed to add to the DOM. 
*
*  Methods: (unimplemented)
*  - register(THREE.Object3D object) -> function() which unregisters the object
*  - ontick(function cb) -> function() which unbinds cb
*/
(function() {
Web3.D.Scene = function(WIDTH, HEIGHT) {
	var VIEW_ANGLE = 45,
		ASPECT = WIDTH / HEIGHT,
		NEAR = 0.1,
		FAR = 10000

	/* Camera! */
	// renderer
	var renderer = new
		(Modernizr.webgl ? THREE.WebGLRenderer :
		Modernizr.canvas ? THREE.CanvasRenderer :
		Modernizr.inlinesvg ? THREE.SVGRenderer : 
		function() {return false})()
	if (renderer === false) return // unsupported

	renderer.setSize(WIDTH, HEIGHT)
	this.domElement = renderer.domElement // EXPOSE

	// scene
	var scene = new THREE.Scene()
	this.scene = scene // EXPOSE

	// camera
	var camera = new THREE.PerspectiveCamera(
		VIEW_ANGLE,
		ASPECT,
		NEAR,
		FAR)
	scene.add(camera)
	camera.position.z = 300

	/* Lights! */
	var pointLight = new THREE.PointLight(0xFFFFFF)

	pointLight.position.x = 10
	pointLight.position.y = 50
	pointLight.position.z = 130

	scene.add(pointLight)

	/* Action! */
	function animLoop() {
		requestAnimationFrame(animLoop)
		renderer.render(scene, camera)
	}
	requestAnimationFrame(animLoop)
}

// Internal utilities - forloop wrapper and register method generator

})();
