/* Web3.D.Scene
*  class which abstracts upon generic THREE.js scene setup. Provides:
*  - smart selection of a WebGL/Canvas/SVG renderer 
*  - basic camera and lighting setup 
*  - mouse, touch, and drag events forwarding (unimplemented)
*  - "ontick" callbacks
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
var events = [
	'click', 'dblclick', 'mousedown', 'mousemove', 'mouseup', // mouse
	'dragstart', 'dragenter', 'dragover', 'dragleave', 'drag', 'drop', 'dragend', // drag&drop
	'touchstart', 'touchmove', 'touchend', 'touchcanceled'// touch events
]

Web3.D.Scene = function(WIDTH, HEIGHT) {
	var VIEW_ANGLE = 45,
		ASPECT = WIDTH / HEIGHT,
		NEAR = 0.1,
		FAR = 10000

	/* raytracer */
	var projector = new THREE.Projector(),
	active = registerMethod('on')
	this.register = active.pop()

	function raytrace(pos) {
		var box = renderer.domElement.getBoundingClientRect(),
		width = box.right - box.left, 
		height = box.bottom - box.top,

		vector = new THREE.Vector3( ( pos.x/width ) * 2 - 1, - ( pos.y / height ) * 2 + 1, 0.5 )
		projector.unprojectVector( vector, camera )

		var ray = new THREE.Ray( camera.position, vector.subSelf( camera.position ).normalize() ),
		intersects = ray.intersectObjects( active )

		if (intersects.length) return intersects[0]
		else return
	}

	/* Camera! */
	// renderer
	var renderer = new
		(Modernizr.webgl ? THREE.WebGLRenderer :
		Modernizr.canvas ? THREE.CanvasRenderer :
		Modernizr.inlinesvg ? THREE.SVGRenderer : 
		Boolean)()
	if (!renderer) return // unsupported, new Boolean() returns false

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
	// events
	function onEvent(event) {
		event.preventDefault()

		var x = event.clientX,
		y = event.clientY,
		object = raytrace(new THREE.Vector2(x, y))

		if (object) object.on[event.type](event)
	}

	var eventMethod = this.domElement.addEventListener ? 'addEventListener' : 'attachEvent' // IE, grumble
	foreach(events, function() {
		renderer.domElement[eventMethod](this, onEvent, false)
	})

	// TODO: simulate mouse in/out events via mousemove, normal event forwarding not working yet

	// ontick events
	var ontick = registerMethod()
	this.ontick = ontick.pop()

	// animation loop
	function animLoop() {
		requestAnimationFrame(animLoop)

		foreach(ontick)

		renderer.render(scene, camera)
	}
	requestAnimationFrame(animLoop)
}

// Internal utilities - forloop wrapper and register method generator
function foreach(array, cb) {
	var i = array.length
	if (cb === undefined) cb = function() {this()}

	while (i--) cb.call(array[i], array[i])
}

function registerMethod(prop) {
	/* register/unregister method, why can't Array have a remove method like Python? */
	function register(obj, val) {
		array.push(obj)
		obj[prop] = val // so register can set the on property

		return function() {
			idx = array.indexOf(obj)
			if (idx != -1) array.splice(idx, 1)
		}
	}

	var array = [register]
	return array
}
})();
