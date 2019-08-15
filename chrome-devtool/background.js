/*global chrome*/

// Create a port to send messages to content-script.js

// Establishes a connection and relays messages between panel.js and content-script.js
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.tabId && message.content) {
    // Evaluate script in inspectedPage
    if (message.action === "code") {
      chrome.tabs.executeScript(message.tabId, { code: message.content })
    }
    // Attach script to inspectedPage
    else if (message.action === "script") {
      chrome.tabs.executeScript(message.tabId, { file: message.content })
    }
    // Send message to content-script.js
    else {
      chrome.tabs.sendMessage(message.tabId, message)
    }
  }
  // Accept message from content-script.js and send it to panel.js
  else {
    sendResponse({
      tabId: sender.tab.id,
      message: message
    })
  }
})
