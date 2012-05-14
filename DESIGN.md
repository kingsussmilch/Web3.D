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
