/*global chrome*/

// Creates and maintains the communication channel from the devtools panel to the background script.
// The panel is the page in the devtools tab, containing the Tracer.
//
// Messages are JSON objects
// {
//   action: ["code"|"script"|"message"], // What action to perform on the inspected page
//   content: [String|Path to script|Object], // data to be passed through
//   tabId: [Automatically added]
// }

// This sends an object to the background page where it can be relayed to the inspected page
var sendObjectToInspectedPage = function(message) {
  message.tabId = chrome.devtools.inspectedWindow.tabId
  chrome.extension.sendMessage(message)
}

// Create a port with background page for continous message communication
var port = chrome.extension.connect({
  name: "Meiosis-Tracer Channel"
})

var tracer = null

// Listen to messages from the inspected page, relayed by the background code
port.onMessage.addListener(function(evt) {
  var data = JSON.parse(evt).message.data
  if (data.type === "MEIOSIS_PING") {
    sendObjectToInspectedPage({ content: { type: "MEIOSIS_TRACER_INIT" } })
  }
  else if (data.type === "MEIOSIS_STREAM_LABELS") {
    tracer.receiveLabels(data.value)
  }
  else if (data.type === "MEIOSIS_STREAM_VALUE") {
    tracer.receiveStreamValue(data.index, data.value)
  }
})

// Create the Tracer
var createTracer = function() {
  var sendTracerInit = function() {
    sendObjectToInspectedPage({ content: { type: "MEIOSIS_TRACER_INIT" } })
  }

  var triggerStreamValue = function(index, value) {
    sendObjectToInspectedPage({ content: {
      type: "MEIOSIS_TRIGGER_STREAM_VALUE",
      index: index,
      value: value
    } })
  }

  tracer = window.meiosisTracer({
    selector: "#meiosis-tracer",
    sendTracerInit: sendTracerInit,
    triggerStreamValue: triggerStreamValue
  })
}

// Called when navigating to tab.
chrome.devtools.network.onNavigated.addListener(function() {
  if (tracer) {
    tracer.reset()
  }
  createTracer()
})

// Initially create the tracer.
createTracer()
