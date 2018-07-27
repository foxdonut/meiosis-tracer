/*global chrome*/

// Script for the inspected page.
// Sets the tracer indicator to true.
// Listens for incoming messages and sends them to the dev tool.
// Listens for outgoing messages and sends them to the inspected page.

// Set the hook on the inspected page
var initializeHook = function(window) {
  window.__MEIOSIS_TRACER_GLOBAL_HOOK__ = true
}

var js = ";(" + initializeHook.toString() + "(window))"

var script = document.createElement("script")
script.textContent = js
document.documentElement.appendChild(script)
script.parentNode.removeChild(script)

var sendObjectToDevTools = function(message) {
  chrome.extension.sendMessage(message)
}

// Messages received from the inspected page
window.addEventListener("message", function(evt) {
  if (evt.source != window) {
    return
  }
  if (evt.data.type === "MEIOSIS_PING" ||
      evt.data.type === "MEIOSIS_STREAM_LABELS" ||
      evt.data.type === "MEIOSIS_STREAM_VALUE")
  {
    sendObjectToDevTools({data: evt.data})
  }
})

// Messages received from the devtools page, here sent on to the inspected page
chrome.runtime.onMessage.addListener(function(message) {
  if (message.content.type === "MEIOSIS_TRACER_INIT") {
    window.postMessage({ type: "MEIOSIS_TRACER_INIT" }, "*")
  }
  else if (message.content.type === "MEIOSIS_TRIGGER_STREAM_VALUE") {
    window.postMessage({ type: "MEIOSIS_TRIGGER_STREAM_VALUE",
      index: message.content.index, value: message.content.value }, "*")
  }
})
