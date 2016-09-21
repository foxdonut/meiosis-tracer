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

(function createChannel() {
  //Create a port with background page for continous message communication
  var port = chrome.extension.connect({
    name: "Meiosis-Tracer Channel"
  });

  // Listen to messages from the background page
  port.onMessage.addListener(function(_message) {
    //document.querySelector("#insertmessagebutton").innerHTML = message.content;
  });
}());
