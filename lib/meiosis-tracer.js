module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _meiosisTracer = __webpack_require__(1);
	
	module.exports = _meiosisTracer.meiosisTracer;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.meiosisTracer = undefined;
	
	var _model = __webpack_require__(2);
	
	var _view = __webpack_require__(3);
	
	var _receiveUpdate = __webpack_require__(4);
	
	var _receiveUpdate2 = _interopRequireDefault(_receiveUpdate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var tracerModel = _model.initialModel;
	
	var meiosisTracer = function meiosisTracer(createComponent, renderRoot, selector) {
	  createComponent({
	    receiveUpdate: (0, _receiveUpdate2.default)(tracerModel, _view.updateView)
	  });
	  (0, _view.initialView)(selector, renderRoot, tracerModel);
	};
	
	exports.meiosisTracer = meiosisTracer;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var initialModel = {
	  tracerStates: [],
	  tracerIndex: 0
	};
	
	exports.initialModel = initialModel;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var tracerId = "tracerSlider";
	var tracerIndexId = "tracerIndex";
	var tracerModelId = "tracerModel";
	var tracerUpdateId = "tracerUpdate";
	
	var updateView = function updateView(_ref, tracerModel) {
	  var model = _ref.model;
	  var update = _ref.update;
	
	  var tracer = document.getElementById(tracerId);
	  tracer.setAttribute("max", String(tracerModel.tracerStates.length - 1));
	  tracer.value = String(tracerModel.tracerIndex);
	
	  var tracerIndex = document.getElementById(tracerIndexId);
	  tracerIndex.innerHTML = String(tracerModel.tracerIndex);
	
	  var tracerModelEl = document.getElementById(tracerModelId);
	  tracerModelEl.innerHTML = JSON.stringify(model);
	
	  var tracerUpdateEl = document.getElementById(tracerUpdateId);
	  tracerUpdateEl.innerHTML = JSON.stringify(update);
	};
	
	var onSliderChange = function onSliderChange(renderRoot, tracerModel) {
	  return function (evt) {
	    var index = parseInt(evt.target.value, 10);
	    var snapshot = tracerModel.tracerStates[index];
	    renderRoot(snapshot.model);
	    tracerModel.tracerIndex = index;
	    updateView(snapshot, tracerModel);
	  };
	};
	
	var onModelChange = function onModelChange(renderRoot) {
	  return function (evt) {
	    try {
	      var model = JSON.parse(evt.target.value);
	      renderRoot(model);
	    } catch (err) {
	      // ignore invalid JSON
	    }
	  };
	};
	
	var initialView = function initialView(selector, renderRoot, tracerModel) {
	  var target = document.querySelector(selector);
	
	  if (target) {
	    var viewHtml = "<div><input id='" + tracerId + "' type='range' min='0' max='" + String(tracerModel.tracerStates.length - 1) + "' value='" + String(tracerModel.tracerIndex) + "' style='width: 100%'/>" + "<div id='" + tracerIndexId + "'>" + String(tracerModel.tracerIndex) + "</div>" + "<textarea id='" + tracerUpdateId + "' rows='2' cols='40' style='display: block'></textarea>" + "<textarea id='" + tracerModelId + "' rows='2' cols='40' style='display: block'></textarea></div>";
	
	    target.innerHTML = viewHtml;
	    document.getElementById(tracerId).addEventListener("input", onSliderChange(renderRoot, tracerModel));
	    document.getElementById(tracerModelId).addEventListener("keyup", onModelChange(renderRoot));
	  }
	};
	
	exports.initialView = initialView;
	exports.updateView = updateView;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var receiveUpdate = function receiveUpdate(tracerModel, view) {
	  return function (model, update) {
	    var modelCopy = JSON.parse(JSON.stringify(model));
	    var modelAndUpdate = { model: modelCopy, update: update };
	    tracerModel.tracerStates.push(modelAndUpdate);
	    tracerModel.tracerIndex = tracerModel.tracerStates.length - 1;
	
	    view(modelAndUpdate, tracerModel);
	
	    return model;
	  };
	};
	
	exports.default = receiveUpdate;

/***/ }
/******/ ]);
//# sourceMappingURL=meiosis-tracer.js.map