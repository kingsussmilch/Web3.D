/* Web3.D.Scene
*  class which abstracts upon generic THREE.js scene setup. Provides:
*  - smart selection of a WebGL/Canvas/SVG renderer
*  - basic camera and lighting setup
*  - mouse, touch, and drag events forwarding
*  - "ontick" callbacks
*
*  Dependancies:
*  - Three.js
*  - Modernizr
*
*  Properties:
*  - THREE.Scene scene - exposed for adding 3D objects to.
*  - domElement - exposed to add to the DOM.
*
*  Methods:
*  - register(THREE.Object3D object) -> function() which unregisters the object
*  - ontick(function cb) -> function() which unbinds cb
*/
(function() {
Web3.D.Scene = function() {
}

// Internal utilities - forloop wrapper and register method generator

});
