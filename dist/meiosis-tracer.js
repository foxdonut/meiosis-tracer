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

	var _receivers = __webpack_require__(4);

	var _receivers2 = _interopRequireDefault(_receivers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var meiosisTracer = function meiosisTracer(createComponent, elementId) {
	  return createComponent({
	    initialModel: _model.initialModel,
	    view: (0, _view2.default)(elementId),
	    receivers: _receivers2.default
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
	var onSliderChange = function onSliderChange(model, actions) {
	  return function (evt) {
	    var index = parseInt(evt.target.value, 10);
	    var snapshot = model.tracerStates[index];
	    snapshot.tracerIndexChange = index;
	    actions.next(snapshot);
	  };
	};

	var view = function view(elementId) {
	  return function (_ref) {
	    var model = _ref.model;
	    var actions = _ref.actions;

	    var tracerId = "tracerSlider";
	    var tracerIndexId = "tracerIndex";
	    var tracerModelId = "tracerModel";

	    var view = "<div><input id='" + tracerId + "' type='range' min='0' max='" + String(model.tracerStates.length - 1) + "' value='" + String(model.tracerIndex) + "'/>" + "<span id='" + tracerIndexId + "'>" + String(model.tracerIndex) + "</span><pre id='" + tracerModelId + "'></pre></div>";

	    var target = document.getElementById(elementId);

	    if (target) {
	      if (target.innerHTML === "") {
	        target.innerHTML = view;
	        document.getElementById(tracerId).addEventListener("input", onSliderChange(model, actions));
	      } else {
	        var tracer = document.getElementById(tracerId);
	        tracer.value = String(model.tracerIndex);
	        tracer.setAttribute("max", String(model.tracerStates.length - 1));

	        var tracerIndex = document.getElementById(tracerIndexId);
	        tracerIndex.innerHTML = String(model.tracerIndex);

	        var tracerModel = document.getElementById(tracerModelId);
	        // FIXME
	        var saneModel = {};
	        for (var key in model) {
	          if (model.hasOwnProperty(key) && !key.startsWith("tracer")) {
	            saneModel[key] = model[key];
	          }
	        }
	        tracerModel.innerHTML = JSON.stringify(saneModel);
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
	var receivers = [function (model, update) {
	  var tracerIndexChange = parseInt(update.tracerIndexChange, 10);
	  if (tracerIndexChange >= 0) {
	    model.tracerIndex = tracerIndexChange;
	  } else {
	    model.tracerStates.push(model);
	    model.tracerIndex = model.tracerStates.length - 1;
	  }
	  return model;
	}];

	exports.default = receivers;

/***/ }
/******/ ]);