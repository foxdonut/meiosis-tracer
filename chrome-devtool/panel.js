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

var sendMessageToBackground = function (message) {
  message.tabId = chrome.devtools.inspectedWindow.tabId
  chrome.runtime.sendMessage(message)
}

var tracer = null

// Listen to messages from background.js and answer them
chrome.runtime.onMessage.addListener(function (request, _sender, _sendResponse) {
  var data = request.data
  if (data) {
    if (data.type === "MEIOSIS_PING") {
      sendMessageToBackground({ content: { type: "MEIOSIS_TRACER_INIT" } })
      // sendResponse({ content: { type: "MEIOSIS_TRACER_INIT" } })
    } else if (data.type === "MEIOSIS_STREAM_OPTIONS") {
      tracer.receiveStreamOptions(data.value)
    } else if (data.type === "MEIOSIS_STREAM_VALUE") {
      tracer.receiveStreamValue(data.index, data.value)
    }
  }
})

// Create the Tracer
var createTracer = function () {
  var sendTracerInit = function () {
    sendMessageToBackground({ content: { type: "MEIOSIS_TRACER_INIT" } })
  }

  var triggerStreamValue = function (index, value) {
    sendMessageToBackground({
      content: {
        type: "MEIOSIS_TRIGGER_STREAM_VALUE",
        index: index,
        value: value
      }
    })
  }

  tracer = window.meiosisTracer({
    selector: "#meiosis-tracer",
    sendTracerInit: sendTracerInit,
    triggerStreamValue: triggerStreamValue,
    direction: "auto",
    theme: chrome.devtools.panels.themeName
  })
}

// Called when navigating to tab or reloading the tab.
chrome.devtools.network.onNavigated.addListener(function () {
  createTracer()
})

// Initially create the tracer.
createTracer()
