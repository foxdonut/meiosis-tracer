/*global chrome*/
var sendObjectToDevTools = function(message) {
  chrome.extension.sendMessage(message);
};

console.log("window:", window)
console.log("cc:", window.__MEIOSIS_TRACER_DEVTOOLS_GLOBAL_HOOK__);
document.body.innerHTML = "<div>WHACK<div>";
