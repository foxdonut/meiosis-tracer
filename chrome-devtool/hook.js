var ts = function() { return new Date().toISOString().substring(11); }
console.log(ts(), "initializeHook from hook.js");
var initializeHook = function(window) {
  window.__MEIOSIS_TRACER_DEVTOOLS_GLOBAL_HOOK__ = true;
};

var js = ";(" + initializeHook.toString() + "(window))";

var script = document.createElement("script");
script.textContent = js;
document.documentElement.appendChild(script);
script.parentNode.removeChild(script);
console.log(ts(), "- done");