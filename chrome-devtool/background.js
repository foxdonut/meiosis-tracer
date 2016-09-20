/*global chrome*/
/*
https://developer.chrome.com/extensions/devtools

chrome.extension.onConnect.addListener(function(port) {

  var extensionListener = function(message, sender, sendResponse) {

    if (message.tabId && message.content) {

      if (message.action === "code") {
        chrome.tabs.executeScript(message.tabId, {code: message.content});
      }
      else if (message.action === "script") {
        chrome.tabs.executeScript(message.tabId, {file: message.content});
      }
      else {
        chrome.tabs.sendMessage(message.tabId, message, sendResponse);
      }
    }
    else {
      port.postMessage(JSON.stringify({
        tabId: sender.tab.id,
        message: message
      }));
    }
    sendResponse(message);
  };

  chrome.extension.onMessage.addListener(extensionListener);

  port.onDisconnect.addListener(function(_port) {
    chrome.extension.onMessage.removeListener(extensionListener);
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, _sendResponse) {
  return true;
});
*/
