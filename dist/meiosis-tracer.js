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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var rowsId = exports.rowsId = "tracerRows";
var colsId = exports.colsId = "tracerCols";

var streamId = exports.streamId = function streamId(index) {
  return "tracerStreamContainer_ " + index;
};
var modelId = exports.modelId = function modelId(index) {
  return "tracerModel_" + index;
};
var sliderId = exports.sliderId = function sliderId(index) {
  return "tracerSlider_" + index;
};
var stepBackId = exports.stepBackId = function stepBackId(index) {
  return "tracerStepBack_" + index;
};
var stepForwardId = exports.stepForwardId = function stepForwardId(index) {
  return "tracerStepForward_" + index;
};
var sliderValueId = exports.sliderValueId = function sliderValueId(index) {
  return "tracerSliderValue_" + index;
};
var sendId = exports.sendId = function sendId(index) {
  return "tracerSend_" + index;
};

/***/ }),

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

var _trace = __webpack_require__(/*! ./trace */ "./src/trace.js");

var _tracer = __webpack_require__(/*! ./tracer */ "./src/tracer.js");

var meiosisTracer = exports.meiosisTracer = function meiosisTracer(params) {
  (0, _trace.trace)(params);
  (0, _tracer.tracer)(params);
};

/***/ }),

/***/ "./src/settingsView.js":
/*!*****************************!*\
  !*** ./src/settingsView.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settingsView = undefined;

var _constants = __webpack_require__(/*! ./constants */ "./src/constants.js");

var C = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var settingsView = exports.settingsView = function settingsView(_ref) {
  var element = _ref.element,
      listeners = _ref.listeners,
      _ref$rows = _ref.rows,
      rows = _ref$rows === undefined ? 5 : _ref$rows,
      _ref$cols = _ref.cols,
      cols = _ref$cols === undefined ? 40 : _ref$cols;

  element.innerHTML = "<div>" + "<span>Rows: </span>" + "<input id='" + C.rowsId + "' type='text' size='2' value='" + rows + "'/>" + "<span> Cols: </span> " + "<input id='" + C.colsId + "' type='text' size='2' value='" + cols + "'/>" + "</div>";

  document.getElementById(C.rowsId).addEventListener("input", function (evt) {
    listeners.onRowsColsChange(parseInt(evt.target.value, 10), parseInt(document.getElementById(C.colsId).value, 10));
  });

  document.getElementById(C.colsId).addEventListener("input", function (evt) {
    listeners.onRowsColsChange(parseInt(document.getElementById(C.rowsId).value, 10), parseInt(evt.target.value, 10));
  });
};

/***/ }),

/***/ "./src/streamView.js":
/*!***************************!*\
  !*** ./src/streamView.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.streamView = undefined;

var _constants = __webpack_require__(/*! ./constants */ "./src/constants.js");

var C = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var streamView = exports.streamView = function streamView(_ref) {
  var element = _ref.element,
      index = _ref.index,
      listeners = _ref.listeners,
      _ref$label = _ref.label,
      label = _ref$label === undefined ? "" : _ref$label,
      _ref$rows = _ref.rows,
      rows = _ref$rows === undefined ? 5 : _ref$rows,
      _ref$cols = _ref.cols,
      cols = _ref$cols === undefined ? 40 : _ref$cols;

  element.innerHTML = "<div id='" + C.streamId(index) + "' style='padding:8px;border:1px solid gray'>" + "<div>" + label + "</div>" + "<textarea id='" + C.modelId(index) + "' rows='" + rows + "' cols='" + cols + "'>" + "</textarea>" + "<div>" + "<input id='" + C.sliderId(index) + "' type='range' min='0' max='0' value='0'" + " style='width: 100%' />" + "<button id='" + C.stepBackId(index) + "'>&lt</button> " + "<button id='" + C.stepForwardId(index) + "'>&gt</button> " + "<span id='" + C.sliderValueId(index) + "'>-1</span> " + "<button id='" + C.sendId(index) + "' style='position:absolute;right:8px'>" + "Send" + "</button>" + "</div>" + "</div>";

  document.getElementById(C.sliderId(index)).addEventListener("input", function (evt) {
    listeners.onSliderChange(parseInt(evt.target.value, 10));
  });

  var stepBack = document.getElementById(C.stepBackId(index));
  stepBack.addEventListener("click", function (_evt) {
    listeners.onStepBack();
  });
  stepBack.disabled = true;

  var stepForward = document.getElementById(C.stepForwardId(index));
  stepForward.addEventListener("click", function (_evt) {
    listeners.onStepForward();
  });
  stepForward.disabled = true;

  document.getElementById(C.sendId(index)).addEventListener("click", function (_evt) {
    listeners.onSend(document.getElementById(C.modelId(index)).value);
  });
};

