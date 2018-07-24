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
  message.tabId = chrome.devtools.inspectedWindow.tabId
  chrome.extension.sendMessage(message)
}

//Create a port with background page for continous message communication
var port = chrome.extension.connect({
  name: "Meiosis-Tracer Channel"
})

var tracer = null

// Listen to messages from the background page
port.onMessage.addListener(function(evt) {
  var data = JSON.parse(evt).message.data
  if (data.type === "MEIOSIS_PING") {
    sendObjectToInspectedPage({ content: { type: "MEIOSIS_TRACER_INIT" } })
  }
  else if (data.type === "MEIOSIS_VALUES") {
    tracer.receiveValues(data.values, data.update)
  }
  else if (data.type === "MEIOSIS_STREAM_IDS") {
    tracer.initStreamIdModel(data.streamIds)
  }
  else if (data.type === "MEIOSIS_STREAM_VALUE") {
    tracer.receiveStreamValue(data.streamId, data.value)
  }
})

var createTracer = function() {
  var renderModel = function(model, sendValuesBack) {
    sendObjectToInspectedPage({ content: {
      type: "MEIOSIS_RENDER_MODEL",
      model: model,
      sendValuesBack: sendValuesBack
    } })
  }
  var triggerStreamValue = function(streamId, value) {
    sendObjectToInspectedPage({ content: {
      type: "MEIOSIS_TRIGGER_STREAM_VALUE",
      streamId: streamId,
      value: value
    } })
  }

  tracer = window.meiosisTracer({
    selector: "#meiosis-tracer",
    renderModel: renderModel,
    triggerStreamValue: triggerStreamValue,
    horizontal: true
  })
  sendObjectToInspectedPage({ content: { type: "MEIOSIS_TRACER_INIT" } })
}

chrome.devtools.network.onNavigated.addListener(function() {
  if (tracer) {
    tracer.reset()
  }
  createTracer()
})
createTracer()
