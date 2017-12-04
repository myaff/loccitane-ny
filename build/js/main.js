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

	  $(modalWrapperClass).on('click', function (e) {
	    if ($(e.target).hasClass('modal__wrapper')) {
	      var modal = $(this).find('.modal.is-opened');
	      modal.each(function () {
	        closeModal($(this));
	      });
	    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiOTg1NTM3YTE4MmQwYzcxM2I0OSIsIndlYnBhY2s6Ly8vc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2RldmljZS1kZXRlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL3RvZ2dsZXJzLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy9jYXJvdXNlbC5qcyIsIndlYnBhY2s6Ly8vc3JjL2pzL2NvbXBvbmVudHMvbW9kYWwuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2FuY2hvci5qcyIsIndlYnBhY2s6Ly8vc3JjL2pzL2NvbXBvbmVudHMvaW5wdXQuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2Zvcm0uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL29uZXBhZ2Utc2Nyb2xsLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy90ZXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9jYWx2aW4ta2xlaW4vYnVpbGQvanMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYjk4NTUzN2ExODJkMGM3MTNiNDkiLCJsZXQgRGV2aWNlRGV0ZWN0aW9uID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9kZXZpY2UtZGV0ZWN0aW9uXCIpO1xyXG5sZXQgVG9nZ2xlcnMgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL3RvZ2dsZXJzXCIpO1xyXG5sZXQgQ2Fyb3VzZWwgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2Nhcm91c2VsXCIpO1xyXG5sZXQgTW9kYWwgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL21vZGFsXCIpO1xyXG5sZXQgQW5jaG9yID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9hbmNob3JcIik7XHJcbmxldCBJbnB1dCA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvaW5wdXRcIik7XHJcbi8vbGV0IFNlbGVjdCA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvc2VsZWN0XCIpO1xyXG5sZXQgRm9ybSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvZm9ybVwiKTtcclxubGV0IE9uZXBhZ2UgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL29uZXBhZ2Utc2Nyb2xsXCIpO1xyXG5sZXQgVGVzdCA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvdGVzdFwiKTtcclxuLy9sZXQgQW5pbWF0aW9uID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9hbmltYXRpb25cIik7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gIFxyXG4gIERldmljZURldGVjdGlvbi5ydW4oKTtcclxuICBUb2dnbGVycy5pbml0KCk7XHJcbiAgQ2Fyb3VzZWwuaW5pdCgpO1xyXG4gIE1vZGFsLmluaXQoKTtcclxuICBBbmNob3IuaW5pdCgpO1xyXG4gIElucHV0LmluaXQoKTtcclxuICBGb3JtLmluaXQoKTtcclxuICBUZXN0LmluaXQoKTtcclxuICAvL1NlbGVjdC5pbml0KCk7XHJcbiAgT25lcGFnZS5pbml0KCk7XHJcbiAgLy9BbmltYXRpb24uaW5pdCgpO1xyXG4gIFxyXG59KTtcclxuXHJcblxyXG4vKipcclxuICog0KHQv9C40YHQvtC6INGN0LrRgdC/0L7RgNGC0LjRgNGD0LXQvNGL0YUg0LzQvtC00YPQu9C10LksINGH0YLQvtCx0Ysg0LjQvNC10YLRjCDQuiDQvdC40Lwg0LTQvtGB0YLRg9C/INC40LfQstC90LVcclxuICogQGV4YW1wbGVcclxuICogTWFpbi5Gb3JtLmlzRm9ybVZhbGlkKCk7XHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBEZXZpY2VEZXRlY3Rpb24sXHJcbiAgVG9nZ2xlcnMsXHJcbiAgQ2Fyb3VzZWwsXHJcbiAgTW9kYWwsXHJcbiAgQW5jaG9yLFxyXG4gIElucHV0LFxyXG4gIEZvcm0sXHJcbiAgVGVzdCxcclxuICAvL1NlbGVjdCxcclxuICBPbmVwYWdlXHJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9tYWluLmpzIiwibGV0IGJyZWFrcG9pbnRzID0ge1xyXG5cdHNtOiA1NzYsXHJcblx0bWQ6IDc2OCxcclxuXHRsZzogOTkyLFxyXG5cdHhsOiAxMjAwXHJcbn07XHJcblxyXG5mdW5jdGlvbiBpc01vYmlsZSgpe1xyXG5cdHJldHVybiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gYnJlYWtwb2ludHMuc20pO1xyXG59XHJcbmZ1bmN0aW9uIGlzVGFibGV0KCl7XHJcblx0cmV0dXJuICgkKHdpbmRvdykud2lkdGgoKSA+IGJyZWFrcG9pbnRzLnNtICYmICQod2luZG93KS53aWR0aCgpIDw9IGJyZWFrcG9pbnRzLm1kKVxyXG59XHJcbmZ1bmN0aW9uIGlzVG91Y2goKXtcclxuXHRyZXR1cm4gJ29udG91Y2hzdGFydCcgaW4gd2luZG93IHx8IG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cztcclxufVxyXG5cclxuZnVuY3Rpb24gcnVuKCl7XHJcblx0aWYoaXNUb3VjaCgpKXtcclxuXHRcdCQoJ2h0bWwnKS5yZW1vdmVDbGFzcygnbm8tdG91Y2gnKS5hZGRDbGFzcygndG91Y2gnKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgnaHRtbCcpLnJlbW92ZUNsYXNzKCd0b3VjaCcpLmFkZENsYXNzKCduby10b3VjaCcpO1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7cnVuLCBpc1RvdWNoLCBpc01vYmlsZSwgaXNUYWJsZXR9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9kZXZpY2UtZGV0ZWN0aW9uLmpzIiwiLyoqXHJcbiAqINCf0LXRgNC10LrQu9GO0YfQtdC90LjQtSDQutC70LDRgdGB0L7QsiDQv9C+INGA0LDQt9C70LjRh9C90YvQvCDRgdC+0LHRi9GC0LjRj9C8XHJcbiAqIEBtb2R1bGUgVG9nZ2xlcnNcclxuICovXHJcbiBcclxuZnVuY3Rpb24gdG9nZ2xlQ2xhc3NJZihlbCwgY29uZCwgdG9nZ2xlZENsYXNzKXtcclxuXHRpZihjb25kKXtcclxuXHRcdGVsLmFkZENsYXNzKHRvZ2dsZWRDbGFzcyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGVsLnJlbW92ZUNsYXNzKHRvZ2dsZWRDbGFzcyk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICog0KTRg9C90LrRhtC40Y8g0LTQvtCx0LDQstC70Y/QtdGCINC6INGN0LvQtdC80LXQvdGC0YMg0LrQu9Cw0YHRgSwg0LXRgdC70Lgg0YHRgtGA0LDQvdC40YbQsCDQv9GA0L7QutGA0YPRh9C10L3QsCDQsdC+0LvRjNGI0LUsINGH0LXQvCDQvdCwINGD0LrQsNC30LDQvdC90L7QtSDQt9C90LDRh9C10L3QuNC1LCBcclxuICog0Lgg0YPQsdC40YDQsNC10YIg0LrQu9Cw0YHRgSwg0LXRgdC70Lgg0LfQvdCw0YfQtdC90LjQtSDQvNC10L3RjNGI0LVcclxuICogQHBhcmFtIHtvYmplY3R9IGVsIC0g0Y3Qu9C10LzQtdC90YIsINGBINC60L7RgtC+0YDRi9C8INCy0LfQsNC40LzQvtC00LXQudGB0YLQstGD0LXQvFxyXG4gKiBAcGFyYW0ge21peGVkfSBbc2Nyb2xsVmFsdWU9MF0gLSDQt9C90LDRh9C10L3QuNC1INC/0YDQvtC60YDRg9GC0LrQuCwg0L3QsCDQutC+0YLQvtGA0L7QvCDQvNC10L3Rj9C10LwgY3NzLdC60LvQsNGB0YEsINC+0LbQuNC00LDQtdC80L7QtSDQt9C90LDRh9C10L3QuNC1IC0g0YfQuNGB0LvQviDQuNC70Lgg0LrQu9GO0YfQtdCy0L7QtSDRgdC70L7QstC+ICd0aGlzJy4g0JXRgdC70Lgg0L/QtdGA0LXQtNCw0L3QviAndGhpcycsINC/0L7QtNGB0YLQsNCy0LvRj9C10YLRgdGPINC/0L7Qu9C+0LbQtdC90LjQtSBlbC5vZmZzZXQoKS50b3Ag0LzQuNC90YPRgSDQv9C+0LvQvtCy0LjQvdCwINCy0YvRgdC+0YLRiyDRjdC60YDQsNC90LBcclxuICogQHBhcmFtIHtzdHJpbmd9IFt0b2dnbGVkQ2xhc3M9c2Nyb2xsZWRdIC0gY3NzLdC60LvQsNGB0YEsINC60L7RgtC+0YDRi9C5INC/0LXRgNC10LrQu9GO0YfQsNC10LxcclxuICovXHJcbmZ1bmN0aW9uIHRvZ2dsZUVsZW1lbnRDbGFzc09uU2Nyb2xsKGVsLCBzY3JvbGxWYWx1ZSA9IDAsIHRvZ2dsZWRDbGFzcyA9ICdzY3JvbGxlZCcpe1xyXG5cdGlmKGVsLmxlbmd0aCA9PSAwKSB7XHJcblx0XHQvL2NvbnNvbGUuZXJyb3IoXCLQndC10L7QsdGF0L7QtNC40LzQviDQv9C10YDQtdC00LDRgtGMINC+0LHRitC10LrRgiwg0YEg0LrQvtGC0L7RgNGL0Lwg0LLRiyDRhdC+0YLQuNGC0LUg0LLQt9Cw0LjQvNC+0LTQtdC50YHRgtCy0L7QstCw0YLRjFwiKTtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0XHJcblx0aWYoc2Nyb2xsVmFsdWUgPT0gJ3RoaXMnKSB7XHJcblx0XHRzY3JvbGxWYWx1ZSA9IGVsLm9mZnNldCgpLnRvcCAtICQod2luZG93KS5vdXRlckhlaWdodCgpIC8gMjtcclxuXHR9XHJcblx0XHJcblx0JCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbihlKXtcclxuXHRcdGlmKCQod2luZG93KS5zY3JvbGxUb3AoKSA+IHNjcm9sbFZhbHVlKXtcclxuXHRcdFx0ZWwuYWRkQ2xhc3ModG9nZ2xlZENsYXNzKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGVsLnJlbW92ZUNsYXNzKHRvZ2dsZWRDbGFzcyk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn07XHJcblxyXG4vKipcclxuICog0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YHQvtCx0YvRgtC40Lkg0LTQu9GPINC/0LXRgNC10LrQu9GO0YfQsNGC0LXQu9C10Lkg0LrQu9Cw0YHRgdC+0LJcclxuICogQGV4YW1wbGVcclxuICogVG9nZ2xlcnMuaW5pdCgpO1xyXG4gKi9cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG4gICAgXHJcblx0Ly90b2dnbGVFbGVtZW50Q2xhc3NPblNjcm9sbCgkKCcuaGVhZGVyJyksICQod2luZG93KS5vdXRlckhlaWdodCgpIC8gMyk7XHJcbiAgXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge2luaXQsIHRvZ2dsZUNsYXNzSWYsIHRvZ2dsZUVsZW1lbnRDbGFzc09uU2Nyb2xsfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvdG9nZ2xlcnMuanMiLCIvKipcclxuICog0JrQsNGA0YPRgdC10LvRjFxyXG4gKiBAbW9kdWxlIENhcm91c2VsXHJcbiAqL1xyXG5cclxubGV0IGNhcm91c2VsO1xyXG5cclxuLyoqXHJcbiAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINC60LDRgNGD0YHQtdC70LhcclxuICovXHJcbmZ1bmN0aW9uIGluaXQoKXtcclxuICBjYXJvdXNlbCA9ICQoXCIub3dsLWNhcm91c2VsLmNhcm91c2VsLS1kZWZhdWx0XCIpO1xyXG5cclxuICBjYXJvdXNlbC5vd2xDYXJvdXNlbCh7XHJcbiAgICBpdGVtczogMSxcclxuICAgIG5hdjogdHJ1ZSxcclxuICAgIGRvdHM6IHRydWUsXHJcbiAgICBsb29wOiBmYWxzZSxcclxuICAgIG1vdXNlRHJhZzogZmFsc2UsXHJcbiAgICBhbmltYXRlT3V0OiAnZmFkZU91dCdcclxuICB9KTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7aW5pdH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL2Nhcm91c2VsLmpzIiwiLyoqXHJcbiAqINCS0YHQv9C70YvQstCw0Y7RidC40LUg0L7QutC90LBcclxuICogQG1vZHVsZSBNb2RhbFxyXG4gKi9cclxuXHJcbmxldCBsYXlvdXQgPSAkKCcubGF5b3V0Jyk7XHJcbmxldCBtb2RhbFdyYXBwZXJDbGFzcyA9ICcubW9kYWxfX3dyYXBwZXInO1xyXG4vL2xldCBtb2RhbFdyYXBwZXIgPSAkKCcubW9kYWxfX3dyYXBwZXInKTtcclxuIFxyXG5mdW5jdGlvbiBvcGVuTW9kYWwobW9kYWwsIGlzRnVsbHNjcmVlbiA9IGZhbHNlKSB7XHJcbiAgbGV0IG1vZGFsV3JhcHBlciA9IG1vZGFsLmNsb3Nlc3QobW9kYWxXcmFwcGVyQ2xhc3MpO1xyXG4gIGxldCBtb2RhbEFjdGl2YXRvciA9ICQoJ1tkYXRhLXRhcmdldD1cIiMnICsgbW9kYWwuYXR0cignaWQnKSArICdcIl0nKTtcclxuICBtb2RhbFdyYXBwZXIucmVtb3ZlQ2xhc3MoJ2ludmlzaWJsZScpO1xyXG4gIG1vZGFsLnJlbW92ZUNsYXNzKCdpbnZpc2libGUnKTtcclxuICBsZXQgd3JhcHBlckNsYXNzZXMgPSAnaXMtb3BlbmVkJztcclxuICBpZiAoaXNGdWxsc2NyZWVuKSB7XHJcbiAgICB3cmFwcGVyQ2xhc3NlcyArPSAnIGlzLWZ1bGxzY3JlZW4nO1xyXG4gIH1cclxuICBsYXlvdXQuYWRkQ2xhc3MoJ21vZGFsLW9wZW4nKTtcclxuICBtb2RhbFdyYXBwZXIuYWRkQ2xhc3Mod3JhcHBlckNsYXNzZXMpO1xyXG4gIG1vZGFsLmFkZENsYXNzKCdpcy1vcGVuZWQnKTtcclxuICAkKCdodG1sLCBib2R5JykuY3NzKCdvdmVyZmxvdy15JywgJ2hpZGRlbicpO1xyXG4gIG1vZGFsQWN0aXZhdG9yLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoJ21vZGFsLWlzLW9wZW5lZCcpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbG9zZU1vZGFsKG1vZGFsLCBvcGVuTmV4dCA9IGZhbHNlKSB7XHJcbiAgbGV0IG1vZGFsV3JhcHBlciA9IG1vZGFsLmNsb3Nlc3QobW9kYWxXcmFwcGVyQ2xhc3MpO1xyXG4gIGxldCBtb2RhbEFjdGl2YXRvciA9ICQoJ1tkYXRhLXRhcmdldD1cIiMnICsgbW9kYWwuYXR0cignaWQnKSArICdcIl0nKTtcclxuICBtb2RhbEFjdGl2YXRvci5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdtb2RhbC1pcy1vcGVuZWQnKTtcclxuICB9KTtcclxuICBtb2RhbC5yZW1vdmVDbGFzcygnaXMtb3BlbmVkJyk7XHJcbiAgaWYgKCFvcGVuTmV4dCkge1xyXG4gICAgbGF5b3V0LnJlbW92ZUNsYXNzKCdtb2RhbC1vcGVuJyk7XHJcbiAgICBtb2RhbFdyYXBwZXIucmVtb3ZlQ2xhc3MoJ2lzLW9wZW5lZCBpcy1mdWxsc2NyZWVuJyk7XHJcbiAgICAkKCdodG1sLCBib2R5JykuY3NzKCdvdmVyZmxvdy15JywgJycpO1xyXG4gIH1cclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICBtb2RhbC5hZGRDbGFzcygnaW52aXNpYmxlJyk7XHJcbiAgICBtb2RhbFdyYXBwZXIuYWRkQ2xhc3MoJ2ludmlzaWJsZScpO1xyXG4gIH0sIDMwMCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgdC+0LHRi9GC0LjQuSDQtNC70Y8g0LLRgdC/0LvRi9Cy0LDRjtGJ0LjRhSDQvtC60L7QvVxyXG4gKiBAZXhhbXBsZVxyXG4gKiBNb2RhbC5pbml0KCk7XHJcbiAqL1xyXG5mdW5jdGlvbiBpbml0KCl7XHJcbiAgICBcclxuICAkKCcuanMtbW9kYWwnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBsZXQgdGFyZ2V0ID0gJCh0aGlzKS5hdHRyKCdkYXRhLXRhcmdldCcpO1xyXG4gICAgICBsZXQgbW9kYWwgPSAkKHRhcmdldCk7XHJcbiAgICAgIGxldCBpc0Z1bGxzY3JlZW4gPSBtb2RhbC5hdHRyKCdkYXRhLWZ1bGxzY3JlZW4nKSAhPT0gdW5kZWZpbmVkO1xyXG4gICAgICBpZiAoIW1vZGFsLmhhc0NsYXNzKCdpcy1vcGVuZWQnKSkge1xyXG4gICAgICAgIG9wZW5Nb2RhbChtb2RhbCwgaXNGdWxsc2NyZWVuKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjbG9zZU1vZGFsKG1vZGFsKTtcclxuICAgICAgfVxyXG4gIH0pO1xyXG4gIFxyXG4gICQobW9kYWxXcmFwcGVyQ2xhc3MpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgIGlmICgkKGUudGFyZ2V0KS5oYXNDbGFzcygnbW9kYWxfX3dyYXBwZXInKSkge1xyXG4gICAgICBsZXQgbW9kYWwgPSAkKHRoaXMpLmZpbmQoJy5tb2RhbC5pcy1vcGVuZWQnKTtcclxuICAgICAgbW9kYWwuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgIGNsb3NlTW9kYWwoJCh0aGlzKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIG9wZW5Nb2RhbEhhc2goKSB7XHJcbiAgICAgICAgbGV0IGhhc2ggPSBbJ2NvbXBldGl0aW9uJ10sXHJcbiAgICAgICAgICAgIGlzRnVsbHNjcmVlbixcclxuICAgICAgICAgICAgbW9kYWwsXHJcbiAgICAgICAgICAgIGk7XHJcblxyXG4gICAgICAgIGZvciAoaSA9IDA7aSA8IGhhc2gubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCAnIycraGFzaFtpXSA9PSB3aW5kb3cubG9jYXRpb24uaGFzaCAmJiAkKCcjJytoYXNoW2ldKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIG1vZGFsID0gJCgnIycraGFzaFtpXSk7XHJcbiAgICAgICAgICAgICAgICBpc0Z1bGxzY3JlZW4gPSBtb2RhbC5hdHRyKCdkYXRhLWZ1bGxzY3JlZW4nKSAhPT0gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgICAgIG9wZW5Nb2RhbChtb2RhbCwgaXNGdWxsc2NyZWVuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvcGVuTW9kYWxIYXNoKCk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge2luaXQsIG9wZW5Nb2RhbCwgY2xvc2VNb2RhbH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL21vZGFsLmpzIiwiLyoqXHJcbiAqIEFuY2hvciBzY3JvbGxpbmdcclxuICogQG1vZHVsZSBBbmNob3JcclxuICovXHJcblxyXG5mdW5jdGlvbiBzY3JvbGxUb0FuY2hvcihuZXdwb3MpIHtcclxuICBUd2Vlbk1heC50byh3aW5kb3csIDAuNSwge3Njcm9sbFRvOiB7eTogbmV3cG9zLCBvZmZzZXRZOiAyMDB9fSk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICog0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YHQvtCx0YvRgtC40Lkg0Y/QutC+0YDQvdC+0LPQviDQvNC10L3RjlxyXG4gKiBAZXhhbXBsZVxyXG4gKiBBbmNob3IuaW5pdCgpO1xyXG4gKi9cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG4gICAgXHJcbiAgJCgnLmpzLWFuY2hvcicpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgbGV0IGlkID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XHJcbiAgICBsZXQgc2Nyb2xsVG9JRCA9IGlkICsgJy10aXRsZSc7XHJcbiAgICBpZiAoISEkKHRoaXMpLmNsb3Nlc3QoJy5tb2RhbCcpKSB7XHJcbiAgICAgIE1haW4uTW9kYWwuY2xvc2VNb2RhbCgkKHRoaXMpLmNsb3Nlc3QoJy5tb2RhbCcpKTtcclxuICAgIH1cclxuICAgIGlmICgkKGlkKS5sZW5ndGggPiAwICYmICQoc2Nyb2xsVG9JRCkubGVuZ3RoID4gMCkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIFxyXG4gICAgICBzZXRUaW1lb3V0KHNjcm9sbFRvQW5jaG9yLCA0MDAsIHNjcm9sbFRvSUQpO1xyXG4gICAgICA7XHJcbiAgICAgIFxyXG4gICAgICAvL2lmICh3aW5kb3cuaGlzdG9yeSAmJiB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUpIHtcclxuICAgICAgLy8gIGhpc3RvcnkucHVzaFN0YXRlKFwiXCIsIGRvY3VtZW50LnRpdGxlLCBpZCk7XHJcbiAgICAgIC8vfVxyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0fTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvYW5jaG9yLmpzIiwiLyoqXHJcbiAqINCc0L7QtNGD0LvRjCDQtNC70Y8g0YDQsNCx0L7RgtGLIHBsYWNlaG9sZGVyINCyINGN0LvQtdC80LXQvdGC0LDRhSDRhNC+0YDQvNGLICguZmllbGQpXHJcbiAqIEBtb2R1bGUgSW5wdXRcclxuICovXHJcblxyXG5cclxuLyoqXHJcbiAqINCj0YHRgtCw0L3QvtCy0LjRgtGMINGE0L7QutGD0YFcclxuICogQHByaXZhdGVcclxuICogQHBhcmFtIHtvYmplY3R9IGlucHV0XHJcbiAqL1xyXG5mdW5jdGlvbiBmb2N1c0xhYmVsKGlucHV0KXtcclxuICAgIGlucHV0LmNsb3Nlc3QoJy5maWVsZCcpLmFkZENsYXNzKFwiaGFzLWZvY3VzXCIpO1xyXG59XHJcblxyXG4vKipcclxuICog0KPQsdGA0LDRgtGMINGE0L7QutGD0YFcclxuICogQHByaXZhdGVcclxuICogQHBhcmFtIHtvYmplY3R9IGlucHV0XHJcbiAqL1xyXG5mdW5jdGlvbiBibHVyTGFiZWwoaW5wdXQpe1xyXG4gICAgdmFyIHdyYXBwZXIgPSBpbnB1dC5jbG9zZXN0KCcuZmllbGQnKTtcclxuICAgIHdyYXBwZXIucmVtb3ZlQ2xhc3MoXCJoYXMtZm9jdXNcIik7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDQn9GA0L7QstC10YDQuNGC0Ywg0LjQvdC/0YPRgiDQvdCwINC90LDQu9C40YfQuNC1IHZhbHVlXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dFxyXG4gKi9cclxuZnVuY3Rpb24gY2hlY2tJbnB1dChpbnB1dCl7XHJcbiAgICB2YXIgd3JhcHBlciA9IGlucHV0LmNsb3Nlc3QoJy5maWVsZCcpO1xyXG4gICAgaWYgKGlucHV0LnZhbCgpLmxlbmd0aCA+IDApXHJcbiAgICAgICAgd3JhcHBlci5hZGRDbGFzcyhcImhhcy12YWx1ZVwiKTtcclxuICAgIGVsc2VcclxuICAgICAgICB3cmFwcGVyLnJlbW92ZUNsYXNzKFwiaGFzLXZhbHVlXCIpO1xyXG59XHJcblxyXG4vKipcclxuICog0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YHQvtCx0YvRgtC40Lkg0LTQu9GPINC40L3Qv9GD0YLQsFxyXG4gKiBAZXhhbXBsZVxyXG4gKiBJbnB1dC5pbml0KCk7XHJcbiAqL1xyXG5mdW5jdGlvbiBpbml0KCl7XHJcbiAgICBsZXQgaW5wdXRzID0gJCgnLmZpZWxkX19pbnB1dCcpO1xyXG4gICAgbGV0IHBsYWNlaG9sZGVycyA9ICQoJy5maWVsZF9fcGxhY2Vob2xkZXInKTtcclxuICAgIFxyXG4gICAgcGxhY2Vob2xkZXJzLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICQodGhpcykuY2xvc2VzdCgnLmZpZWxkJykuZmluZCgnLmZpZWxkX19pbnB1dCcpLmZvY3VzKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpbnB1dHMuZWFjaChmdW5jdGlvbihpLCBpdGVtKSB7XHJcbiAgICAgICAgY2hlY2tJbnB1dCgkKGl0ZW0pKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlucHV0cy5mb2N1cyhmdW5jdGlvbigpe1xyXG4gICAgICAgIGZvY3VzTGFiZWwoJCh0aGlzKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpbnB1dHMuYmx1cihmdW5jdGlvbigpe1xyXG4gICAgICAgIGJsdXJMYWJlbCgkKHRoaXMpKTtcclxuICAgICAgICBjaGVja0lucHV0KCQodGhpcykpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge2luaXR9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9pbnB1dC5qcyIsIi8qKlxyXG4gKiDQnNC+0LTRg9C70Ywg0LTQu9GPINGA0LDQsdC+0YLRiyDQpNC+0YDQvFxyXG4gKiBAbW9kdWxlIEZvcm1cclxuICovXHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZUZpZWxkKGZpZWxkKSB7XHJcbiAgbGV0IGlzVmFsaWQgPSBmaWVsZC52YWxpZGl0eS52YWxpZDtcclxuICBsZXQgZmllbGRDb250YWluZXIgPSAkKGZpZWxkKS5jbG9zZXN0KCcuZmllbGQnKTtcclxuICBpZiAoaXNWYWxpZCkge1xyXG4gICAgZmllbGRDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2hhcy1lcnJvcicpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBmaWVsZENvbnRhaW5lci5hZGRDbGFzcygnaGFzLWVycm9yJyk7XHJcbiAgfVxyXG4gIHJldHVybiBpc1ZhbGlkO1xyXG59XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZUZvcm0oZWxGb3JtKSB7XHJcbiAgbGV0IGVycm9ycyA9IDA7XHJcbiAgQXJyYXkuZnJvbShlbEZvcm0uZWxlbWVudHMpLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgbGV0IGlzVmFsaWRGaWVsZCA9IHZhbGlkYXRlRmllbGQoaXRlbSk7XHJcbiAgICBpZighaXNWYWxpZEZpZWxkKSB7XHJcbiAgICAgIGVycm9ycyArPSAxO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIHJldHVybiBlcnJvcnM7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICog0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YHQvtCx0YvRgtC40Lkg0YTQvtGA0LxcclxuICogQGV4YW1wbGVcclxuICogRm9ybS5pbml0KCk7XHJcbiAqL1xyXG5mdW5jdGlvbiBpbml0KCl7XHJcbiAgbGV0IGpzRm9ybSA9ICQoJy5qcy1mb3JtJyk7XHJcbiAgXHJcbiAganNGb3JtLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIGxldCBzZWxmID0gJCh0aGlzKTtcclxuICAgIGxldCBzZWxmRm9ybSA9IHNlbGYuZmluZCgnLmpzLWZvcm0tZm9ybScpO1xyXG4gICAgbGV0IHNlbGZSZXN1bHQgPSBzZWxmLmZpbmQoJy5qcy1mb3JtLXJlc3VsdCcpO1xyXG4gICAgbGV0IHNlbGZTdWJtaXQgPSBzZWxmLmZpbmQoJy5qcy1mb3JtLXN1Ym1pdCcpO1xyXG4gICAgXHJcbiAgICBzZWxmU3VibWl0Lm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBsZXQgaGFzRXJyb3IgPSB2YWxpZGF0ZUZvcm0oc2VsZkZvcm1bMF0pO1xyXG4gICAgICBpZiAoIWhhc0Vycm9yKSB7XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBzdWJtaXRpb24gY29kZSBoZXJlIVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgc2VsZi5hZGRDbGFzcygnaXMtc3VibWl0dGVkJyk7XHJcbiAgICAgICAgLy9zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy8gIHNlbGZGb3JtLmhpZGUoKTtcclxuICAgICAgICAvL30sIDUwMCk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgc2VsZlJlc3VsdC5zaG93KCk7XHJcbiAgICAgICAgfSwgMzAwKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge2luaXR9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9mb3JtLmpzIiwiLyoqXHJcbiAqIE9uZXBhZ2UgU2Nyb2xsXHJcbiAqIEBtb2R1bGUgT25lcGFnZVxyXG4gKi9cclxuXHJcbmxldCBvbmVwYWdlO1xyXG5cclxuLyoqXHJcbiAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPIG9uZXBhZ2VcclxuICovXHJcbmZ1bmN0aW9uIGluaXQoKXtcclxuICBvbmVwYWdlID0gJChcIi5vbmVwYWdlLXdyYXBwZXJcIik7XHJcbiAgXHJcbiAgaWYgKG9uZXBhZ2UubGVuZ3RoID4gMCkge1xyXG4gICAgb25lcGFnZS5vbmVwYWdlX3Njcm9sbCh7XHJcbiAgICAgIHNlY3Rpb25Db250YWluZXI6IFwiLm9uZXBhZ2Utc2VjdGlvblwiLFxyXG4gICAgICBwYWdpbmF0aW9uOiB0cnVlLFxyXG4gICAgICB1cGRhdGVVcmw6IGZhbHNlLFxyXG4gICAgICBsb29wOiBmYWxzZSxcclxuICAgICAgcmVzcG9uc2l2ZUZhbGxiYWNrOiA2MDBcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0fTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvb25lcGFnZS1zY3JvbGwuanMiLCIvKipcclxuICog0KLQtdGB0YJcclxuICogQG1vZHVsZSBUZXN0XHJcbiAqL1xyXG5cclxubGV0IHJlc3VsdCA9IHtcclxuICBcImFcIjogMCxcclxuICBcImJcIjogMCxcclxuICBcImNcIjogMCxcclxuICBcImRcIjogMFxyXG59O1xyXG5sZXQgcGFnZXMgPSB7XHJcbiAgXCJhXCI6IFwicmVzdWx0LXJvbWFudGljLmh0bWxcIixcclxuICBcImJcIjogXCJyZXN1bHQtZmFudGFzeS5odG1sXCIsXHJcbiAgXCJjXCI6IFwicmVzdWx0LXByYWN0aWNhbC5odG1sXCIsXHJcbiAgXCJkXCI6IFwicmVzdWx0LXVucHJvbXB0ZWQuaHRtbFwiXHJcbn07XHJcbmxldCBjYXJvdXNlbCA9ICQoXCIub3dsLWNhcm91c2VsLmNhcm91c2VsLS10ZXN0XCIpO1xyXG5sZXQgdGVzdEN0cmwgPSAkKCcuanMtdGVzdC1jdHJsJyk7XHJcblxyXG5mdW5jdGlvbiBpc0xhc3RTbGlkZSgpIHtcclxuICByZXR1cm4gY2Fyb3VzZWwuZmluZCgnLm93bC1pdGVtJykuZmlsdGVyKCc6bGFzdCcpLmhhc0NsYXNzKCdhY3RpdmUnKTtcclxufVxyXG5mdW5jdGlvbiBnZXRQYWdlKGFuc3dlcikge1xyXG4gIGxldCBwYWdlVXJsID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbiArICcvJztcclxuICBwYWdlVXJsICs9IHBhZ2VzW2Fuc3dlcl07XHJcbiAgcmV0dXJuIHBhZ2VVcmw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByb2Nlc3NUZXN0KGVsLCBpc0xhc3RTbGlkZSA9IGZhbHNlKSB7XHJcbiAgbGV0IGtleSA9ICQoZWwpLmF0dHIoJ2RhdGEta2V5Jyk7XHJcbiAgcmVzdWx0W2tleV0gKz0gMTtcclxuICBpZiAoIWlzTGFzdFNsaWRlKSB7XHJcbiAgICBzaG93TmV4dChlbCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHNob3dSZXN1bHQocmVzdWx0KTtcclxuICB9XHJcbn1cclxuZnVuY3Rpb24gc2hvd05leHQoZWwpIHtcclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgY2Fyb3VzZWwudHJpZ2dlcignbmV4dC5vd2wuY2Fyb3VzZWwnKTtcclxuICB9LCAzMDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBleHRyYWN0S2V5VmFsdWUob2JqLCB2YWx1ZSkge1xyXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iailbT2JqZWN0LnZhbHVlcyhvYmopLmluZGV4T2YodmFsdWUpXTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2FsY3VsYXRlUmVzdWx0KHJlc3VsdCkge1xyXG4gIGxldCBhcnIgPSBPYmplY3QudmFsdWVzKHJlc3VsdCk7XHJcbiAgbGV0IG1heCA9IE1hdGgubWF4KC4uLmFycik7XHJcbiAgbGV0IG1heEtleSA9IGV4dHJhY3RLZXlWYWx1ZShyZXN1bHQsIG1heCk7XHJcbiAgcmV0dXJuIG1heEtleTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1Jlc3VsdChyZXN1bHQpIHtcclxuICBsZXQgYW5zd2VyID0gY2FsY3VsYXRlUmVzdWx0KHJlc3VsdCk7XHJcbiAgbGV0IHBhZ2UgPSBnZXRQYWdlKGFuc3dlcik7XHJcbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBwYWdlO1xyXG4gIH0sIDMwMCwgcGFnZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDQutCw0YDRg9GB0LXQu9C4XHJcbiAqL1xyXG5mdW5jdGlvbiBpbml0KCl7XHJcblxyXG4gIGNhcm91c2VsLm93bENhcm91c2VsKHtcclxuICAgIGl0ZW1zOiAxLFxyXG4gICAgbmF2OiBmYWxzZSxcclxuICAgIGRvdHM6IHRydWUsXHJcbiAgICBsb29wOiBmYWxzZSxcclxuICAgIG1vdXNlRHJhZzogZmFsc2UsXHJcbiAgICB0b3VjaERyYWc6IGZhbHNlLFxyXG4gICAgcHVsbERyYWc6IGZhbHNlLFxyXG4gICAgYW5pbWF0ZU91dDogJ2ZhZGVPdXQnXHJcbiAgfSk7XHJcbiAgXHJcbiAgdGVzdEN0cmwub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgIHByb2Nlc3NUZXN0KHRoaXMsIGlzTGFzdFNsaWRlKCkpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0fTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvdGVzdC5qcyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVkE7Ozs7Ozs7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUN4QkE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FBT0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ2pEQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFRQTtBQUNBOzs7Ozs7Ozs7QUN0QkE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDM0ZBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNuQ0E7Ozs7O0FBTUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNoRUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDNURBOzs7OztBQUtBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUN2QkE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFSQTtBQUNBO0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==