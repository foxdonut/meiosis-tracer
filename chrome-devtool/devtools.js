/*global chrome*/
chrome.devtools.panels.create("Meiosis", "meiosis.png", "panel.html", function (_panel) {})

/*

panel.html is the HTML page for the extension. It loads meiosis-tracer.js and panel.js.

panel.js creates the tracer and places it into the panel.html page.

it communicates with background.js with messages:

- background sends PING, panel answers TRACER_INIT.
- background sends STREAM_OPTIONS and STREAM_VALUE, which panel receives and
  updates the tracer accordingly.
- panel sends TRIGGER_STREAM_VALUE.

background.js is the communication channel between panel.js and content-script.js.

- it evaluates code and scripts from the inspected page.
- it sends messages from content-script.js to panel.js: PING, STREAM_OPTIONS, and STREAM_VALUE
- it sends messages from panel.js to content-script.js: TRACER_INIT, TRIGGER_STREAM_VALUE

content-script.js communicates between the inspected page and background.js.

- it sets window.__MEIOSIS_TRACER_GLOBAL_HOOK__ = true
- it listens for messages from the inspected page and sends them to background.js:
  PING, STREAM_OPTIONS, and STREAM_VALUE
- it listens for messages from background.js and sends them to the inspected page:
  TRACER_INIT, TRIGGER_STREAM_VALUE

*/
