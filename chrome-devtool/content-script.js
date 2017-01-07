/*global chrome*/
var sendObjectToDevTools = function(message) {
  chrome.extension.sendMessage(message);
};

window.addEventListener("message", function(evt) {
  if (evt.source != window) {
    return;
  }
  if (evt.data.type === "MEIOSIS_VALUES") {
    sendObjectToDevTools({data: evt.data});
  }
});

chrome.runtime.onMessage.addListener(function(message) {
  if (message.content.type === "MEIOSIS_TRACER_INIT") {
    window.postMessage({ type: "MEIOSIS_TRACER_INIT" }, "*");
  }
  else if (message.content.type === "MEIOSIS_RENDER_MODEL") {
    window.postMessage({ type: "MEIOSIS_RENDER_MODEL", model: message.content.model }, "*");
  }
});
