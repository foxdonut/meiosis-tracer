var initializeHook = function(window) {
  window["__MEIOSIS_TRACER_DEVTOOLS_GLOBAL_HOOK__"] = function(createComponent, renderRoot) {
    window["__MEIOSIS_TRACER_DEVTOOLS_GLOBAL_HOOK__"].createComponent = createComponent;
    window["__MEIOSIS_TRACER_DEVTOOLS_GLOBAL_HOOK__"].renderRoot = renderRoot;
  };
};

var js = ";(" + initializeHook.toString() + "(window))";

var script = document.createElement("script");
script.textContent = js;
document.documentElement.appendChild(script);
script.parentNode.removeChild(script);
