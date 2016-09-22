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
  console.log("panel initialize");

  // This sends an object to the background page where it can be relayed to the inspected page
  var sendObjectToInspectedPage = function(message) {
    console.log("< panel sending object to inspected page >");
    message.tabId = chrome.devtools.inspectedWindow.tabId;
    chrome.extension.sendMessage(message);
  };

  //Create a port with background page for continous message communication
  console.log("panel setup port");
  var port = chrome.extension.connect({
    name: "Meiosis-Tracer Channel"
  });

  // Listen to messages from the background page
  console.log("panel listen");
  port.onMessage.addListener(function(evt) {
    var data = JSON.parse(evt).message.data;
    var model = data.model;
    var proposal = data.proposal;

    if (data.type === "MEIOSIS_INITIAL_MODEL") {
      console.log("panel MEIOSIS_INITIAL_MODEL:", model);
    }
    else if (data.type === "MEIOSIS_RECEIVE") {
      console.log("panel MEIOSIS_RECEIVE:", model, proposal);
    }
    else {
      console.log("panel received:", evt);
    }
    //document.querySelector("#insertmessagebutton").innerHTML = message.content;
  });
  console.log("panel send request for initial model");
  sendObjectToInspectedPage({ content: { type: "MEIOSIS_REQUEST_INITIAL_MODEL" } });

  // No need to create a component, since this is done at the Meiosis level.
  var createComponent = function() {
  };

  // To re-render the view, send a message.
  var renderRoot = function(model) {
    var tabId = chrome.devtools.inspectedWindow.tabId;
    chrome.extension.sendMessage({ tabId: tabId, content: { model: model } });
  };

  var selector = "#meiosis-tracer";

  var viewProxy = null;

  //window.meiosisTracer(createComponent, renderRoot, selector, viewProxy);

/*
  console.log("panel inject script");
  sendObjectToInspectedPage({action: "script", content: "injected.js"});
*/

})();
