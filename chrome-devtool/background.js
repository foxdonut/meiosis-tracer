/*global chrome*/

// Manages and relays messages between the panel and the inspected page.

chrome.extension.onConnect.addListener(function(port) {
  var extensionListener = function(message, sender, sendResponse) {
    if (message.tabId && message.content) {
      // Evaluate script in inspectedPage
      if (message.action === "code") {
        chrome.tabs.executeScript(message.tabId, { code: message.content })
      }
      // Attach script to inspectedPage
      else if (message.action === "script") {
        chrome.tabs.executeScript(message.tabId, { file: message.content })
      }
      // Pass message to inspectedPage
      else {
        chrome.tabs.sendMessage(message.tabId, message, sendResponse)
      }
    }
    // Accept message from inspectedPage and send it to the panel
    else {
      port.postMessage(JSON.stringify({
        tabId: sender.tab.id,
        message: message
      }))
    }
    sendResponse(message)
  }

  // Listen to messages sent from the panel
  chrome.extension.onMessage.addListener(extensionListener)

  port.onDisconnect.addListener(function(_port) {
    chrome.extension.onMessage.removeListener(extensionListener)
  })
})

chrome.runtime.onMessage.addListener(function(_request, _sender, _sendResponse) {
  return true
})
