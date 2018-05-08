(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["meiosisTracer"] = factory();
	else
		root["meiosisTracer"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _meiosisTracer = __webpack_require__(/*! ./meiosis-tracer */ "./src/meiosis-tracer.js");

/*
1. Live change
- receive values from meiosis with update=true. This will add to the tracer's history
  and increase the slider max.
- re-render the tracer view with update=true.

2. Time-travel change
- send MEIOSIS_RENDER_MODEL with sendValuesBack=false
- we already have the values in the snapshot, so don't need anything back
- re-render the tracer view with update=false.

3. Typing in model textarea
- send MEIOSIS_RENDER_MODEL with sendValuesBack=true. The tracer needs to get
  the computed values from the other streams.
- receive values from meiosis with update=false so this will not add to the tracer's history.
- re-render the tracer view with update=false.
*/

module.exports = _meiosisTracer.meiosisTracer;

/***/ }),

/***/ "./src/meiosis-tracer.js":
/*!*******************************!*\
  !*** ./src/meiosis-tracer.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.meiosisTracer = undefined;

var _model = __webpack_require__(/*! ./model */ "./src/model.js");

var _view = __webpack_require__(/*! ./view */ "./src/view.js");

var _receive = __webpack_require__(/*! ./receive */ "./src/receive.js");

window["__MEIOSIS_TRACER_GLOBAL_HOOK__"] = true;

var meiosisTracer = function meiosisTracer(_ref) {
  var selector = _ref.selector,
      renderModel = _ref.renderModel,
      triggerStreamValue = _ref.triggerStreamValue,
      horizontal = _ref.horizontal;

  var target = document.querySelector(selector);

  if (!target) {
    return;
  }

  var receiveValues = (0, _receive.createReceiveValues)(_model.tracerModel, _view.tracerView);

  renderModel = renderModel || function (model, sendValuesBack) {
    return window.postMessage({ type: "MEIOSIS_RENDER_MODEL", model: model, sendValuesBack: sendValuesBack }, "*");
  };

  (0, _view.initialView)(selector, _model.tracerModel, renderModel, horizontal);

  triggerStreamValue = triggerStreamValue || function (streamId, value) {
    return window.postMessage({ type: "MEIOSIS_TRIGGER_STREAM_VALUE", streamId: streamId, value: value }, "*");
  };

  var initStreamIdModel = function initStreamIdModel(streamIds) {
    streamIds.forEach(function (streamId) {
      return _model.tracerModel.streams[streamId] = { index: 0, values: [] };
    });
    (0, _view.initStreamIds)(streamIds, _model.tracerModel.streams, triggerStreamValue);
  };

  var receiveStreamValue = function receiveStreamValue(streamId, value) {
    var streamState = _model.tracerModel.streams[streamId];

    streamState.values.push(value);
    streamState.index = streamState.values.length - 1;

    (0, _view.updateStreamValue)(streamId, streamState);
  };

  window.addEventListener("message", function (evt) {
    if (evt.data.type === "MEIOSIS_VALUES") {
      receiveValues(evt.data.values, evt.data.update);
    } else if (evt.data.type === "MEIOSIS_STREAM_IDS") {
      var streamIds = evt.data.streamIds;
      initStreamIdModel(streamIds);
    } else if (evt.data.type === "MEIOSIS_STREAM_VALUE") {
      receiveStreamValue(evt.data.streamId, evt.data.value);
    }
  });

  window.postMessage({ type: "MEIOSIS_TRACER_INIT" }, "*");

  return {
    receiveValues: receiveValues,
    initStreamIdModel: initStreamIdModel,
    receiveStreamValue: receiveStreamValue,
    reset: function reset() {
      return (0, _view.reset)(_model.tracerModel);
    }
  };
};

exports.meiosisTracer = meiosisTracer;

/***/ }),

/***/ "./src/model.js":
/*!**********************!*\
  !*** ./src/model.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var tracerModel = {
  tracerStates: [],
  tracerIndex: 0,
  streams: {} // id: { index: N, values: [] }
};

exports.tracerModel = tracerModel;

/***/ }),

