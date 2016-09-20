/*global chrome*/
// Credit: https://github.com/thingsinjars/devtools-extension
// This sends an object to the background page where it can be relayed to the inspected page
var sendObjectToInspectedPage = function(message) {
  message.tabId = chrome.devtools.inspectedWindow.tabId;
  chrome.extension.sendMessage(message);
};

// window.meiosisTracer !== undefined

document.querySelector("#executescript").addEventListener("click", function() {
  sendObjectToInspectedPage({action: "code", content: "console.log('Inline script executed')"});
}, false);

document.querySelector("#insertscript").addEventListener("click", function() {
  sendObjectToInspectedPage({action: "script", content: "inserted-script.js"});
}, false);

document.querySelector("#insertmessagebutton").addEventListener("click", function() {
  sendObjectToInspectedPage({action: "code", content: "document.body.innerHTML='<button>Send message to DevTools</button>'"});
  sendObjectToInspectedPage({action: "script", content: "messageback-script.js"});
}, false);
