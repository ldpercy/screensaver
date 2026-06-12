Swarm of motes
==============

New 'swarm of motes' module based on some example code.


```
2026-06-09		⋰⋱🪰		new task
```


Found this bit of code a while back:
https://developer.mozilla.org/en-US/docs/Web/SVG/Guides/Namespaces_crash_course/Example

Had done a quick go of it in html-experiment, but wanted to bring it in here where I can dress it up a bit.

Already have it starting to work, but there's a few things that need sorting out.


* Code cleanup & make more conventional; add types etc
* Figure out the magic numbers & see if they need to be scaled at all
* Update frequency is a main problem



Form validation
---------------

Getting bugs with some settings.
This is a bit of a sidetrack, but worth stopping and getting it right.

At the moment any form change, even one that puts the form into an invalid state, will "succeed".
Need to figure out a way to prevent invalid changes from propagating.

* Store a last good state?
* Actually prevent invalid input settings, eg automatically revert to last good val?