/***/ "./src/receive.js":
/*!************************!*\
  !*** ./src/receive.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var createReceiveValues = function createReceiveValues(tracerModel, view) {
  return function (values, update) {
    if (update) {
      if (tracerModel.tracerStates.length > 0) {
        tracerModel.tracerStates.length = tracerModel.tracerIndex + 1;
      }
      tracerModel.tracerStates.push(values);
      tracerModel.tracerIndex = tracerModel.tracerStates.length - 1;
    }
    view(values, tracerModel);
  };
};

exports.createReceiveValues = createReceiveValues;

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var tracerContainerId = "tracerContainer";
var dataStreamContainerId = "dataStreamContainer";
var otherStreamContainerId = "otherStreamContainer";
var tracerId = "tracerSlider";
var tracerToggleId = "tracerToggle";
var tracerResetId = "tracerReset";
var tracerIndexId = "tracerIndex";
var tracerStepBackId = "tracerStepBack";
var tracerStepForwardId = "tracerStepForward";
var tracerModelId = "tracerModel";
var errorMessageId = "errorMessage";
var errorMessage = null;
var divStyle = null;

var tracerView = function tracerView(values, tracerModel) {
  var tracer = document.getElementById(tracerId);
  tracer.setAttribute("max", String(tracerModel.tracerStates.length - 1));
  tracer.value = String(tracerModel.tracerIndex);
  document.getElementById(tracerStepBackId).disabled = tracerModel.tracerIndex === 0;
  document.getElementById(tracerStepForwardId).disabled = tracerModel.tracerIndex === tracerModel.tracerStates.length - 1;

  var tracerIndex = document.getElementById(tracerIndexId);
  tracerIndex.innerHTML = String(tracerModel.tracerIndex);

  var tracerModelEl = document.getElementById(tracerModelId);
  tracerModelEl.value = JSON.stringify(values[0].value, null, 4);

  var streamValueDivs = document.querySelectorAll("div.dataStream");

  if (streamValueDivs.length === 0) {
    var streamValueDivsMarkup = "";

    for (var i = 1, t = values.length; i < t; i++) {
      streamValueDivsMarkup += "<div" + divStyle + " class='dataStream'>" + "<textarea rows='5' cols='40'></textarea>" + "</div>";
    }
    document.getElementById(dataStreamContainerId).innerHTML = streamValueDivsMarkup;
  }

  var streamTextareas = document.querySelectorAll("div.dataStream textarea");

  for (i = 1, t = values.length; i < t; i++) {
    streamTextareas[i - 1].value = JSON.stringify(values[i].value, null, 4);
  }
};

var onSliderChange = function onSliderChange(renderModel, tracerModel) {
  return function (evt) {
    var index = parseInt(evt.target.value, 10);
    var snapshot = tracerModel.tracerStates[index];
    tracerModel.tracerIndex = index;
    var model = snapshot[0].value;
    renderModel(model, false);
    tracerView(snapshot, tracerModel);
  };
};

var onStreamSliderChange = function onStreamSliderChange(streamModel, streamId) {
  return function (evt) {
    var streamState = streamModel[streamId];
    var index = parseInt(evt.target.value, 10);

    streamState.index = index;

    updateStreamValue(streamId, streamState);
  };
};

var onStreamValueChange = function onStreamValueChange(streamId, textarea, triggerStreamValue) {
  return function () {
    try {
      var value = JSON.parse(textarea.value);
      triggerStreamValue(streamId, value);
      errorMessage.style.display = "none";
    } catch (err) {
      errorMessage.style.display = "block";
    }
  };
};

var onModelChange = function onModelChange(renderModel) {
  return function (evt) {
    try {
      var model = JSON.parse(evt.target.value);
      renderModel(model, true);
      errorMessage.style.display = "none";
    } catch (err) {
      errorMessage.style.display = "block";
    }
  };
};

var onToggle = function onToggle(tracerContainer) {
  return function (evt) {
    var button = evt.target;

    if (tracerContainer.style.display === "none") {
      tracerContainer.style.display = "block";
      button.innerHTML = "Hide";
    } else {
      tracerContainer.style.display = "none";
      button.innerHTML = "Show";
    }
  };
};

var onReset = function onReset(tracerModel) {
  return function () {
    reset(tracerModel);
  };
};

var reset = function reset(tracerModel) {
  var snapshot = tracerModel.tracerStates[0];
  tracerModel.tracerStates.length = 0;
  tracerModel.tracerIndex = 0;
  tracerView(snapshot, tracerModel);
};

var initialView = function initialView(selector, tracerModel, renderModel, horizontal) {
  var target = document.querySelector(selector);

  if (target) {
    divStyle = horizontal ? " style='float: left'" : "";

    var viewHtml = "<div style='text-align: right'><button id='" + tracerToggleId + "'>Hide</button></div>" + "<div id='" + tracerContainerId + "'>" + "<div style='text-align: right'><button id='" + tracerResetId + "'>Reset</button></div>" + "<div>Data streams:</div>" + "<input id='" + tracerId + "' type='range' min='0' max='" + String(tracerModel.tracerStates.length - 1) + "' value='" + String(tracerModel.tracerIndex) + "' style='width: 100%'/>" + "<button id='" + tracerStepBackId + "'>&lt;</button> <button id='" + tracerStepForwardId + "'>&gt;</button> " + "<span id='" + tracerIndexId + "'>" + String(tracerModel.tracerIndex) + "</span>" + "<div" + divStyle + ">" + "<div>Model: (you can type into this box)</div>" + "<textarea id='" + tracerModelId + "' rows='5' cols='40'></textarea>" + "<div id='" + errorMessageId + "' style='display: none'><span style='color:red'>Invalid JSON</span></div>" + "</div>" + "<span id='" + dataStreamContainerId + "'></span>" + "<span id='" + otherStreamContainerId + "'></span>" + "</div>";

    target.innerHTML = viewHtml;

    var tracerContainer = document.getElementById(tracerContainerId);
    errorMessage = document.getElementById(errorMessageId);

    document.getElementById(tracerId).addEventListener("input", onSliderChange(renderModel, tracerModel));
    document.getElementById(tracerModelId).addEventListener("keyup", onModelChange(renderModel));
    document.getElementById(tracerToggleId).addEventListener("click", onToggle(tracerContainer));
    document.getElementById(tracerResetId).addEventListener("click", onReset(tracerModel));
    document.getElementById(tracerStepBackId).addEventListener("click", function () {
      onSliderChange(renderModel, tracerModel)({ target: { value: Math.max(0, tracerModel.tracerIndex - 1) } });
    });
    document.getElementById(tracerStepForwardId).addEventListener("click", function () {
      onSliderChange(renderModel, tracerModel)({ target: { value: Math.min(tracerModel.tracerStates.length - 1, tracerModel.tracerIndex + 1) } });
    });
  }
};

var initStreamIds = function initStreamIds(streamIds, streamModel, triggerStreamValue) {
  var streamValueDivsMarkup = "<div>Other streams:</div>";

  streamIds.forEach(function (streamId) {
    return streamValueDivsMarkup += "<div" + divStyle + " class='otherStream' id='" + streamId + "'>" + "<input type='range' min='0' max='0' value='0' style='width: 100%'/>" + "<div>0</div>" + "<textarea rows='5' cols='40'></textarea>" + "<div><button>Trigger</button></div>" + "</div>";
  });
  document.getElementById(otherStreamContainerId).innerHTML = streamValueDivsMarkup;

  streamIds.forEach(function (streamId) {
    var container = document.getElementById(streamId);

    var input = container.getElementsByTagName("input")[0];
    input.addEventListener("input", onStreamSliderChange(streamModel, streamId));

    var button = container.getElementsByTagName("button")[0];
    var textarea = container.getElementsByTagName("textarea")[0];
    button.addEventListener("click", onStreamValueChange(streamId, textarea, triggerStreamValue));
  });
};

var updateStreamValue = function updateStreamValue(streamId, streamState) {
  var container = document.getElementById(streamId);
  var textarea = container.getElementsByTagName("textarea")[0];
  var input = container.getElementsByTagName("input")[0];
  var div = container.getElementsByTagName("div")[0];

  textarea.value = JSON.stringify(streamState.values[streamState.index], null, 4);
  input.setAttribute("max", String(streamState.values.length - 1));
  input.value = String(streamState.index);
  div.innerHTML = String(streamState.index);
};

exports.initialView = initialView;
exports.tracerView = tracerView;
exports.reset = reset;
exports.initStreamIds = initStreamIds;
exports.updateStreamValue = updateStreamValue;

/***/ })

/******/ });
});
//# sourceMappingURL=meiosis-tracer.js.map