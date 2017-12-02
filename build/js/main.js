var Main =
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
/******/ 	__webpack_require__.p = "/calvin-klein/build/js/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var DeviceDetection = __webpack_require__(1);
	var Togglers = __webpack_require__(2);
	var Carousel = __webpack_require__(3);
	var Modal = __webpack_require__(4);
	var Anchor = __webpack_require__(5);
	var Input = __webpack_require__(6);
	//let Select = require("./components/select");
	var Form = __webpack_require__(7);
	var Onepage = __webpack_require__(8);
	var Test = __webpack_require__(9);
	//let Animation = require("./components/animation");

	$(document).ready(function () {

	  DeviceDetection.run();
	  Togglers.init();
	  Carousel.init();
	  Modal.init();
	  Anchor.init();
	  Input.init();
	  Form.init();
	  Test.init();
	  //Select.init();
	  Onepage.init();
	  //Animation.init();
	});

	/**
	 * Список экспортируемых модулей, чтобы иметь к ним доступ извне
	 * @example
	 * Main.Form.isFormValid();
	 */
	module.exports = {
	  DeviceDetection: DeviceDetection,
	  Togglers: Togglers,
	  Carousel: Carousel,
	  Modal: Modal,
	  Anchor: Anchor,
	  Input: Input,
	  Form: Form,
	  Test: Test,
	  //Select,
	  Onepage: Onepage
		};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	var breakpoints = {
		sm: 576,
		md: 768,
		lg: 992,
		xl: 1200
	};

	function isMobile() {
		return $(window).width() <= breakpoints.sm;
	}
	function isTablet() {
		return $(window).width() > breakpoints.sm && $(window).width() <= breakpoints.md;
	}
	function isTouch() {
		return 'ontouchstart' in window || navigator.maxTouchPoints;
	}

	function run() {
		if (isTouch()) {
			$('html').removeClass('no-touch').addClass('touch');
		} else {
			$('html').removeClass('touch').addClass('no-touch');
		}
	}

	module.exports = { run: run, isTouch: isTouch, isMobile: isMobile, isTablet: isTablet };

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Переключение классов по различным событиям
	 * @module Togglers
	 */

	function toggleClassIf(el, cond, toggledClass) {
		if (cond) {
			el.addClass(toggledClass);
		} else {
			el.removeClass(toggledClass);
		}
	}

	/**
	 * Функция добавляет к элементу класс, если страница прокручена больше, чем на указанное значение, 
	 * и убирает класс, если значение меньше
	 * @param {object} el - элемент, с которым взаимодействуем
	 * @param {mixed} [scrollValue=0] - значение прокрутки, на котором меняем css-класс, ожидаемое значение - число или ключевое слово 'this'. Если передано 'this', подставляется положение el.offset().top минус половина высоты экрана
	 * @param {string} [toggledClass=scrolled] - css-класс, который переключаем
	 */
	function toggleElementClassOnScroll(el) {
		var scrollValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
		var toggledClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'scrolled';

		if (el.length == 0) {
			//console.error("Необходимо передать объект, с которым вы хотите взаимодействовать");
			return false;
		}

		if (scrollValue == 'this') {
			scrollValue = el.offset().top - $(window).outerHeight() / 2;
		}

		$(window).on('scroll', function (e) {
			if ($(window).scrollTop() > scrollValue) {
				el.addClass(toggledClass);
			} else {
				el.removeClass(toggledClass);
			}
		});
	};

	/**
	 * инициализация событий для переключателей классов
	 * @example
	 * Togglers.init();
	 */
	function init() {

		//toggleElementClassOnScroll($('.header'), $(window).outerHeight() / 3);

	}

	module.exports = { init: init, toggleClassIf: toggleClassIf, toggleElementClassOnScroll: toggleElementClassOnScroll };

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Карусель
	 * @module Carousel
	 */

	var carousel = void 0;

	/**
	 * Инициализация карусели
	 */
	function init() {
	  carousel = $(".owl-carousel.carousel--default");

	  carousel.owlCarousel({
	    items: 1,
	    nav: true,
	    dots: true,
	    loop: false,
	    mouseDrag: false,
	    animateOut: 'fadeOut'
	  });
	}

	module.exports = { init: init };

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Всплывающие окна
	 * @module Modal
	 */

	var layout = $('.layout');
	var modalWrapperClass = '.modal__wrapper';
	//let modalWrapper = $('.modal__wrapper');

	function openModal(modal) {
	  var isFullscreen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	  var modalWrapper = modal.closest(modalWrapperClass);
	  var modalActivator = $('[data-target="#' + modal.attr('id') + '"]');
	  modalWrapper.removeClass('invisible');
	  modal.removeClass('invisible');
	  var wrapperClasses = 'is-opened';
	  if (isFullscreen) {
	    wrapperClasses += ' is-fullscreen';
	  }
	  layout.addClass('modal-open');
	  modalWrapper.addClass(wrapperClasses);
	  modal.addClass('is-opened');
	  $('html, body').css('overflow-y', 'hidden');
	  modalActivator.each(function () {
	    $(this).addClass('modal-is-opened');
	  });
	}

	function closeModal(modal) {
	  var openNext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	  var modalWrapper = modal.closest(modalWrapperClass);
	  var modalActivator = $('[data-target="#' + modal.attr('id') + '"]');
	  modalActivator.each(function () {
	    $(this).removeClass('modal-is-opened');
	  });
	  modal.removeClass('is-opened');
	  if (!openNext) {
	    layout.removeClass('modal-open');
	    modalWrapper.removeClass('is-opened is-fullscreen');
	    $('html, body').css('overflow-y', '');
	  }
	  setTimeout(function () {
	    modal.addClass('invisible');
	    modalWrapper.addClass('invisible');
	  }, 300);
	}

	/**
	 * инициализация событий для всплывающих окон
	 * @example
	 * Modal.init();
	 */
	function init() {

	  $('.js-modal').on('click', function (e) {
	    e.preventDefault();
	    var target = $(this).attr('data-target');
	    var modal = $(target);
	    var isFullscreen = modal.attr('data-fullscreen') !== undefined;
	    if (!modal.hasClass('is-opened')) {
	      openModal(modal, isFullscreen);
	    } else {
	      closeModal(modal);
	    }
	  });

	  $('.modal').on('click', function (e) {
	    e.stopPropagation();
	  });

	  $(modalWrapperClass).on('click', function (e) {
	    var modal = $(this).find('.modal.is-opened');
	    modal.each(function () {
	      closeModal($(this));
	    });
	  });

	  function openModalHash() {
	    var hash = ['competition'],
	        isFullscreen = void 0,
	        modal = void 0,
	        i = void 0;

	    for (i = 0; i < hash.length; i++) {
	      if ('#' + hash[i] == window.location.hash && $('#' + hash[i]).length) {
	        modal = $('#' + hash[i]);
	        isFullscreen = modal.attr('data-fullscreen') !== undefined;

	        openModal(modal, isFullscreen);
	      }
	    }
	  }

	  openModalHash();
	}

	module.exports = { init: init, openModal: openModal, closeModal: closeModal };

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Anchor scrolling
	 * @module Anchor
	 */

	function scrollToAnchor(newpos) {
	  TweenMax.to(window, 0.5, { scrollTo: { y: newpos, offsetY: 200 } });
	}

	/**
	 * инициализация событий якорного меню
	 * @example
	 * Anchor.init();
	 */
	function init() {

	  $('.js-anchor').click(function (e) {
	    var id = $(this).attr('href');
	    var scrollToID = id + '-title';
	    if (!!$(this).closest('.modal')) {
	      Main.Modal.closeModal($(this).closest('.modal'));
	    }
	    if ($(id).length > 0 && $(scrollToID).length > 0) {
	      e.preventDefault();

	      setTimeout(scrollToAnchor, 400, scrollToID);
	      ;

	      //if (window.history && window.history.pushState) {
	      //  history.pushState("", document.title, id);
	      //}
	    }
	  });
	}

	module.exports = { init: init };

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Модуль для работы placeholder в элементах формы (.field)
	 * @module Input
	 */

	/**
	 * Установить фокус
	 * @private
	 * @param {object} input
	 */
	function focusLabel(input) {
	    input.closest('.field').addClass("has-focus");
	}

	/**
	 * Убрать фокус
	 * @private
	 * @param {object} input
	 */
	function blurLabel(input) {
	    var wrapper = input.closest('.field');
	    wrapper.removeClass("has-focus");
	}

	/**
	 * Проверить инпут на наличие value
	 * @private
	 * @param {object} input
	 */
	function checkInput(input) {
	    var wrapper = input.closest('.field');
	    if (input.val().length > 0) wrapper.addClass("has-value");else wrapper.removeClass("has-value");
	}

	/**
	 * инициализация событий для инпута
	 * @example
	 * Input.init();
	 */
	function init() {
	    var inputs = $('.field__input');
	    var placeholders = $('.field__placeholder');

	    placeholders.click(function () {
	        $(this).closest('.field').find('.field__input').focus();
	    });

	    inputs.each(function (i, item) {
	        checkInput($(item));
	    });

	    inputs.focus(function () {
	        focusLabel($(this));
	    });

	    inputs.blur(function () {
	        blurLabel($(this));
	        checkInput($(this));
	    });
	}

	module.exports = { init: init };

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Модуль для работы Форм
	 * @module Form
	 */

	function validateField(field) {
	  var isValid = field.validity.valid;
	  var fieldContainer = $(field).closest('.field');
	  if (isValid) {
	    fieldContainer.removeClass('has-error');
	  } else {
	    fieldContainer.addClass('has-error');
	  }
	  return isValid;
	}

	function validateForm(elForm) {
	  var errors = 0;
	  Array.from(elForm.elements).forEach(function (item) {
	    var isValidField = validateField(item);
	    if (!isValidField) {
	      errors += 1;
	    }
	  });
	  return errors;
	}

	/**
	 * инициализация событий форм
	 * @example
	 * Form.init();
	 */
	function init() {
	  var jsForm = $('.js-form');

	  jsForm.each(function () {
	    var self = $(this);
	    var selfForm = self.find('.js-form-form');
	    var selfResult = self.find('.js-form-result');
	    var selfSubmit = self.find('.js-form-submit');

	    selfSubmit.on('click', function (e) {
	      e.preventDefault();
	      var hasError = validateForm(selfForm[0]);
	      if (!hasError) {
	        //
	        // submition code here!
	        //
	        self.addClass('is-submitted');
	        //setTimeout(function(){
	        //  selfForm.hide();
	        //}, 500);
	        setTimeout(function () {
	          selfResult.show();
	        }, 300);
	      }
	    });
	  });
	}

	module.exports = { init: init };

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Onepage Scroll
	 * @module Onepage
	 */

	var onepage = void 0;

	/**
	 * Инициализация onepage
	 */
	function init() {
	  onepage = $(".onepage-wrapper");

	  if (onepage.length > 0) {
	    onepage.onepage_scroll({
	      sectionContainer: ".onepage-section",
	      pagination: true,
	      updateUrl: false,
	      loop: false,
	      responsiveFallback: 600
	    });
	  }
	}

	module.exports = { init: init };

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	"use strict";

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	/**
	 * Тест
	 * @module Test
	 */

	var result = {
	  "a": 0,
	  "b": 0,
	  "c": 0,
	  "d": 0
	};
	var pages = {
	  "a": "result-romantic.html",
	  "b": "result-fantasy.html",
	  "c": "result-practical.html",
	  "d": "result-unprompted.html"
	};
	var carousel = $(".owl-carousel.carousel--test");
	var testCtrl = $('.js-test-ctrl');

	function isLastSlide() {
	  return carousel.find('.owl-item').filter(':last').hasClass('active');
	}
	function getPage(answer) {
	  var pageUrl = window.location.origin + '/';
	  pageUrl += pages[answer];
	  return pageUrl;
	}

	function processTest(el) {
	  var isLastSlide = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	  var key = $(el).attr('data-key');
	  result[key] += 1;
	  if (!isLastSlide) {
	    showNext(el);
	  } else {
	    showResult(result);
	  }
	}
	function showNext(el) {
	  setTimeout(function () {
	    carousel.trigger('next.owl.carousel');
	  }, 300);
	}

	function extractKeyValue(obj, value) {
	  return Object.keys(obj)[Object.values(obj).indexOf(value)];
	}

	function calculateResult(result) {
	  var arr = Object.values(result);
	  var max = Math.max.apply(Math, _toConsumableArray(arr));
	  var maxKey = extractKeyValue(result, max);
	  return maxKey;
	}

	function showResult(result) {
	  var answer = calculateResult(result);
	  var page = getPage(answer);
	  setTimeout(function () {
	    window.location.href = page;
	  }, 300, page);
	}

	/**
	 * Инициализация карусели
	 */
	function init() {

	  carousel.owlCarousel({
	    items: 1,
	    nav: false,
	    dots: true,
	    loop: false,
	    mouseDrag: false,
	    touchDrag: false,
	    pullDrag: false,
	    animateOut: 'fadeOut'
	  });

	  testCtrl.on('click', function () {
	    $(this).addClass('is-active');
	    processTest(this, isLastSlide());
	  });
	}

	module.exports = { init: init };

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiZWIxYmNjNmNjZGMwMTE0MzhhNSIsIndlYnBhY2s6Ly8vc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2RldmljZS1kZXRlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL3RvZ2dsZXJzLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy9jYXJvdXNlbC5qcyIsIndlYnBhY2s6Ly8vc3JjL2pzL2NvbXBvbmVudHMvbW9kYWwuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2FuY2hvci5qcyIsIndlYnBhY2s6Ly8vc3JjL2pzL2NvbXBvbmVudHMvaW5wdXQuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2Zvcm0uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL29uZXBhZ2Utc2Nyb2xsLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy90ZXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9jYWx2aW4ta2xlaW4vYnVpbGQvanMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYmViMWJjYzZjY2RjMDExNDM4YTUiLCJsZXQgRGV2aWNlRGV0ZWN0aW9uID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9kZXZpY2UtZGV0ZWN0aW9uXCIpO1xyXG5sZXQgVG9nZ2xlcnMgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL3RvZ2dsZXJzXCIpO1xyXG5sZXQgQ2Fyb3VzZWwgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2Nhcm91c2VsXCIpO1xyXG5sZXQgTW9kYWwgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL21vZGFsXCIpO1xyXG5sZXQgQW5jaG9yID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9hbmNob3JcIik7XHJcbmxldCBJbnB1dCA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvaW5wdXRcIik7XHJcbi8vbGV0IFNlbGVjdCA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvc2VsZWN0XCIpO1xyXG5sZXQgRm9ybSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvZm9ybVwiKTtcclxubGV0IE9uZXBhZ2UgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL29uZXBhZ2Utc2Nyb2xsXCIpO1xyXG5sZXQgVGVzdCA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvdGVzdFwiKTtcclxuLy9sZXQgQW5pbWF0aW9uID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9hbmltYXRpb25cIik7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gIFxyXG4gIERldmljZURldGVjdGlvbi5ydW4oKTtcclxuICBUb2dnbGVycy5pbml0KCk7XHJcbiAgQ2Fyb3VzZWwuaW5pdCgpO1xyXG4gIE1vZGFsLmluaXQoKTtcclxuICBBbmNob3IuaW5pdCgpO1xyXG4gIElucHV0LmluaXQoKTtcclxuICBGb3JtLmluaXQoKTtcclxuICBUZXN0LmluaXQoKTtcclxuICAvL1NlbGVjdC5pbml0KCk7XHJcbiAgT25lcGFnZS5pbml0KCk7XHJcbiAgLy9BbmltYXRpb24uaW5pdCgpO1xyXG4gIFxyXG59KTtcclxuXHJcblxyXG4vKipcclxuICog0KHQv9C40YHQvtC6INGN0LrRgdC/0L7RgNGC0LjRgNGD0LXQvNGL0YUg0LzQvtC00YPQu9C10LksINGH0YLQvtCx0Ysg0LjQvNC10YLRjCDQuiDQvdC40Lwg0LTQvtGB0YLRg9C/INC40LfQstC90LVcclxuICogQGV4YW1wbGVcclxuICogTWFpbi5Gb3JtLmlzRm9ybVZhbGlkKCk7XHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBEZXZpY2VEZXRlY3Rpb24sXHJcbiAgVG9nZ2xlcnMsXHJcbiAgQ2Fyb3VzZWwsXHJcbiAgTW9kYWwsXHJcbiAgQW5jaG9yLFxyXG4gIElucHV0LFxyXG4gIEZvcm0sXHJcbiAgVGVzdCxcclxuICAvL1NlbGVjdCxcclxuICBPbmVwYWdlXHJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9tYWluLmpzIiwibGV0IGJyZWFrcG9pbnRzID0ge1xyXG5cdHNtOiA1NzYsXHJcblx0bWQ6IDc2OCxcclxuXHRsZzogOTkyLFxyXG5cdHhsOiAxMjAwXHJcbn07XHJcblxyXG5mdW5jdGlvbiBpc01vYmlsZSgpe1xyXG5cdHJldHVybiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gYnJlYWtwb2ludHMuc20pO1xyXG59XHJcbmZ1bmN0aW9uIGlzVGFibGV0KCl7XHJcblx0cmV0dXJuICgkKHdpbmRvdykud2lkdGgoKSA+IGJyZWFrcG9pbnRzLnNtICYmICQod2luZG93KS53aWR0aCgpIDw9IGJyZWFrcG9pbnRzLm1kKVxyXG59XHJcbmZ1bmN0aW9uIGlzVG91Y2goKXtcclxuXHRyZXR1cm4gJ29udG91Y2hzdGFydCcgaW4gd2luZG93IHx8IG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cztcclxufVxyXG5cclxuZnVuY3Rpb24gcnVuKCl7XHJcblx0aWYoaXNUb3VjaCgpKXtcclxuXHRcdCQoJ2h0bWwnKS5yZW1vdmVDbGFzcygnbm8tdG91Y2gnKS5hZGRDbGFzcygndG91Y2gnKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgnaHRtbCcpLnJlbW92ZUNsYXNzKCd0b3VjaCcpLmFkZENsYXNzKCduby10b3VjaCcpO1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7cnVuLCBpc1RvdWNoLCBpc01vYmlsZSwgaXNUYWJsZXR9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9kZXZpY2UtZGV0ZWN0aW9uLmpzIiwiLyoqXHJcbiAqINCf0LXRgNC10LrQu9GO0YfQtdC90LjQtSDQutC70LDRgdGB0L7QsiDQv9C+INGA0LDQt9C70LjRh9C90YvQvCDRgdC+0LHRi9GC0LjRj9C8XHJcbiAqIEBtb2R1bGUgVG9nZ2xlcnNcclxuICovXHJcbiBcclxuZnVuY3Rpb24gdG9nZ2xlQ2xhc3NJZihlbCwgY29uZCwgdG9nZ2xlZENsYXNzKXtcclxuXHRpZihjb25kKXtcclxuXHRcdGVsLmFkZENsYXNzKHRvZ2dsZWRDbGFzcyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGVsLnJlbW92ZUNsYXNzKHRvZ2dsZWRDbGFzcyk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICog0KTRg9C90LrRhtC40Y8g0LTQvtCx0LDQstC70Y/QtdGCINC6INGN0LvQtdC80LXQvdGC0YMg0LrQu9Cw0YHRgSwg0LXRgdC70Lgg0YHRgtGA0LDQvdC40YbQsCDQv9GA0L7QutGA0YPRh9C10L3QsCDQsdC+0LvRjNGI0LUsINGH0LXQvCDQvdCwINGD0LrQsNC30LDQvdC90L7QtSDQt9C90LDRh9C10L3QuNC1LCBcclxuICog0Lgg0YPQsdC40YDQsNC10YIg0LrQu9Cw0YHRgSwg0LXRgdC70Lgg0LfQvdCw0YfQtdC90LjQtSDQvNC10L3RjNGI0LVcclxuICogQHBhcmFtIHtvYmplY3R9IGVsIC0g0Y3Qu9C10LzQtdC90YIsINGBINC60L7RgtC+0YDRi9C8INCy0LfQsNC40LzQvtC00LXQudGB0YLQstGD0LXQvFxyXG4gKiBAcGFyYW0ge21peGVkfSBbc2Nyb2xsVmFsdWU9MF0gLSDQt9C90LDRh9C10L3QuNC1INC/0YDQvtC60YDRg9GC0LrQuCwg0L3QsCDQutC+0YLQvtGA0L7QvCDQvNC10L3Rj9C10LwgY3NzLdC60LvQsNGB0YEsINC+0LbQuNC00LDQtdC80L7QtSDQt9C90LDRh9C10L3QuNC1IC0g0YfQuNGB0LvQviDQuNC70Lgg0LrQu9GO0YfQtdCy0L7QtSDRgdC70L7QstC+ICd0aGlzJy4g0JXRgdC70Lgg0L/QtdGA0LXQtNCw0L3QviAndGhpcycsINC/0L7QtNGB0YLQsNCy0LvRj9C10YLRgdGPINC/0L7Qu9C+0LbQtdC90LjQtSBlbC5vZmZzZXQoKS50b3Ag0LzQuNC90YPRgSDQv9C+0LvQvtCy0LjQvdCwINCy0YvRgdC+0YLRiyDRjdC60YDQsNC90LBcclxuICogQHBhcmFtIHtzdHJpbmd9IFt0b2dnbGVkQ2xhc3M9c2Nyb2xsZWRdIC0gY3NzLdC60LvQsNGB0YEsINC60L7RgtC+0YDRi9C5INC/0LXRgNC10LrQu9GO0YfQsNC10LxcclxuICovXHJcbmZ1bmN0aW9uIHRvZ2dsZUVsZW1lbnRDbGFzc09uU2Nyb2xsKGVsLCBzY3JvbGxWYWx1ZSA9IDAsIHRvZ2dsZWRDbGFzcyA9ICdzY3JvbGxlZCcpe1xyXG5cdGlmKGVsLmxlbmd0aCA9PSAwKSB7XHJcblx0XHQvL2NvbnNvbGUuZXJyb3IoXCLQndC10L7QsdGF0L7QtNC40LzQviDQv9C10YDQtdC00LDRgtGMINC+0LHRitC10LrRgiwg0YEg0LrQvtGC0L7RgNGL0Lwg0LLRiyDRhdC+0YLQuNGC0LUg0LLQt9Cw0LjQvNC+0LTQtdC50YHRgtCy0L7QstCw0YLRjFwiKTtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0XHJcblx0aWYoc2Nyb2xsVmFsdWUgPT0gJ3RoaXMnKSB7XHJcblx0XHRzY3JvbGxWYWx1ZSA9IGVsLm9mZnNldCgpLnRvcCAtICQod2luZG93KS5vdXRlckhlaWdodCgpIC8gMjtcclxuXHR9XHJcblx0XHJcblx0JCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbihlKXtcclxuXHRcdGlmKCQod2luZG93KS5zY3JvbGxUb3AoKSA+IHNjcm9sbFZhbHVlKXtcclxuXHRcdFx0ZWwuYWRkQ2xhc3ModG9nZ2xlZENsYXNzKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGVsLnJlbW92ZUNsYXNzKHRvZ2dsZWRDbGFzcyk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn07XHJcblxyXG4vKipcclxuICog0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YHQvtCx0YvRgtC40Lkg0LTQu9GPINC/0LXRgNC10LrQu9GO0YfQsNGC0LXQu9C10Lkg0LrQu9Cw0YHRgdC+0LJcclxuICogQGV4YW1wbGVcclxuICogVG9nZ2xlcnMuaW5pdCgpO1xyXG4gKi9cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG4gICAgXHJcblx0Ly90b2dnbGVFbGVtZW50Q2xhc3NPblNjcm9sbCgkKCcuaGVhZGVyJyksICQod2luZG93KS5vdXRlckhlaWdodCgpIC8gMyk7XHJcbiAgXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge2luaXQsIHRvZ2dsZUNsYXNzSWYsIHRvZ2dsZUVsZW1lbnRDbGFzc09uU2Nyb2xsfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvdG9nZ2xlcnMuanMiLCIvKipcclxuICog0JrQsNGA0YPRgdC10LvRjFxyXG4gKiBAbW9kdWxlIENhcm91c2VsXHJcbiAqL1xyXG5cclxubGV0IGNhcm91c2VsO1xyXG5cclxuLyoqXHJcbiAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINC60LDRgNGD0YHQtdC70LhcclxuICovXHJcbmZ1bmN0aW9uIGluaXQoKXtcclxuICBjYXJvdXNlbCA9ICQoXCIub3dsLWNhcm91c2VsLmNhcm91c2VsLS1kZWZhdWx0XCIpO1xyXG5cclxuICBjYXJvdXNlbC5vd2xDYXJvdXNlbCh7XHJcbiAgICBpdGVtczogMSxcclxuICAgIG5hdjogdHJ1ZSxcclxuICAgIGRvdHM6IHRydWUsXHJcbiAgICBsb29wOiBmYWxzZSxcclxuICAgIG1vdXNlRHJhZzogZmFsc2UsXHJcbiAgICBhbmltYXRlT3V0OiAnZmFkZU91dCdcclxuICB9KTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7aW5pdH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL2Nhcm91c2VsLmpzIiwiLyoqXHJcbiAqINCS0YHQv9C70YvQstCw0Y7RidC40LUg0L7QutC90LBcclxuICogQG1vZHVsZSBNb2RhbFxyXG4gKi9cclxuXHJcbmxldCBsYXlvdXQgPSAkKCcubGF5b3V0Jyk7XHJcbmxldCBtb2RhbFdyYXBwZXJDbGFzcyA9ICcubW9kYWxfX3dyYXBwZXInO1xyXG4vL2xldCBtb2RhbFdyYXBwZXIgPSAkKCcubW9kYWxfX3dyYXBwZXInKTtcclxuIFxyXG5mdW5jdGlvbiBvcGVuTW9kYWwobW9kYWwsIGlzRnVsbHNjcmVlbiA9IGZhbHNlKSB7XHJcbiAgbGV0IG1vZGFsV3JhcHBlciA9IG1vZGFsLmNsb3Nlc3QobW9kYWxXcmFwcGVyQ2xhc3MpO1xyXG4gIGxldCBtb2RhbEFjdGl2YXRvciA9ICQoJ1tkYXRhLXRhcmdldD1cIiMnICsgbW9kYWwuYXR0cignaWQnKSArICdcIl0nKTtcclxuICBtb2RhbFdyYXBwZXIucmVtb3ZlQ2xhc3MoJ2ludmlzaWJsZScpO1xyXG4gIG1vZGFsLnJlbW92ZUNsYXNzKCdpbnZpc2libGUnKTtcclxuICBsZXQgd3JhcHBlckNsYXNzZXMgPSAnaXMtb3BlbmVkJztcclxuICBpZiAoaXNGdWxsc2NyZWVuKSB7XHJcbiAgICB3cmFwcGVyQ2xhc3NlcyArPSAnIGlzLWZ1bGxzY3JlZW4nO1xyXG4gIH1cclxuICBsYXlvdXQuYWRkQ2xhc3MoJ21vZGFsLW9wZW4nKTtcclxuICBtb2RhbFdyYXBwZXIuYWRkQ2xhc3Mod3JhcHBlckNsYXNzZXMpO1xyXG4gIG1vZGFsLmFkZENsYXNzKCdpcy1vcGVuZWQnKTtcclxuICAkKCdodG1sLCBib2R5JykuY3NzKCdvdmVyZmxvdy15JywgJ2hpZGRlbicpO1xyXG4gIG1vZGFsQWN0aXZhdG9yLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoJ21vZGFsLWlzLW9wZW5lZCcpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbG9zZU1vZGFsKG1vZGFsLCBvcGVuTmV4dCA9IGZhbHNlKSB7XHJcbiAgbGV0IG1vZGFsV3JhcHBlciA9IG1vZGFsLmNsb3Nlc3QobW9kYWxXcmFwcGVyQ2xhc3MpO1xyXG4gIGxldCBtb2RhbEFjdGl2YXRvciA9ICQoJ1tkYXRhLXRhcmdldD1cIiMnICsgbW9kYWwuYXR0cignaWQnKSArICdcIl0nKTtcclxuICBtb2RhbEFjdGl2YXRvci5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdtb2RhbC1pcy1vcGVuZWQnKTtcclxuICB9KTtcclxuICBtb2RhbC5yZW1vdmVDbGFzcygnaXMtb3BlbmVkJyk7XHJcbiAgaWYgKCFvcGVuTmV4dCkge1xyXG4gICAgbGF5b3V0LnJlbW92ZUNsYXNzKCdtb2RhbC1vcGVuJyk7XHJcbiAgICBtb2RhbFdyYXBwZXIucmVtb3ZlQ2xhc3MoJ2lzLW9wZW5lZCBpcy1mdWxsc2NyZWVuJyk7XHJcbiAgICAkKCdodG1sLCBib2R5JykuY3NzKCdvdmVyZmxvdy15JywgJycpO1xyXG4gIH1cclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICBtb2RhbC5hZGRDbGFzcygnaW52aXNpYmxlJyk7XHJcbiAgICBtb2RhbFdyYXBwZXIuYWRkQ2xhc3MoJ2ludmlzaWJsZScpO1xyXG4gIH0sIDMwMCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgdC+0LHRi9GC0LjQuSDQtNC70Y8g0LLRgdC/0LvRi9Cy0LDRjtGJ0LjRhSDQvtC60L7QvVxyXG4gKiBAZXhhbXBsZVxyXG4gKiBNb2RhbC5pbml0KCk7XHJcbiAqL1xyXG5mdW5jdGlvbiBpbml0KCl7XHJcbiAgICBcclxuICAkKCcuanMtbW9kYWwnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBsZXQgdGFyZ2V0ID0gJCh0aGlzKS5hdHRyKCdkYXRhLXRhcmdldCcpO1xyXG4gICAgICBsZXQgbW9kYWwgPSAkKHRhcmdldCk7XHJcbiAgICAgIGxldCBpc0Z1bGxzY3JlZW4gPSBtb2RhbC5hdHRyKCdkYXRhLWZ1bGxzY3JlZW4nKSAhPT0gdW5kZWZpbmVkO1xyXG4gICAgICBpZiAoIW1vZGFsLmhhc0NsYXNzKCdpcy1vcGVuZWQnKSkge1xyXG4gICAgICAgIG9wZW5Nb2RhbChtb2RhbCwgaXNGdWxsc2NyZWVuKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjbG9zZU1vZGFsKG1vZGFsKTtcclxuICAgICAgfVxyXG4gIH0pO1xyXG4gIFxyXG4gICQoJy5tb2RhbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgfSk7XHJcbiAgXHJcbiAgJChtb2RhbFdyYXBwZXJDbGFzcykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgbGV0IG1vZGFsID0gJCh0aGlzKS5maW5kKCcubW9kYWwuaXMtb3BlbmVkJyk7XHJcbiAgICBtb2RhbC5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgIGNsb3NlTW9kYWwoJCh0aGlzKSk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBvcGVuTW9kYWxIYXNoKCkge1xyXG4gICAgICAgIGxldCBoYXNoID0gWydjb21wZXRpdGlvbiddLFxyXG4gICAgICAgICAgICBpc0Z1bGxzY3JlZW4sXHJcbiAgICAgICAgICAgIG1vZGFsLFxyXG4gICAgICAgICAgICBpO1xyXG5cclxuICAgICAgICBmb3IgKGkgPSAwO2kgPCBoYXNoLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICggJyMnK2hhc2hbaV0gPT0gd2luZG93LmxvY2F0aW9uLmhhc2ggJiYgJCgnIycraGFzaFtpXSkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBtb2RhbCA9ICQoJyMnK2hhc2hbaV0pO1xyXG4gICAgICAgICAgICAgICAgaXNGdWxsc2NyZWVuID0gbW9kYWwuYXR0cignZGF0YS1mdWxsc2NyZWVuJykgIT09IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgICAgICAgICBvcGVuTW9kYWwobW9kYWwsIGlzRnVsbHNjcmVlbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb3Blbk1vZGFsSGFzaCgpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0LCBvcGVuTW9kYWwsIGNsb3NlTW9kYWx9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9tb2RhbC5qcyIsIi8qKlxyXG4gKiBBbmNob3Igc2Nyb2xsaW5nXHJcbiAqIEBtb2R1bGUgQW5jaG9yXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gc2Nyb2xsVG9BbmNob3IobmV3cG9zKSB7XHJcbiAgVHdlZW5NYXgudG8od2luZG93LCAwLjUsIHtzY3JvbGxUbzoge3k6IG5ld3Bvcywgb2Zmc2V0WTogMjAwfX0pO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5INGP0LrQvtGA0L3QvtCz0L4g0LzQtdC90Y5cclxuICogQGV4YW1wbGVcclxuICogQW5jaG9yLmluaXQoKTtcclxuICovXHJcbmZ1bmN0aW9uIGluaXQoKXtcclxuICAgIFxyXG4gICQoJy5qcy1hbmNob3InKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgIGxldCBpZCA9ICQodGhpcykuYXR0cignaHJlZicpO1xyXG4gICAgbGV0IHNjcm9sbFRvSUQgPSBpZCArICctdGl0bGUnO1xyXG4gICAgaWYgKCEhJCh0aGlzKS5jbG9zZXN0KCcubW9kYWwnKSkge1xyXG4gICAgICBNYWluLk1vZGFsLmNsb3NlTW9kYWwoJCh0aGlzKS5jbG9zZXN0KCcubW9kYWwnKSk7XHJcbiAgICB9XHJcbiAgICBpZiAoJChpZCkubGVuZ3RoID4gMCAmJiAkKHNjcm9sbFRvSUQpLmxlbmd0aCA+IDApIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBcclxuICAgICAgc2V0VGltZW91dChzY3JvbGxUb0FuY2hvciwgNDAwLCBzY3JvbGxUb0lEKTtcclxuICAgICAgO1xyXG4gICAgICBcclxuICAgICAgLy9pZiAod2luZG93Lmhpc3RvcnkgJiYgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKSB7XHJcbiAgICAgIC8vICBoaXN0b3J5LnB1c2hTdGF0ZShcIlwiLCBkb2N1bWVudC50aXRsZSwgaWQpO1xyXG4gICAgICAvL31cclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7aW5pdH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL2FuY2hvci5qcyIsIi8qKlxyXG4gKiDQnNC+0LTRg9C70Ywg0LTQu9GPINGA0LDQsdC+0YLRiyBwbGFjZWhvbGRlciDQsiDRjdC70LXQvNC10L3RgtCw0YUg0YTQvtGA0LzRiyAoLmZpZWxkKVxyXG4gKiBAbW9kdWxlIElucHV0XHJcbiAqL1xyXG5cclxuXHJcbi8qKlxyXG4gKiDQo9GB0YLQsNC90L7QstC40YLRjCDRhNC+0LrRg9GBXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dFxyXG4gKi9cclxuZnVuY3Rpb24gZm9jdXNMYWJlbChpbnB1dCl7XHJcbiAgICBpbnB1dC5jbG9zZXN0KCcuZmllbGQnKS5hZGRDbGFzcyhcImhhcy1mb2N1c1wiKTtcclxufVxyXG5cclxuLyoqXHJcbiAqINCj0LHRgNCw0YLRjCDRhNC+0LrRg9GBXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dFxyXG4gKi9cclxuZnVuY3Rpb24gYmx1ckxhYmVsKGlucHV0KXtcclxuICAgIHZhciB3cmFwcGVyID0gaW5wdXQuY2xvc2VzdCgnLmZpZWxkJyk7XHJcbiAgICB3cmFwcGVyLnJlbW92ZUNsYXNzKFwiaGFzLWZvY3VzXCIpO1xyXG59XHJcblxyXG4vKipcclxuICog0J/RgNC+0LLQtdGA0LjRgtGMINC40L3Qv9GD0YIg0L3QsCDQvdCw0LvQuNGH0LjQtSB2YWx1ZVxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAcGFyYW0ge29iamVjdH0gaW5wdXRcclxuICovXHJcbmZ1bmN0aW9uIGNoZWNrSW5wdXQoaW5wdXQpe1xyXG4gICAgdmFyIHdyYXBwZXIgPSBpbnB1dC5jbG9zZXN0KCcuZmllbGQnKTtcclxuICAgIGlmIChpbnB1dC52YWwoKS5sZW5ndGggPiAwKVxyXG4gICAgICAgIHdyYXBwZXIuYWRkQ2xhc3MoXCJoYXMtdmFsdWVcIik7XHJcbiAgICBlbHNlXHJcbiAgICAgICAgd3JhcHBlci5yZW1vdmVDbGFzcyhcImhhcy12YWx1ZVwiKTtcclxufVxyXG5cclxuLyoqXHJcbiAqINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5INC00LvRjyDQuNC90L/Rg9GC0LBcclxuICogQGV4YW1wbGVcclxuICogSW5wdXQuaW5pdCgpO1xyXG4gKi9cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG4gICAgbGV0IGlucHV0cyA9ICQoJy5maWVsZF9faW5wdXQnKTtcclxuICAgIGxldCBwbGFjZWhvbGRlcnMgPSAkKCcuZmllbGRfX3BsYWNlaG9sZGVyJyk7XHJcbiAgICBcclxuICAgIHBsYWNlaG9sZGVycy5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5maWVsZCcpLmZpbmQoJy5maWVsZF9faW5wdXQnKS5mb2N1cygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaW5wdXRzLmVhY2goZnVuY3Rpb24oaSwgaXRlbSkge1xyXG4gICAgICAgIGNoZWNrSW5wdXQoJChpdGVtKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpbnB1dHMuZm9jdXMoZnVuY3Rpb24oKXtcclxuICAgICAgICBmb2N1c0xhYmVsKCQodGhpcykpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaW5wdXRzLmJsdXIoZnVuY3Rpb24oKXtcclxuICAgICAgICBibHVyTGFiZWwoJCh0aGlzKSk7XHJcbiAgICAgICAgY2hlY2tJbnB1dCgkKHRoaXMpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0fTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvaW5wdXQuanMiLCIvKipcclxuICog0JzQvtC00YPQu9GMINC00LvRjyDRgNCw0LHQvtGC0Ysg0KTQvtGA0LxcclxuICogQG1vZHVsZSBGb3JtXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gdmFsaWRhdGVGaWVsZChmaWVsZCkge1xyXG4gIGxldCBpc1ZhbGlkID0gZmllbGQudmFsaWRpdHkudmFsaWQ7XHJcbiAgbGV0IGZpZWxkQ29udGFpbmVyID0gJChmaWVsZCkuY2xvc2VzdCgnLmZpZWxkJyk7XHJcbiAgaWYgKGlzVmFsaWQpIHtcclxuICAgIGZpZWxkQ29udGFpbmVyLnJlbW92ZUNsYXNzKCdoYXMtZXJyb3InKTtcclxuICB9IGVsc2Uge1xyXG4gICAgZmllbGRDb250YWluZXIuYWRkQ2xhc3MoJ2hhcy1lcnJvcicpO1xyXG4gIH1cclxuICByZXR1cm4gaXNWYWxpZDtcclxufVxyXG5cclxuZnVuY3Rpb24gdmFsaWRhdGVGb3JtKGVsRm9ybSkge1xyXG4gIGxldCBlcnJvcnMgPSAwO1xyXG4gIEFycmF5LmZyb20oZWxGb3JtLmVsZW1lbnRzKS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgIGxldCBpc1ZhbGlkRmllbGQgPSB2YWxpZGF0ZUZpZWxkKGl0ZW0pO1xyXG4gICAgaWYoIWlzVmFsaWRGaWVsZCkge1xyXG4gICAgICBlcnJvcnMgKz0gMTtcclxuICAgIH1cclxuICB9KTtcclxuICByZXR1cm4gZXJyb3JzO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5INGE0L7RgNC8XHJcbiAqIEBleGFtcGxlXHJcbiAqIEZvcm0uaW5pdCgpO1xyXG4gKi9cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG4gIGxldCBqc0Zvcm0gPSAkKCcuanMtZm9ybScpO1xyXG4gIFxyXG4gIGpzRm9ybS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgc2VsZiA9ICQodGhpcyk7XHJcbiAgICBsZXQgc2VsZkZvcm0gPSBzZWxmLmZpbmQoJy5qcy1mb3JtLWZvcm0nKTtcclxuICAgIGxldCBzZWxmUmVzdWx0ID0gc2VsZi5maW5kKCcuanMtZm9ybS1yZXN1bHQnKTtcclxuICAgIGxldCBzZWxmU3VibWl0ID0gc2VsZi5maW5kKCcuanMtZm9ybS1zdWJtaXQnKTtcclxuICAgIFxyXG4gICAgc2VsZlN1Ym1pdC5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgbGV0IGhhc0Vycm9yID0gdmFsaWRhdGVGb3JtKHNlbGZGb3JtWzBdKTtcclxuICAgICAgaWYgKCFoYXNFcnJvcikge1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gc3VibWl0aW9uIGNvZGUgaGVyZSFcclxuICAgICAgICAvL1xyXG4gICAgICAgIHNlbGYuYWRkQ2xhc3MoJ2lzLXN1Ym1pdHRlZCcpO1xyXG4gICAgICAgIC8vc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vICBzZWxmRm9ybS5oaWRlKCk7XHJcbiAgICAgICAgLy99LCA1MDApO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgIHNlbGZSZXN1bHQuc2hvdygpO1xyXG4gICAgICAgIH0sIDMwMCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0fTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvZm9ybS5qcyIsIi8qKlxyXG4gKiBPbmVwYWdlIFNjcm9sbFxyXG4gKiBAbW9kdWxlIE9uZXBhZ2VcclxuICovXHJcblxyXG5sZXQgb25lcGFnZTtcclxuXHJcbi8qKlxyXG4gKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyBvbmVwYWdlXHJcbiAqL1xyXG5mdW5jdGlvbiBpbml0KCl7XHJcbiAgb25lcGFnZSA9ICQoXCIub25lcGFnZS13cmFwcGVyXCIpO1xyXG4gIFxyXG4gIGlmIChvbmVwYWdlLmxlbmd0aCA+IDApIHtcclxuICAgIG9uZXBhZ2Uub25lcGFnZV9zY3JvbGwoe1xyXG4gICAgICBzZWN0aW9uQ29udGFpbmVyOiBcIi5vbmVwYWdlLXNlY3Rpb25cIixcclxuICAgICAgcGFnaW5hdGlvbjogdHJ1ZSxcclxuICAgICAgdXBkYXRlVXJsOiBmYWxzZSxcclxuICAgICAgbG9vcDogZmFsc2UsXHJcbiAgICAgIHJlc3BvbnNpdmVGYWxsYmFjazogNjAwXHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7aW5pdH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL29uZXBhZ2Utc2Nyb2xsLmpzIiwiLyoqXHJcbiAqINCi0LXRgdGCXHJcbiAqIEBtb2R1bGUgVGVzdFxyXG4gKi9cclxuXHJcbmxldCByZXN1bHQgPSB7XHJcbiAgXCJhXCI6IDAsXHJcbiAgXCJiXCI6IDAsXHJcbiAgXCJjXCI6IDAsXHJcbiAgXCJkXCI6IDBcclxufTtcclxubGV0IHBhZ2VzID0ge1xyXG4gIFwiYVwiOiBcInJlc3VsdC1yb21hbnRpYy5odG1sXCIsXHJcbiAgXCJiXCI6IFwicmVzdWx0LWZhbnRhc3kuaHRtbFwiLFxyXG4gIFwiY1wiOiBcInJlc3VsdC1wcmFjdGljYWwuaHRtbFwiLFxyXG4gIFwiZFwiOiBcInJlc3VsdC11bnByb21wdGVkLmh0bWxcIlxyXG59O1xyXG5sZXQgY2Fyb3VzZWwgPSAkKFwiLm93bC1jYXJvdXNlbC5jYXJvdXNlbC0tdGVzdFwiKTtcclxubGV0IHRlc3RDdHJsID0gJCgnLmpzLXRlc3QtY3RybCcpO1xyXG5cclxuZnVuY3Rpb24gaXNMYXN0U2xpZGUoKSB7XHJcbiAgcmV0dXJuIGNhcm91c2VsLmZpbmQoJy5vd2wtaXRlbScpLmZpbHRlcignOmxhc3QnKS5oYXNDbGFzcygnYWN0aXZlJyk7XHJcbn1cclxuZnVuY3Rpb24gZ2V0UGFnZShhbnN3ZXIpIHtcclxuICBsZXQgcGFnZVVybCA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyAnLyc7XHJcbiAgcGFnZVVybCArPSBwYWdlc1thbnN3ZXJdO1xyXG4gIHJldHVybiBwYWdlVXJsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwcm9jZXNzVGVzdChlbCwgaXNMYXN0U2xpZGUgPSBmYWxzZSkge1xyXG4gIGxldCBrZXkgPSAkKGVsKS5hdHRyKCdkYXRhLWtleScpO1xyXG4gIHJlc3VsdFtrZXldICs9IDE7XHJcbiAgaWYgKCFpc0xhc3RTbGlkZSkge1xyXG4gICAgc2hvd05leHQoZWwpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBzaG93UmVzdWx0KHJlc3VsdCk7XHJcbiAgfVxyXG59XHJcbmZ1bmN0aW9uIHNob3dOZXh0KGVsKSB7XHJcbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgIGNhcm91c2VsLnRyaWdnZXIoJ25leHQub3dsLmNhcm91c2VsJyk7XHJcbiAgfSwgMzAwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZXh0cmFjdEtleVZhbHVlKG9iaiwgdmFsdWUpIHtcclxuICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopW09iamVjdC52YWx1ZXMob2JqKS5pbmRleE9mKHZhbHVlKV07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhbGN1bGF0ZVJlc3VsdChyZXN1bHQpIHtcclxuICBsZXQgYXJyID0gT2JqZWN0LnZhbHVlcyhyZXN1bHQpO1xyXG4gIGxldCBtYXggPSBNYXRoLm1heCguLi5hcnIpO1xyXG4gIGxldCBtYXhLZXkgPSBleHRyYWN0S2V5VmFsdWUocmVzdWx0LCBtYXgpO1xyXG4gIHJldHVybiBtYXhLZXk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dSZXN1bHQocmVzdWx0KSB7XHJcbiAgbGV0IGFuc3dlciA9IGNhbGN1bGF0ZVJlc3VsdChyZXN1bHQpO1xyXG4gIGxldCBwYWdlID0gZ2V0UGFnZShhbnN3ZXIpO1xyXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcGFnZTtcclxuICB9LCAzMDAsIHBhZ2UpO1xyXG59XHJcblxyXG4vKipcclxuICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0LrQsNGA0YPRgdC10LvQuFxyXG4gKi9cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG5cclxuICBjYXJvdXNlbC5vd2xDYXJvdXNlbCh7XHJcbiAgICBpdGVtczogMSxcclxuICAgIG5hdjogZmFsc2UsXHJcbiAgICBkb3RzOiB0cnVlLFxyXG4gICAgbG9vcDogZmFsc2UsXHJcbiAgICBtb3VzZURyYWc6IGZhbHNlLFxyXG4gICAgdG91Y2hEcmFnOiBmYWxzZSxcclxuICAgIHB1bGxEcmFnOiBmYWxzZSxcclxuICAgIGFuaW1hdGVPdXQ6ICdmYWRlT3V0J1xyXG4gIH0pO1xyXG4gIFxyXG4gIHRlc3RDdHJsLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICBwcm9jZXNzVGVzdCh0aGlzLCBpc0xhc3RTbGlkZSgpKTtcclxuICB9KTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7aW5pdH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL3Rlc3QuanMiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVZBOzs7Ozs7OztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDeEJBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQU9BO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNqREE7Ozs7O0FBS0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBUUE7QUFDQTs7Ozs7Ozs7O0FDdEJBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUM3RkE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ25DQTs7Ozs7QUFNQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ2hFQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUM1REE7Ozs7O0FBS0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3ZCQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBO0FBQ0E7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Iiwic291cmNlUm9vdCI6IiJ9