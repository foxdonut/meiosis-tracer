/*global chrome*/
var initializeHook = function(window) {
  window.__MEIOSIS_TRACER_DEVTOOLS_GLOBAL_HOOK__ = true;
};

var js = ";(" + initializeHook.toString() + "(window))";

var script = document.createElement("script");
script.textContent = js;
document.documentElement.appendChild(script);
script.parentNode.removeChild(script);

var sendObjectToDevTools = function(message) {
  console.log("injected send object to dev tools:", message);
  chrome.extension.sendMessage(message);
};

window.addEventListener("message", function(evt) {
  console.log("injected received:", evt);
  /*
  if (evt.source != window) {
    return;
  }
  */
  if (evt.data.type === "MEIOSIS_RECEIVE") {
    console.log("-- MEIOSIS_RECEIVE");
    sendObjectToDevTools({data: evt.data});
  }
  else if (evt.data.type === "MEIOSIS_INITIAL_MODEL") {
    console.log("-- MEIOSIS_INITIAL_MODEL");
    sendObjectToDevTools({data: evt.data});
  }
});
console.log("injected added message listener.");

chrome.runtime.onMessage.addListener(function(message) {
  console.log("** injected rcvd message from extension:", message);
  if (message.content.type === "MEIOSIS_REQUEST_INITIAL_MODEL") {
    window.postMessage({ type: "MEIOSIS_REQUEST_INITIAL_MODEL" }, "*");
  }
});

/*
window.postMessage({
  type: "MEIOSIS_RENDER_ROOT",
  model: {
    "store": {
      "form": {
        "todo": {
          "id": "",
          "priority": "1",
          "description": "Chrome extension"
        },
        "validationErrors": {

        }
      },
      "list": {
        "todos": [
          {
            "id": 1,
            "priority": 1,
            "description": "Buy beer"
          }
        ],
        "message": ""
      }
    }
  }
}, "*");
*/
