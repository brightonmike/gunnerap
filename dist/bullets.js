/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_util_debounce__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utilities_util_guid__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bullets_menu__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__bullets_class_on_scroll__ = __webpack_require__(4);






var Bullets = {
    Menu: function(_this) {
        var menuplugin = new __WEBPACK_IMPORTED_MODULE_2__bullets_menu__["a" /* default */](_this);
        menuplugin;  
    },
    ClassOnScroll: function(_this, options) {
        var scrollplugin = new __WEBPACK_IMPORTED_MODULE_3__bullets_class_on_scroll__["a" /* default */](_this, options);
        scrollplugin;  
    },
};

Bullets.invoke = function () {
  var nodes = document.querySelectorAll('[data-bullets-js]'),
      node,
      func;

  for (var i = 0, j = nodes.length; i < j; i++) {
    node = nodes[i];
    func = node.getAttribute('data-bullets-js');
    if (this[func]) {
      console.log('fired ' + func);
      this[func](node);
    }
  }
};


Bullets.invoke();

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
function debounce(func, wait, immediate) {
  var timeout;

  return function () {
    var context = this,
        args = arguments;
    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
function guid() {
  var d = new Date().getTime();
  if (window.performance && typeof window.performance.now === "function") {
    d += performance.now(); //use high-precision timer if available
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
  });
  return uuid;
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Menu {  

  constructor(element, options) {
    this.element = element;    
    this.body = $('body');
    this._init();
  }

  _init(){
    var activeClass = 'menu-is-active';
    var navToggle = $(this.element);
    var _this = this;

    navToggle.on('click', function(e){
      e.preventDefault();
      _this._toggle(activeClass);
    });
  }

  _toggle(activeClass) {
    var _this = this;
    if (this.body.hasClass(activeClass)) {
      _this._closeNav(activeClass);
    } else {
      _this._openNav(activeClass);
    }  
  }

  _openNav(activeClass) {
    this.body.addClass(activeClass);
  }

  _closeNav(activeClass) {
    this.body.removeClass(activeClass);
  }

  destroy(){

  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Menu;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ClassOnScroll {
  constructor(element, options){
    this.element = $(element);
    var opt = this.element.attr('data-bullets-options');           
    if(opt) {
      opt = opt.split(',').reduce((acc, cur) => {
        var data = cur.split(':');
        acc[data[0]] = data[1];
        return acc;
      }, {});
    }    
		this.options = $.extend({}, ClassOnScroll.defaults, opt);      
	  this._init();
	}

	_init(){
    var _this = this;
    var _window = $(window);
    var _offset = this.options.offset;
    var _activeclass = this.options.activeclass;

    if(this.options.reference) {
      var _reference = this.options.reference;  
      if($(_reference).length > 0){
        _offset = $(_reference).outerHeight() - this.element.outerHeight()*2;
      }
    }

    var trigger = debounce(function() {
      var scroll = _window.scrollTop();
      if (scroll >= _offset) {
        _this._AddClassonScroll(_activeclass);
      } else {
        _this._RemoveClassonScroll(_activeclass);
      }
    }, 250);

    _window.scroll(function() {
      trigger();
    });
	}  	

  _AddClassonScroll(_activeclass){	
    this.element.addClass(_activeclass);
  }

  _RemoveClassonScroll(_activeclass){
    this.element.removeClass(_activeclass);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ClassOnScroll;


ClassOnScroll.defaults = {
  offset: 500,
  activeclass: 'element-in-view',
};

/***/ })
/******/ ]);