/***/ }),

/***/ "./src/trace.js":
/*!**********************!*\
  !*** ./src/trace.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var isMeiosisTracerOn = function isMeiosisTracerOn() {
  return window && window["__MEIOSIS_TRACER_GLOBAL_HOOK__"];
};

/*
Changes to a stream are sent to the tracer.

Stream values received from the tracer are pushed onto the stream.

They are either sent back or not according to the flag issued by the tracer:
- When auto-sent using the slider, do not send values back.
- When sent using the Send button, send values back; they can either be added
  to the history or not, according to a checkbox.

Messages:

- MEIOSIS_TRACER_INIT: received from the UI to initialize
- MEIOSIS_PING: sent to the UI in case we missed the INIT message, asks the UI to send INIT
- MEIOSIS_STREAM_LABELS: sent to the UI to initialize number of streams and labels
- MEIOSIS_STREAM_VALUE: sent to the UI to indicate a new stream value
- MEIOSIS_TRIGGER_STREAM_VALUE: received from the UI to push a value onto a stream

Parameters:

- streams:              [ ]      // each item either a stream, or { label, stream }
- stringify (optional): Function // default is obj => JSON.stringify(obj, null, 4)
- parse (optional):     Function // default is str => JSON.parse(str)
*/
var trace = exports.trace = function trace(_ref) {
  var _ref$streams = _ref.streams,
      streams = _ref$streams === undefined ? [] : _ref$streams,
      _ref$stringify = _ref.stringify,
      stringify = _ref$stringify === undefined ? function (obj) {
    return JSON.stringify(obj, null, 4);
  } : _ref$stringify,
      _ref$parse = _ref.parse,
      parse = _ref$parse === undefined ? function (str) {
    return JSON.parse(str);
  } : _ref$parse;

  if (!isMeiosisTracerOn()) {
    return;
  }
  var bufferedStreamValues = [];
  var devtoolInitialized = false;
  var lastIndex = -1;

  var streamObjs = [];
  var labels = [];

  for (var i = 0, t = streams.length; i < t; i++) {
    if (streams[i].label) {
      labels.push(streams[i].label);
      streamObjs.push(streams[i]);
    } else {
      var label = "Stream " + i;
      labels.push(label);
      streamObjs.push({ stream: streams[i], label: label });
    }
  }

  streamObjs.forEach(function (_ref2, index) {
    var stream = _ref2.stream;

    stream.map(function (value) {
      if (lastIndex !== index) {
        var data = { type: "MEIOSIS_STREAM_VALUE", index: index, value: stringify(value) };

        if (devtoolInitialized) {
          window.postMessage(data, "*");
        } else {
          bufferedStreamValues.push(data);
        }
      }
    });
  });

  window.addEventListener("message", function (evt) {
    if (evt.data.type === "MEIOSIS_TRACER_INIT") {
      window.postMessage({ type: "MEIOSIS_STREAM_LABELS", value: labels }, "*");
      devtoolInitialized = true;
      bufferedStreamValues.forEach(function (data) {
        return window.postMessage(data, "*");
      });
      bufferedStreamValues.length = 0;
    } else if (evt.data.type === "MEIOSIS_TRIGGER_STREAM_VALUE") {
      var _evt$data = evt.data,
          index = _evt$data.index,
          value = _evt$data.value;

      lastIndex = index;
      streamObjs[index].stream(parse(value));
      lastIndex = -1;
    }
  });

  // Send ping in case tracer was already loaded and we missed the MEIOSIS_TRACER_INIT message.
  window.postMessage({ type: "MEIOSIS_PING" }, "*");
};

/***/ }),

/***/ "./src/tracer.js":
/*!***********************!*\
  !*** ./src/tracer.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tracer = undefined;

var _streamView = __webpack_require__(/*! ./streamView */ "./src/streamView.js");

