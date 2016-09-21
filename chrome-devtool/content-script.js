var initializeHook = function(window) {
  var hook = {};

  hook.setup = function(createComponent, renderRoot) {
    hook.createComponent = createComponent;
    hook.renderRoot = renderRoot;
  };

  window.__MEIOSIS_TRACER_DEVTOOLS_GLOBAL_HOOK__ = hook;
};

var js = ";(" + initializeHook.toString() + "(window))";

var script = document.createElement("script");
script.textContent = js;
document.documentElement.appendChild(script);
script.parentNode.removeChild(script);
