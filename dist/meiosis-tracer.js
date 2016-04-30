module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _meiosisTracer = __webpack_require__(1);

	exports.default = _meiosisTracer.meiosisTracer;

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

	var _view2 = _interopRequireDefault(_view);

	var _receiveUpdate = __webpack_require__(4);

	var _receiveUpdate2 = _interopRequireDefault(_receiveUpdate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var tracerModel = _model.initialModel;

	var meiosisTracer = function meiosisTracer(createComponent, renderRoot, elementId) {
	  return createComponent({
	    receiveUpdate: (0, _receiveUpdate2.default)(tracerModel, (0, _view2.default)(elementId, renderRoot))
	  });
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
	var onSliderChange = function onSliderChange(tracerModel, renderRoot) {
	  return function (evt) {
	    var index = parseInt(evt.target.value, 10);
	    var snapshot = tracerModel.tracerStates[index];
	    renderRoot(snapshot.model);
	    tracerModel.tracerIndex = index;
	    updateView(snapshot, tracerModel);
	  };
	};

	var tracerId = "tracerSlider";
	var tracerIndexId = "tracerIndex";
	var tracerModelId = "tracerModel";

	var updateView = function updateView(_ref, tracerModel) {
	  var model = _ref.model;
	  var update = _ref.update;

	  var tracer = document.getElementById(tracerId);
	  tracer.value = String(tracerModel.tracerIndex);
	  tracer.setAttribute("max", String(tracerModel.tracerStates.length - 1));

	  var tracerIndex = document.getElementById(tracerIndexId);
	  tracerIndex.innerHTML = String(tracerModel.tracerIndex);

	  var tracerModelLog = document.getElementById(tracerModelId);
	  tracerModelLog.innerHTML = "model: " + JSON.stringify(model) + "\n" + "update: " + JSON.stringify(update);
	};

	var view = function view(elementId, renderRoot) {
	  return function (modelAndUpdate, tracerModel) {

	    var viewHtml = "<div><input id='" + tracerId + "' type='range' min='0' max='" + String(tracerModel.tracerStates.length - 1) + "' value='" + String(tracerModel.tracerIndex) + "'/>" + "<div id='" + tracerIndexId + "'>" + String(tracerModel.tracerIndex) + "</div>" + "<textarea id='" + tracerModelId + "' rows='5' cols='100'></textarea></div>";

	    var target = document.getElementById(elementId);

	    if (target) {
	      if (target.innerHTML === "") {
	        target.innerHTML = viewHtml;
	        document.getElementById(tracerId).addEventListener("input", onSliderChange(tracerModel, renderRoot));
	      } else {
	        updateView(modelAndUpdate, tracerModel);
	      }
	    }
	    return null;
	  };
	};

	exports.default = view;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var receiveUpdate = function receiveUpdate(tracerModel, view) {
	  return function (model, update) {
	    var modelAndUpdate = { model: model, update: update };
	    tracerModel.tracerStates.push(modelAndUpdate);
	    tracerModel.tracerIndex = tracerModel.tracerStates.length - 1;

	    view(modelAndUpdate, tracerModel);

	    return model;
	  };
	};

	exports.default = receiveUpdate;

/***/ }
/******/ ]);