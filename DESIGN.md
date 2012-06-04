Web3.D Software Architecture
============================

This document was created to give a sense of where the project is headed, and was arrived to after heavy planning. 

Goals
-----

- Be greatly customizable and flexible - we don't know how this will be used. 

To:

- Allow integration and defination of "chrome".
- Load RDF resources both generally and in "sections"
- Define visual and networking optimizations on RDF graphs
- Provide styling capabilities.


Design Overview
---------------

Mozilla Firefox has already defined a system with great customizability, flexibility, and easy integration of new chrome: XUL. I suggest that Web3.D uses HTML5 markup to define a simalor overlay system to Gecko inside an ID'd div. This exposes DOM for CSS styling of the chrome.

From here, I'd suggest using script tags to load in the RDF graph. These script tags could be wrapped in div and section (for individual visual groups) tags which can define a SPARQL filter. 

The content of these scripts would be loaded into an antoniogarrote/rdfstore-js (has already implemented all the loading we need) RDF Store and then rendered using mrdoob/three.js (which includes multiple rendering methods for what's available and as a nice 2D sprites in a 3D globe demo) in their sections (designated by such tags) in 3D. 

This system:

- reuses existing code in the browser, Three.js, and RDFStore.js
- can be easily read by the server-side to offer a NoJS version
- very familiar to web designers as it uses HTML5 and CSS

	- it's even extensible and stylable using such technologies.

And so achieves everything we need it to. 

Design Usage
------------

Web3.D would include for built in overlays:

- search

  - form (we'll use a field-based search control for greater precision)
  - list (to enable search mashups)
  - word globe (for less precise searches, visual improvement of word cloud e.g. quintura.com)

- focus (when a page is focused)
- views (for new perspectives)

  - sphere
  - stack

- i18n (slight extension allows this important feature)

Most of these require processing, so include that I the overlay system. 

API
---

Such a system can be built by combining http://disruptive-innovations.com/zoo/20040830/HTMLoverlays.html and http://ejohn.org/blog/javascript-micro-templating/.

Immediate Plans
---------------

For now, we don't need to implement the overlay system, but a 3D and RDF engine. These can be built ontop of the mentioned
Three.js and RDFStore JavaScript APIs. Modernizr can also be used to decide which Three.js renderer to use and adapt to 
touch interfaces (by removing mouse controls and load inertial scrolling code). 

When we need to add search and the alternative views, we can implement the overlay system. 

3D Engine Requirements
----------------------

In order to render 3D groupings/spheres, the engine will need to over Three.js and RDFStore:

- *Forward touch, mouse, and drag events to 3D objects, and add tooltips.*
- Inclusion of 2D text (3D would get heavy). 
- Abstraction upon the Three.js scene with degradation. 
- Index of objects representing RDF resources. 

- Oh, and including video features would be COOL.

From the underlying engines, we get:

- Three.js (nice demo at: http://mrdoob.github.com/three.js/examples/webgl_sprites.html)
	- Lines and Sprites
 	- Canvas and SVG rendering as well as WebGL
  	- Vector mathematics
	- Rotatable groups
 	- Ray tracing
- RDFStore
	- laoding and querying of RDF data
	- (Perhaps it supports remote querying, need to check)

A simple wrapper class and utility function should implement all we need to.