var _updateView = __webpack_require__(/*! ./updateView */ "./src/updateView.js");

var _settingsView = __webpack_require__(/*! ./settingsView */ "./src/settingsView.js");

var _constants = __webpack_require__(/*! ./constants */ "./src/constants.js");

var C = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

window["__MEIOSIS_TRACER_GLOBAL_HOOK__"] = true;

var tracer = exports.tracer = function tracer(_ref) {
  var _ref$selector = _ref.selector,
      selector = _ref$selector === undefined ? "#tracer" : _ref$selector,
      _ref$rows = _ref.rows,
      rows = _ref$rows === undefined ? 5 : _ref$rows,
      _ref$cols = _ref.cols,
      cols = _ref$cols === undefined ? 40 : _ref$cols;

  var target = document.querySelector(selector);

  if (!target) {
    return;
  }

  var states = [];

  window.addEventListener("message", function (evt) {
    if (evt.data.type === "MEIOSIS_STREAM_LABELS") {
      var labels = evt.data.value;

      var settingsListeners = {
        onRowsColsChange: function onRowsColsChange(rows, cols) {
          for (var i = 0; i < labels.length; i++) {
            var textarea = document.getElementById(C.modelId(i));
            textarea.rows = rows;
            textarea.cols = cols;
          }
        }
      };
      var settings = document.createElement("div");
      target.append(settings);
      (0, _settingsView.settingsView)({ element: settings, listeners: settingsListeners, rows: rows, cols: cols });

      var _loop = function _loop(index) {
        states.push({ history: [], value: -1 });

        var listeners = {
          onSliderChange: function onSliderChange(value) {
            var state = states[index];
            var model = state.history[value];
            state.value = value;

            (0, _updateView.updateView)({ index: index, model: model, value: value });
          },
          onStepBack: function onStepBack() {
            var state = states[index];
            state.value = state.value - 1;
            var model = state.history[state.value];

            (0, _updateView.updateView)({ index: index, model: model, value: state.value });
          },
          onStepForward: function onStepForward() {
            var state = states[index];
            state.value = state.value + 1;
            var model = state.history[state.value];

            (0, _updateView.updateView)({ index: index, model: model, value: state.value });
          },
          onSend: function onSend(value) {
            window.postMessage({ type: "MEIOSIS_TRIGGER_STREAM_VALUE", index: index, value: value }, "*");
          }
        };

        var element = document.createElement("div");
        target.append(element);
        var label = labels[index];

        (0, _streamView.streamView)({ element: element, index: index, listeners: listeners, label: label, rows: rows, cols: cols });
      };

      for (var index = 0; index < labels.length; index++) {
        _loop(index);
      }
    } else if (evt.data.type === "MEIOSIS_STREAM_VALUE") {
      var index = evt.data.index;
      var state = states[index];
      var model = evt.data.value;

      state.history.push(model);
      state.value = state.value + 1;

      (0, _updateView.updateView)({ index: index, model: model, value: state.value, max: state.history.length - 1 });
    }
    /*
    else if (evt.data.type === "MEIOSIS_STREAM_IDS") {
      const streamIds = evt.data.streamIds
      initStreamIdModel(streamIds)
    }
    */
  });

  window.postMessage({ type: "MEIOSIS_TRACER_INIT" }, "*");
};

/***/ }),

/***/ "./src/updateView.js":
/*!***************************!*\
  !*** ./src/updateView.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateView = undefined;

var _constants = __webpack_require__(/*! ./constants */ "./src/constants.js");

var C = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var updateView = exports.updateView = function updateView(_ref) {
  var index = _ref.index,
      model = _ref.model,
      value = _ref.value,
      max = _ref.max;

  document.getElementById(C.modelId(index)).value = model;

  if (max != null) {
    document.getElementById(C.sliderId(index)).max = max;
  }

  document.getElementById(C.sliderId(index)).value = value;
  document.getElementById(C.sliderValueId(index)).innerHTML = value;

  document.getElementById(C.stepBackId(index)).disabled = value <= 0;
  document.getElementById(C.stepForwardId(index)).disabled = value == document.getElementById(C.sliderId(index)).max;
};

/***/ })

/******/ });
});
//# sourceMappingURL=meiosis-tracer.js.map