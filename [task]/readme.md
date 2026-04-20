Task
====



Bugs
----
* `chrome` There's some sort of bug in color-scheme switching in chr - some elements are updating but not others; not sure what's causing it yet
* `firefox` sometimes movements aren't animating in firefox - adding more elements actually sometimes helps, it might discard an animation it can't compute in time???


Todo
----

* `app` get testing mode going properly
* `bezier` show control points and lines
* `css` Style overrides with custom stylesheets
* `ff` if selected, dash animations still run even if stroke-dash is off - need to add this to pause
* `module` screen savers that include style setting presets
* `app` Option to auto pause all/most animations when the page loses focus (document.visibilityState / document.visibilityChange)
* `app` Add global settings for interval and transition timing
* `maths/js` Seeded random numbers
* Separate fill/stroke animations for different elements
* `layout` Move grid out of main svg screensaver element
* Have random point selection reactive to the bounding boxes of already-present elements
* 3d warps and rotates for the main screeensaver drawing area, even multiiple drawing areas
* `css` Colour-cycling for elements
* `ui` Option to hide the ui forms while playing
* `app` Save playing/paused animation state in storage so it persists between reloads
* `app` Add some sort of settings export to save as presets
* `css` Figure out how to manually stop/start key-frame animations
* `app` Preserve settings on module change, so changing back takes you to the previous state rather than defaults
* Just about exhausted stroke animation ideas, try other path techniques such as text
* `app` A base main-loop delay setting
* `svg` Need to figure out the size of the current view port (?terminology) to use for random inputs (nb using vw and vh units kinda works but sometimes doesn't animate/transition)
* Figure out how to abstract movement styles
* Movement based on fixed space/grid or the viewport space
* `module` html-only screensavers (non-svg), & hybrid html>svg / svg>html
* `app` shared/common properties between screensavers



In progress
-----------
* `bezier` Figure out a way to close bezier curves smoothly
* `css` styling group elements with sibling-index() & sibling-count() -
  * not in ff yet so have added some properties to simulate
  * Add option to turn on/off the sibling colour divisions
* Non-black dark background to help some of blend-modes.
  * Have added this, but still questions about where exactly blend-mode needs to be applied;
  * also some rendering diffs between ff and chr for these.


Done
----
* Added kbd `.` to step though one update at a time
* Fixed the dumb code in the line movers
* Add state indication to the play/pause button
* Add stroke colour and opacity settings
* Separate dash & animate switches
* Add info dialog
* Scheme switching back online
