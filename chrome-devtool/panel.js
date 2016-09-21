/*global chrome*/
// Credit: https://github.com/thingsinjars/devtools-extension
// This sends an object to the background page where it can be relayed to the inspected page
var sendObjectToInspectedPage = function(message) {
  message.tabId = chrome.devtools.inspectedWindow.tabId;
  chrome.extension.sendMessage(message);
};

// window.meiosisTracer !== undefined

document.querySelector("#startbutton").addEventListener("click", function() {
  sendObjectToInspectedPage({action: "script", content: "injected.js"});
}, false);
