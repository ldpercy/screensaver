Task
====



Bugs
----
* There's some sort of bug in color-scheme switching in chr - some elements are updating but not others; not sure what's causing it yet

Todo
----

* Savers that include style setting presets
* Option to auto pause all/most animations when the page loses focus (document.visibilityState / document.visibilityChange)
* Add global settings for interval and transition timing
* Seeded random numbers
* Separate fill/stroke animations for different elements
* Move grid out of main svg screensaver element
* Have random point selection reactive to the bounding boxes of already-present elements
* 3d warps and rotates for the main screeensaver drawing area, even multiiple drawing areas
* Colour-cycling for elements
* Option to hide the ui forms while playing
* Add step-through animation button
* Save playing/paused animation state in storage so it persists between reloads
* Add some sort of settings export to save as presets
* Figure out a way to close bezier curves smoothly
* Figure out how to manually stop/start key-frame animations
* Preserve settings on module change, so changing back takes you to the previous state rather than defaults
* Just about exhausted stroke animation ideas, try other path techniques such as text
* A base main-loop delay setting
* Need to figure out the size of the current view port (?terminology) to use for random inputs (nb using vw and vh units kinda works but sometimes doesn't animate/transition)
* Figure out how to abstract movement styles
* Movement based on fixed space/grid or the viewport space
* some movements aren't animating in firefox
* html-only screensavers (non-svg), & hybrid html>svg / svg>html
* shared/common properties between screensavers



In progress
-----------
* Styling group elements with sibling-index() & sibling-count() -
  * not in ff yet so have added some properties to simulate
  * Add option to turn on/off the sibling colour divisions
* Non-black dark background to help some of blend-modes.
  * Have added this, but still questions about where exactly blend-mode needs to be applied;
  * also some rendering diffs between ff and chr for these.


Done
----
* Fixed the dumb code in the line movers
* Add state indication to the play/pause button
* Add stroke colour and opacity settings
* Separate dash & animate switches
* Add info dialog
* Scheme switching back online
