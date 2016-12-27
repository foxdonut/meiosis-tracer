/*global chrome*/

// This creates and maintains the communication channel between the inspectedPage and the dev tools panel.
//
// In this example, messages are JSON objects
// {
//   action: ["code"|"script"|"message"], // What action to perform on the inspected page
//   content: [String|Path to script|Object], // data to be passed through
//   tabId: [Automatically added]
// }

// This sends an object to the background page where it can be relayed to the inspected page
var sendObjectToInspectedPage = function(message) {
  message.tabId = chrome.devtools.inspectedWindow.tabId;
  chrome.extension.sendMessage(message);
};

//Create a port with background page for continous message communication
var port = chrome.extension.connect({
  name: "Meiosis-Tracer Channel"
});

var tracer = null;
var receive = null;
var resolves = {};

// Listen to messages from the background page
port.onMessage.addListener(function(evt) {
  var data = JSON.parse(evt).message.data;
  var model = data.model;
  var proposal = data.proposal;

  if (data.type === "MEIOSIS_INITIAL_MODEL") {
    // To re-render the view, send a message.
    var render = function(state) {
      sendObjectToInspectedPage({ content: { type: "MEIOSIS_RENDER_ROOT", state: state } });
    };

    // To obtain the state, send a message.
    var state = function(model) {
      var ts = "ts_" + String(new Date().getTime());
      sendObjectToInspectedPage({ content: { type: "MEIOSIS_REQUEST_STATE", model: model, ts: ts } });
      return new Promise(function(res) {
        resolves[ts] = res;
      });
    };

    tracer = window.meiosisTracer({ selector: "#meiosis-tracer", render: render, initialModel: model, horizontal: true });
    receive = tracer.component.receive;
    tracer.setStateFn(state);
  }
  else if (data.type === "MEIOSIS_RECEIVE" && receive) {
    receive(model, proposal);
  }
  else if (data.type === "MEIOSIS_STATE") {
    var resolve = resolves[data.ts];
    if (typeof resolve === "function") {
      resolve(data.state);
      delete resolves[data.ts];
    }
  }
});

chrome.devtools.network.onNavigated.addListener(function() {
  if (tracer) {
    tracer.reset();
  }
  sendObjectToInspectedPage({ content: { type: "MEIOSIS_REQUEST_INITIAL_MODEL" } });
});
sendObjectToInspectedPage({ content: { type: "MEIOSIS_REQUEST_INITIAL_MODEL" } });
