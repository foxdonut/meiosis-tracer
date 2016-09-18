//(function(window) {
  // var MEIOSIS_TRACER_INIT = false;

  function initializeHook(window) {
    console.log("initializing hook...");
    Object.defineProperty(window, "__MEIOSIS_TRACER_DEVTOOLS_GLOBAL_HOOK__", {
      callMe: function(createComponent, renderRoot) {
        console.log("Thanks for call me!", createComponent, renderRoot);
      }
    });
    console.log("...initialized");
  }

  var js = ";(" + initializeHook.toString() + "(window))";

  // This script runs before the <head> element is created, so we add the script
  // to <html> instead.
  var script = document.createElement("script");
  script.textContent = js;
  document.documentElement.appendChild(script);
  script.parentNode.removeChild(script);

/*
  var initialized = function(event) {

    if (MEIOSIS_TRACER_INIT) {
      chrome.extension.sendMessage(event.detail);
      return;
    }

    MEIOSIS_TRACER_INIT = true;

    chrome.extension.sendMessage(event.detail);

    var update = function(event) {
      if (!event.detail) {
        throw new Error("You have to pass a serializeable object to a signal. Did you pass a mouse event maybe?");
      }
      try {
        chrome.extension.sendMessage(event.detail);
      }
      catch (e) {
        window.removeEventListener("meiosis.dev.update", update);
        window.removeEventListener("meiosis.dev.initialized", initialized);
      }
    };
    window.addEventListener("meiosis.dev.update", update);
  };
  window.addEventListener("meiosis.dev.meiosisPong", initialized);
  window.addEventListener("meiosis.dev.meiosisPing", function() {
    var event = new Event("meiosis.dev.debuggerPing");
    window.dispatchEvent(event);
  });

  var event = new Event("meiosis.dev.debuggerPing");
  window.dispatchEvent(event);
*/
//}(window));
