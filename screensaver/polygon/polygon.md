Polygon
=======


https://en.wikipedia.org/wiki/Star_polygon
https://en.wikipedia.org/wiki/Winding_number#Turning_number
https://en.wikipedia.org/wiki/Schl%C3%A4fli_symbol


https://css-tricks.com/mastering-svgs-stroke-miterlimit-attribute/



Todo
----
* Consider whether this should be split out into it's own repo
* Add url parameters so specific polygons can be sent to friends
* Or some preset examples
* Add linejoin/linecap settings
* Add setting/param to turn off the ui (inc grid)
* Figure out what on earth is going on with the markers
* Save/export with settings
* Save settings in localStorage
* Animation presets??


Setting order of precedence
---------------------------

This problem exists in one form or another for all of the apps.
The answer might be a little different per-app as well, depending on how things are wanted to work.

Some early notes on this topic in [year-clock](<../../../year-clock/task/2.🐁Δ - small updates.md>).

* URL parameters
* localStorage settings
* session storage settings
* current form settings

Firefox helpfully restores current form settings on page reload, whereas chrome does not.
To allow for different tabs with different settings, current form settings should probably be stored in sessionStorage.





Relative coordinates
--------------------

I think I'll need this sometimes, so going to try a version that uses all(mostly) lower case (relative) path directives.
Might be a bit tricker.


Angles/lengths
--------------

It would be handy if there was an easy way of figuring out things like angles and lengths...

https://en.wikipedia.org/wiki/Internal_and_external_angles




Download / save
---------------

Just trying this out as an experiment to see how the event works, and what about it can be controlled.

Not working yet, current try:
```js
	const url = new URL(`data:text/plain;utf8,${polygonSvg}`);
	this.element.saveLink.href = url.toString();
```
Trying this sort out url escaping, but still failing.
I might be running into URL length limits or something - not sure yet.
Time for some research.

I have a version working now with simpler re-built svg output.
The download href does *not* like hashes - see if they can be escaped.

* Encoding hashes with `%23` will work

Need a proper refresher on URL escaping to get this right for all the reserved chars that might appear.


Ant-crawl animation
-------------------

Added this for fun.

For some reason it's really cpu-expensive in firefox (on my desktop at least).
Not too bad in Chromium though.

Have added a switch to turn it off.

