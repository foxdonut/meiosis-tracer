/*global chrome*/
// Credit: https://github.com/thingsinjars/devtools-extension

// This creates and maintains the communication channel between the inspectedPage and the dev tools panel.
//
// In this example, messages are JSON objects
// {
//   action: ["code"|"script"|"message"], // What action to perform on the inspected page
//   content: [String|Path to script|Object], // data to be passed through
//   tabId: [Automatically added]
// }
(function() {
  // This sends an object to the background page where it can be relayed to the inspected page
  var sendObjectToInspectedPage = function(message) {
    message.tabId = chrome.devtools.inspectedWindow.tabId;
    chrome.extension.sendMessage(message);
  };

  //Create a port with background page for continous message communication
  var port = chrome.extension.connect({
    name: "Meiosis-Tracer Channel"
  });

  var receive = null;

  // Listen to messages from the background page
  port.onMessage.addListener(function(evt) {
    var data = JSON.parse(evt).message.data;
    var model = data.model;
    var proposal = data.proposal;

    if (data.type === "MEIOSIS_INITIAL_MODEL") {
      var createComponent = function(config) {
        receive = config.receive;
      };

      // To re-render the view, send a message.
      var renderRoot = function(model) {
        sendObjectToInspectedPage({ content: { type: "MEIOSIS_RENDER_ROOT", model: model } });
      };
      renderRoot.initialModel = model;

      var selector = "#meiosis-tracer";

      var viewProxy = null;

      window.meiosisTracer(createComponent, renderRoot, selector, viewProxy);
    }
    else if (data.type === "MEIOSIS_RECEIVE" && receive) {
      receive(model, proposal);
    }
  });
  sendObjectToInspectedPage({ content: { type: "MEIOSIS_REQUEST_INITIAL_MODEL" } });
})();
