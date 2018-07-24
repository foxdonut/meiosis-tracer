/*global chrome*/
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

window.addEventListener("message", function(evt) {
  if (evt.source != window) {
    return
  }
  if (evt.data.type === "MEIOSIS_PING" ||
      evt.data.type === "MEIOSIS_VALUES" ||
      evt.data.type === "MEIOSIS_STREAM_IDS" ||
      evt.data.type === "MEIOSIS_STREAM_VALUE")
  {
    sendObjectToDevTools({data: evt.data})
  }
})

chrome.runtime.onMessage.addListener(function(message) {
  if (message.content.type === "MEIOSIS_TRACER_INIT") {
    window.postMessage({ type: "MEIOSIS_TRACER_INIT" }, "*")
  }
  else if (message.content.type === "MEIOSIS_RENDER_MODEL") {
    window.postMessage({ type: "MEIOSIS_RENDER_MODEL",
      model: message.content.model, sendValuesBack: message.content.sendValuesBack }, "*")
  }
  else if (message.content.type === "MEIOSIS_TRIGGER_STREAM_VALUE") {
    window.postMessage({ type: "MEIOSIS_TRIGGER_STREAM_VALUE",
      streamId: message.content.streamId, value: message.content.value }, "*")
  }
})
