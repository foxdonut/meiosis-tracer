/*global chrome*/
var sendObjectToDevTools = function(message) {
  chrome.extension.sendMessage(message);
};

window.addEventListener("message", function(message) {
  console.log("received message:", message);
  sendObjectToDevTools(message);
});

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
console.log("injected script has executed");
