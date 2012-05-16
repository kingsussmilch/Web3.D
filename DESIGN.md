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

Please note that this is just theory as to where we may head. If a better way appears, we'll take it. 

Basic Overlay:

- data-id - either identifies an overlay or element
- data-unique - attribute that uniquely identifies the element or ? for it's tag name

RDF loading:

- data-src - where src would cause problems, e.g. SPARQL.
- data-query - applies a query to (contained) loaded RDF
- data-pos - 3 CSS positioning measurements defining X, Y, and radius

Processing:

- data-if - checks an expression for truthiness or '!' means else. In loop, an '!' means if empty.
- data-for - repeats content for each item in the expression or the keys can be accessed through '*' and values through '-'.
- data-bind - binds the expression value to the named attributes are element content.
- data-context - defines variables to be used inside the element.
- data-save - defines if/whether the context is saved in localStorage or sessionStorage.

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