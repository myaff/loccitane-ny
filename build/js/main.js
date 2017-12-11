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
	var Form = __webpack_require__(7);
	var Onepage = __webpack_require__(8);
	var Test = __webpack_require__(9);
	var Animation = __webpack_require__(10);

	$(document).ready(function () {

	  DeviceDetection.run();
	  Togglers.init();
	  Carousel.init();
	  Modal.init();
	  Anchor.init();
	  Input.init();
	  Form.init();
	  Test.init();
	  Onepage.init();
	  Animation.init();
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
	  Onepage: Onepage,
	  Animation: Animation
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
	function isMobileVersion() {
		return !!~window.location.href.indexOf("/mobile/");
	}

	function run() {
		if (isTouch()) {
			$('html').removeClass('no-touch').addClass('touch');
		} else {
			$('html').removeClass('touch').addClass('no-touch');
		}
	}

	module.exports = { run: run, isTouch: isTouch, isMobile: isMobile, isTablet: isTablet, isMobileVersion: isMobileVersion };

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
		$('.js-hide-block').on('click', function () {
			var block = $(this).data('target') === 'self' ? $(this).parent() : $(this).data('target');
			block.fadeOut(500);
		});
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

	function getPageType(layout) {
	  return layout === 'test' ? 'test' : 'main';
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
	        var request = $.ajax({
	          url: 'http://loccitane.hsmp.ru/api/emails/',
	          type: 'POST',
	          dataType: 'json',
	          data: {
	            'email': $(selfForm).find('input[type="email"]').val(),
	            'page': getPageType(self.attr('data-page-type'))
	          },
	          beforeSend: function beforeSend() {
	            selfSubmit.attr('disabled', 'disabled');
	          }
	        });
	        request.done(function (response, textStatus, jqXHR) {
	          self.addClass('is-submitted');
	          setTimeout(function () {
	            selfResult.show();
	          }, 300);
	        });
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
	  if (Main.DeviceDetection.isMobileVersion()) {
	    pageUrl += 'mobile/';
	  }
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

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Переключение классов по различным событиям
	 * @module Animation
	 */

	var scrollAnimationBlocks = $('.a-scroll-box');
	var parallaxBlocks = $('.a-parallax-box');

	function addClassTogglerScene(el, controller) {
	  new ScrollMagic.Scene({
	    triggerElement: el,
	    triggerHook: 0.7
	  }).setClassToggle(el, 'animate').addTo(controller);
	}

	function addClassTogglerController(animationBlocks) {
	  var controller = new ScrollMagic.Controller();
	  animationBlocks.each(function () {
	    var closestContainer = $(this).closest('[class*="grid"]:not([class*="col"])')[0];
	    if (closestContainer.offsetTop < window.outerHeight) {
	      $(this).children('[class*="a-"]').css({ 'transition': 'none' });
	      var self = this;
	      var delay = 250 * $(closestContainer).index();
	      $(self).data('timer', setTimeout(function () {
	        $(self).children('[class*="a-"]').css({ 'transition': '' });
	        $(self).addClass('animate');
	      }, 250));
	    } else {
	      var aDelay = 0;
	      if ($(this).attr('data-a-delay') !== undefined) {
	        aDelay = Number($(this).attr('data-a-delay')) * 1000;
	      }
	      setTimeout(addClassTogglerScene, aDelay, this, controller);
	    }
	  });
	}

	function getFromPosition(el) {
	  var defaultPosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	  return el.attr('data-parallax-from') !== undefined ? Number(el.attr('data-parallax-from')) : defaultPosition;
	}
	function getToPosition(el) {
	  var defaultPosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	  return el.attr('data-parallax-to') !== undefined ? Number(el.attr('data-parallax-to')) : defaultPosition;
	}

	function getParallaxTimeline(el) {
	  var tween = new TimelineMax();
	  var tweensArr = [];
	  if ($(el).find('.a-parallax-back')) {
	    var targetEl = $(el).find('.a-parallax-back');
	    var fromPos = getFromPosition(targetEl, -20);
	    var toPos = getToPosition(targetEl);
	    tweensArr.push(TweenMax.fromTo(targetEl, 1, { yPercent: fromPos }, { yPercent: toPos, ease: Linear.easeNone }));
	  }
	  if ($(el).find('.a-parallax-middle')) {
	    var _targetEl = $(el).find('.a-parallax-middle');
	    var _fromPos = getFromPosition(_targetEl, -15);
	    var _toPos = getToPosition(_targetEl);
	    tweensArr.push(TweenMax.fromTo(_targetEl, 1, { yPercent: _fromPos }, { yPercent: _toPos, ease: Linear.easeNone }));
	  }
	  if ($(el).find('.a-parallax-front')) {
	    var _targetEl2 = $(el).find('.a-parallax-front');
	    var _fromPos2 = getFromPosition(_targetEl2, -10);
	    var _toPos2 = getToPosition(_targetEl2, 10);
	    tweensArr.push(TweenMax.fromTo(_targetEl2, 1, { yPercent: _fromPos2 }, { yPercent: _toPos2, ease: Linear.easeNone }));
	  }
	  tween.add(tweensArr);
	  return tween;
	}

	function addParallaxScene(el, tween, controller) {
	  new ScrollMagic.Scene({
	    triggerElement: el,
	    duration: $(el).height()
	  }).setTween(tween).addTo(controller);
	}

	function addParallaxController(animationBlocks) {
	  var controller = new ScrollMagic.Controller();
	  animationBlocks.each(function () {
	    var tween = getParallaxTimeline(this);
	    addParallaxScene(this, tween, controller);
	  });
	}

	function init() {
	  if (scrollAnimationBlocks.length > 0 && $(window).width() > 1024) {
	    $('html').addClass('is-animating');
	    addClassTogglerController(scrollAnimationBlocks);
	  }
	  if (parallaxBlocks.length > 0 && $(window).width() > 1024) {
	    $('html').addClass('is-animating');
	    addParallaxController(parallaxBlocks);
	  }
	}

	module.exports = { init: init };

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmZTgzMGU4OGVmOTFlZWJlNGQwOCIsIndlYnBhY2s6Ly8vc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2RldmljZS1kZXRlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL3RvZ2dsZXJzLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy9jYXJvdXNlbC5qcyIsIndlYnBhY2s6Ly8vc3JjL2pzL2NvbXBvbmVudHMvbW9kYWwuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2FuY2hvci5qcyIsIndlYnBhY2s6Ly8vc3JjL2pzL2NvbXBvbmVudHMvaW5wdXQuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2Zvcm0uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL29uZXBhZ2Utc2Nyb2xsLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy90ZXN0LmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy9hbmltYXRpb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2NhbHZpbi1rbGVpbi9idWlsZC9qcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmZTgzMGU4OGVmOTFlZWJlNGQwOCIsImxldCBEZXZpY2VEZXRlY3Rpb24gPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2RldmljZS1kZXRlY3Rpb25cIik7XHJcbmxldCBUb2dnbGVycyA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvdG9nZ2xlcnNcIik7XHJcbmxldCBDYXJvdXNlbCA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvY2Fyb3VzZWxcIik7XHJcbmxldCBNb2RhbCA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvbW9kYWxcIik7XHJcbmxldCBBbmNob3IgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2FuY2hvclwiKTtcclxubGV0IElucHV0ID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9pbnB1dFwiKTtcclxubGV0IEZvcm0gPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2Zvcm1cIik7XHJcbmxldCBPbmVwYWdlID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9vbmVwYWdlLXNjcm9sbFwiKTtcclxubGV0IFRlc3QgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL3Rlc3RcIik7XHJcbmxldCBBbmltYXRpb24gPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2FuaW1hdGlvblwiKTtcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcbiAgXHJcbiAgRGV2aWNlRGV0ZWN0aW9uLnJ1bigpO1xyXG4gIFRvZ2dsZXJzLmluaXQoKTtcclxuICBDYXJvdXNlbC5pbml0KCk7XHJcbiAgTW9kYWwuaW5pdCgpO1xyXG4gIEFuY2hvci5pbml0KCk7XHJcbiAgSW5wdXQuaW5pdCgpO1xyXG4gIEZvcm0uaW5pdCgpO1xyXG4gIFRlc3QuaW5pdCgpO1xyXG4gIE9uZXBhZ2UuaW5pdCgpO1xyXG4gIEFuaW1hdGlvbi5pbml0KCk7XHJcbiAgXHJcbn0pO1xyXG5cclxuXHJcbi8qKlxyXG4gKiDQodC/0LjRgdC+0Log0Y3QutGB0L/QvtGA0YLQuNGA0YPQtdC80YvRhSDQvNC+0LTRg9C70LXQuSwg0YfRgtC+0LHRiyDQuNC80LXRgtGMINC6INC90LjQvCDQtNC+0YHRgtGD0L8g0LjQt9Cy0L3QtVxyXG4gKiBAZXhhbXBsZVxyXG4gKiBNYWluLkZvcm0uaXNGb3JtVmFsaWQoKTtcclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIERldmljZURldGVjdGlvbixcclxuICBUb2dnbGVycyxcclxuICBDYXJvdXNlbCxcclxuICBNb2RhbCxcclxuICBBbmNob3IsXHJcbiAgSW5wdXQsXHJcbiAgRm9ybSxcclxuICBUZXN0LFxyXG4gIE9uZXBhZ2UsXHJcbiAgQW5pbWF0aW9uXHJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9tYWluLmpzIiwibGV0IGJyZWFrcG9pbnRzID0ge1xyXG5cdHNtOiA1NzYsXHJcblx0bWQ6IDc2OCxcclxuXHRsZzogOTkyLFxyXG5cdHhsOiAxMjAwXHJcbn07XHJcblxyXG5mdW5jdGlvbiBpc01vYmlsZSgpe1xyXG5cdHJldHVybiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gYnJlYWtwb2ludHMuc20pO1xyXG59XHJcbmZ1bmN0aW9uIGlzVGFibGV0KCl7XHJcblx0cmV0dXJuICgkKHdpbmRvdykud2lkdGgoKSA+IGJyZWFrcG9pbnRzLnNtICYmICQod2luZG93KS53aWR0aCgpIDw9IGJyZWFrcG9pbnRzLm1kKVxyXG59XHJcbmZ1bmN0aW9uIGlzVG91Y2goKXtcclxuXHRyZXR1cm4gJ29udG91Y2hzdGFydCcgaW4gd2luZG93IHx8IG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cztcclxufVxyXG5mdW5jdGlvbiBpc01vYmlsZVZlcnNpb24oKXtcclxuICByZXR1cm4gISF+d2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZihcIi9tb2JpbGUvXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBydW4oKXtcclxuXHRpZihpc1RvdWNoKCkpe1xyXG5cdFx0JCgnaHRtbCcpLnJlbW92ZUNsYXNzKCduby10b3VjaCcpLmFkZENsYXNzKCd0b3VjaCcpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKCdodG1sJykucmVtb3ZlQ2xhc3MoJ3RvdWNoJykuYWRkQ2xhc3MoJ25vLXRvdWNoJyk7XHJcblx0fVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtydW4sIGlzVG91Y2gsIGlzTW9iaWxlLCBpc1RhYmxldCwgaXNNb2JpbGVWZXJzaW9ufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvZGV2aWNlLWRldGVjdGlvbi5qcyIsIi8qKlxyXG4gKiDQn9C10YDQtdC60LvRjtGH0LXQvdC40LUg0LrQu9Cw0YHRgdC+0LIg0L/QviDRgNCw0LfQu9C40YfQvdGL0Lwg0YHQvtCx0YvRgtC40Y/QvFxyXG4gKiBAbW9kdWxlIFRvZ2dsZXJzXHJcbiAqL1xyXG4gXHJcbmZ1bmN0aW9uIHRvZ2dsZUNsYXNzSWYoZWwsIGNvbmQsIHRvZ2dsZWRDbGFzcyl7XHJcblx0aWYoY29uZCl7XHJcblx0XHRlbC5hZGRDbGFzcyh0b2dnbGVkQ2xhc3MpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRlbC5yZW1vdmVDbGFzcyh0b2dnbGVkQ2xhc3MpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqINCk0YPQvdC60YbQuNGPINC00L7QsdCw0LLQu9GP0LXRgiDQuiDRjdC70LXQvNC10L3RgtGDINC60LvQsNGB0YEsINC10YHQu9C4INGB0YLRgNCw0L3QuNGG0LAg0L/RgNC+0LrRgNGD0YfQtdC90LAg0LHQvtC70YzRiNC1LCDRh9C10Lwg0L3QsCDRg9C60LDQt9Cw0L3QvdC+0LUg0LfQvdCw0YfQtdC90LjQtSwgXHJcbiAqINC4INGD0LHQuNGA0LDQtdGCINC60LvQsNGB0YEsINC10YHQu9C4INC30L3QsNGH0LXQvdC40LUg0LzQtdC90YzRiNC1XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBlbCAtINGN0LvQtdC80LXQvdGCLCDRgSDQutC+0YLQvtGA0YvQvCDQstC30LDQuNC80L7QtNC10LnRgdGC0LLRg9C10LxcclxuICogQHBhcmFtIHttaXhlZH0gW3Njcm9sbFZhbHVlPTBdIC0g0LfQvdCw0YfQtdC90LjQtSDQv9GA0L7QutGA0YPRgtC60LgsINC90LAg0LrQvtGC0L7RgNC+0Lwg0LzQtdC90Y/QtdC8IGNzcy3QutC70LDRgdGBLCDQvtC20LjQtNCw0LXQvNC+0LUg0LfQvdCw0YfQtdC90LjQtSAtINGH0LjRgdC70L4g0LjQu9C4INC60LvRjtGH0LXQstC+0LUg0YHQu9C+0LLQviAndGhpcycuINCV0YHQu9C4INC/0LXRgNC10LTQsNC90L4gJ3RoaXMnLCDQv9C+0LTRgdGC0LDQstC70Y/QtdGC0YHRjyDQv9C+0LvQvtC20LXQvdC40LUgZWwub2Zmc2V0KCkudG9wINC80LjQvdGD0YEg0L/QvtC70L7QstC40L3QsCDQstGL0YHQvtGC0Ysg0Y3QutGA0LDQvdCwXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdG9nZ2xlZENsYXNzPXNjcm9sbGVkXSAtIGNzcy3QutC70LDRgdGBLCDQutC+0YLQvtGA0YvQuSDQv9C10YDQtdC60LvRjtGH0LDQtdC8XHJcbiAqL1xyXG5mdW5jdGlvbiB0b2dnbGVFbGVtZW50Q2xhc3NPblNjcm9sbChlbCwgc2Nyb2xsVmFsdWUgPSAwLCB0b2dnbGVkQ2xhc3MgPSAnc2Nyb2xsZWQnKXtcclxuXHRpZihlbC5sZW5ndGggPT0gMCkge1xyXG5cdFx0Ly9jb25zb2xlLmVycm9yKFwi0J3QtdC+0LHRhdC+0LTQuNC80L4g0L/QtdGA0LXQtNCw0YLRjCDQvtCx0YrQtdC60YIsINGBINC60L7RgtC+0YDRi9C8INCy0Ysg0YXQvtGC0LjRgtC1INCy0LfQsNC40LzQvtC00LXQudGB0YLQstC+0LLQsNGC0YxcIik7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cdFxyXG5cdGlmKHNjcm9sbFZhbHVlID09ICd0aGlzJykge1xyXG5cdFx0c2Nyb2xsVmFsdWUgPSBlbC5vZmZzZXQoKS50b3AgLSAkKHdpbmRvdykub3V0ZXJIZWlnaHQoKSAvIDI7XHJcblx0fVxyXG5cdFxyXG5cdCQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oZSl7XHJcblx0XHRpZigkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiBzY3JvbGxWYWx1ZSl7XHJcblx0XHRcdGVsLmFkZENsYXNzKHRvZ2dsZWRDbGFzcyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRlbC5yZW1vdmVDbGFzcyh0b2dnbGVkQ2xhc3MpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5INC00LvRjyDQv9C10YDQtdC60LvRjtGH0LDRgtC10LvQtdC5INC60LvQsNGB0YHQvtCyXHJcbiAqIEBleGFtcGxlXHJcbiAqIFRvZ2dsZXJzLmluaXQoKTtcclxuICovXHJcbmZ1bmN0aW9uIGluaXQoKXtcclxuICAgIFxyXG5cdC8vdG9nZ2xlRWxlbWVudENsYXNzT25TY3JvbGwoJCgnLmhlYWRlcicpLCAkKHdpbmRvdykub3V0ZXJIZWlnaHQoKSAvIDMpO1xyXG4gICQoJy5qcy1oaWRlLWJsb2NrJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgIGxldCBibG9jayA9ICQodGhpcykuZGF0YSgndGFyZ2V0JykgPT09ICdzZWxmJyA/ICQodGhpcykucGFyZW50KCkgOiAkKHRoaXMpLmRhdGEoJ3RhcmdldCcpO1xyXG4gICAgYmxvY2suZmFkZU91dCg1MDApO1xyXG4gIH0pO1xyXG4gIFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0LCB0b2dnbGVDbGFzc0lmLCB0b2dnbGVFbGVtZW50Q2xhc3NPblNjcm9sbH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL3RvZ2dsZXJzLmpzIiwiLyoqXHJcbiAqINCa0LDRgNGD0YHQtdC70YxcclxuICogQG1vZHVsZSBDYXJvdXNlbFxyXG4gKi9cclxuXHJcbmxldCBjYXJvdXNlbDtcclxuXHJcbi8qKlxyXG4gKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDQutCw0YDRg9GB0LXQu9C4XHJcbiAqL1xyXG5mdW5jdGlvbiBpbml0KCl7XHJcbiAgY2Fyb3VzZWwgPSAkKFwiLm93bC1jYXJvdXNlbC5jYXJvdXNlbC0tZGVmYXVsdFwiKTtcclxuXHJcbiAgY2Fyb3VzZWwub3dsQ2Fyb3VzZWwoe1xyXG4gICAgaXRlbXM6IDEsXHJcbiAgICBuYXY6IHRydWUsXHJcbiAgICBkb3RzOiB0cnVlLFxyXG4gICAgbG9vcDogZmFsc2UsXHJcbiAgICBtb3VzZURyYWc6IGZhbHNlLFxyXG4gICAgYW5pbWF0ZU91dDogJ2ZhZGVPdXQnXHJcbiAgfSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge2luaXR9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9jYXJvdXNlbC5qcyIsIi8qKlxyXG4gKiDQktGB0L/Qu9GL0LLQsNGO0YnQuNC1INC+0LrQvdCwXHJcbiAqIEBtb2R1bGUgTW9kYWxcclxuICovXHJcblxyXG5sZXQgbGF5b3V0ID0gJCgnLmxheW91dCcpO1xyXG5sZXQgbW9kYWxXcmFwcGVyQ2xhc3MgPSAnLm1vZGFsX193cmFwcGVyJztcclxuLy9sZXQgbW9kYWxXcmFwcGVyID0gJCgnLm1vZGFsX193cmFwcGVyJyk7XHJcbiBcclxuZnVuY3Rpb24gb3Blbk1vZGFsKG1vZGFsLCBpc0Z1bGxzY3JlZW4gPSBmYWxzZSkge1xyXG4gIGxldCBtb2RhbFdyYXBwZXIgPSBtb2RhbC5jbG9zZXN0KG1vZGFsV3JhcHBlckNsYXNzKTtcclxuICBsZXQgbW9kYWxBY3RpdmF0b3IgPSAkKCdbZGF0YS10YXJnZXQ9XCIjJyArIG1vZGFsLmF0dHIoJ2lkJykgKyAnXCJdJyk7XHJcbiAgbW9kYWxXcmFwcGVyLnJlbW92ZUNsYXNzKCdpbnZpc2libGUnKTtcclxuICBtb2RhbC5yZW1vdmVDbGFzcygnaW52aXNpYmxlJyk7XHJcbiAgbGV0IHdyYXBwZXJDbGFzc2VzID0gJ2lzLW9wZW5lZCc7XHJcbiAgaWYgKGlzRnVsbHNjcmVlbikge1xyXG4gICAgd3JhcHBlckNsYXNzZXMgKz0gJyBpcy1mdWxsc2NyZWVuJztcclxuICB9XHJcbiAgbGF5b3V0LmFkZENsYXNzKCdtb2RhbC1vcGVuJyk7XHJcbiAgbW9kYWxXcmFwcGVyLmFkZENsYXNzKHdyYXBwZXJDbGFzc2VzKTtcclxuICBtb2RhbC5hZGRDbGFzcygnaXMtb3BlbmVkJyk7XHJcbiAgJCgnaHRtbCwgYm9keScpLmNzcygnb3ZlcmZsb3cteScsICdoaWRkZW4nKTtcclxuICBtb2RhbEFjdGl2YXRvci5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAkKHRoaXMpLmFkZENsYXNzKCdtb2RhbC1pcy1vcGVuZWQnKTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xvc2VNb2RhbChtb2RhbCwgb3Blbk5leHQgPSBmYWxzZSkge1xyXG4gIGxldCBtb2RhbFdyYXBwZXIgPSBtb2RhbC5jbG9zZXN0KG1vZGFsV3JhcHBlckNsYXNzKTtcclxuICBsZXQgbW9kYWxBY3RpdmF0b3IgPSAkKCdbZGF0YS10YXJnZXQ9XCIjJyArIG1vZGFsLmF0dHIoJ2lkJykgKyAnXCJdJyk7XHJcbiAgbW9kYWxBY3RpdmF0b3IuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnbW9kYWwtaXMtb3BlbmVkJyk7XHJcbiAgfSk7XHJcbiAgbW9kYWwucmVtb3ZlQ2xhc3MoJ2lzLW9wZW5lZCcpO1xyXG4gIGlmICghb3Blbk5leHQpIHtcclxuICAgIGxheW91dC5yZW1vdmVDbGFzcygnbW9kYWwtb3BlbicpO1xyXG4gICAgbW9kYWxXcmFwcGVyLnJlbW92ZUNsYXNzKCdpcy1vcGVuZWQgaXMtZnVsbHNjcmVlbicpO1xyXG4gICAgJCgnaHRtbCwgYm9keScpLmNzcygnb3ZlcmZsb3cteScsICcnKTtcclxuICB9XHJcbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgbW9kYWwuYWRkQ2xhc3MoJ2ludmlzaWJsZScpO1xyXG4gICAgbW9kYWxXcmFwcGVyLmFkZENsYXNzKCdpbnZpc2libGUnKTtcclxuICB9LCAzMDApO1xyXG59XHJcblxyXG4vKipcclxuICog0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YHQvtCx0YvRgtC40Lkg0LTQu9GPINCy0YHQv9C70YvQstCw0Y7RidC40YUg0L7QutC+0L1cclxuICogQGV4YW1wbGVcclxuICogTW9kYWwuaW5pdCgpO1xyXG4gKi9cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG4gICAgXHJcbiAgJCgnLmpzLW1vZGFsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgbGV0IHRhcmdldCA9ICQodGhpcykuYXR0cignZGF0YS10YXJnZXQnKTtcclxuICAgICAgbGV0IG1vZGFsID0gJCh0YXJnZXQpO1xyXG4gICAgICBsZXQgaXNGdWxsc2NyZWVuID0gbW9kYWwuYXR0cignZGF0YS1mdWxsc2NyZWVuJykgIT09IHVuZGVmaW5lZDtcclxuICAgICAgaWYgKCFtb2RhbC5oYXNDbGFzcygnaXMtb3BlbmVkJykpIHtcclxuICAgICAgICBvcGVuTW9kYWwobW9kYWwsIGlzRnVsbHNjcmVlbik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2xvc2VNb2RhbChtb2RhbCk7XHJcbiAgICAgIH1cclxuICB9KTtcclxuICBcclxuICAkKG1vZGFsV3JhcHBlckNsYXNzKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICBpZiAoJChlLnRhcmdldCkuaGFzQ2xhc3MoJ21vZGFsX193cmFwcGVyJykpIHtcclxuICAgICAgbGV0IG1vZGFsID0gJCh0aGlzKS5maW5kKCcubW9kYWwuaXMtb3BlbmVkJyk7XHJcbiAgICAgIG1vZGFsLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICBjbG9zZU1vZGFsKCQodGhpcykpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBvcGVuTW9kYWxIYXNoKCkge1xyXG4gICAgICAgIGxldCBoYXNoID0gWydjb21wZXRpdGlvbiddLFxyXG4gICAgICAgICAgICBpc0Z1bGxzY3JlZW4sXHJcbiAgICAgICAgICAgIG1vZGFsLFxyXG4gICAgICAgICAgICBpO1xyXG5cclxuICAgICAgICBmb3IgKGkgPSAwO2kgPCBoYXNoLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICggJyMnK2hhc2hbaV0gPT0gd2luZG93LmxvY2F0aW9uLmhhc2ggJiYgJCgnIycraGFzaFtpXSkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBtb2RhbCA9ICQoJyMnK2hhc2hbaV0pO1xyXG4gICAgICAgICAgICAgICAgaXNGdWxsc2NyZWVuID0gbW9kYWwuYXR0cignZGF0YS1mdWxsc2NyZWVuJykgIT09IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgICAgICAgICBvcGVuTW9kYWwobW9kYWwsIGlzRnVsbHNjcmVlbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb3Blbk1vZGFsSGFzaCgpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0LCBvcGVuTW9kYWwsIGNsb3NlTW9kYWx9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9tb2RhbC5qcyIsIi8qKlxyXG4gKiBBbmNob3Igc2Nyb2xsaW5nXHJcbiAqIEBtb2R1bGUgQW5jaG9yXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gc2Nyb2xsVG9BbmNob3IobmV3cG9zKSB7XHJcbiAgVHdlZW5NYXgudG8od2luZG93LCAwLjUsIHtzY3JvbGxUbzoge3k6IG5ld3Bvcywgb2Zmc2V0WTogMjAwfX0pO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5INGP0LrQvtGA0L3QvtCz0L4g0LzQtdC90Y5cclxuICogQGV4YW1wbGVcclxuICogQW5jaG9yLmluaXQoKTtcclxuICovXHJcbmZ1bmN0aW9uIGluaXQoKXtcclxuICAgIFxyXG4gICQoJy5qcy1hbmNob3InKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgIGxldCBpZCA9ICQodGhpcykuYXR0cignaHJlZicpO1xyXG4gICAgbGV0IHNjcm9sbFRvSUQgPSBpZCArICctdGl0bGUnO1xyXG4gICAgaWYgKCEhJCh0aGlzKS5jbG9zZXN0KCcubW9kYWwnKSkge1xyXG4gICAgICBNYWluLk1vZGFsLmNsb3NlTW9kYWwoJCh0aGlzKS5jbG9zZXN0KCcubW9kYWwnKSk7XHJcbiAgICB9XHJcbiAgICBpZiAoJChpZCkubGVuZ3RoID4gMCAmJiAkKHNjcm9sbFRvSUQpLmxlbmd0aCA+IDApIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBcclxuICAgICAgc2V0VGltZW91dChzY3JvbGxUb0FuY2hvciwgNDAwLCBzY3JvbGxUb0lEKTtcclxuICAgICAgO1xyXG4gICAgICBcclxuICAgICAgLy9pZiAod2luZG93Lmhpc3RvcnkgJiYgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKSB7XHJcbiAgICAgIC8vICBoaXN0b3J5LnB1c2hTdGF0ZShcIlwiLCBkb2N1bWVudC50aXRsZSwgaWQpO1xyXG4gICAgICAvL31cclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7aW5pdH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL2FuY2hvci5qcyIsIi8qKlxyXG4gKiDQnNC+0LTRg9C70Ywg0LTQu9GPINGA0LDQsdC+0YLRiyBwbGFjZWhvbGRlciDQsiDRjdC70LXQvNC10L3RgtCw0YUg0YTQvtGA0LzRiyAoLmZpZWxkKVxyXG4gKiBAbW9kdWxlIElucHV0XHJcbiAqL1xyXG5cclxuXHJcbi8qKlxyXG4gKiDQo9GB0YLQsNC90L7QstC40YLRjCDRhNC+0LrRg9GBXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dFxyXG4gKi9cclxuZnVuY3Rpb24gZm9jdXNMYWJlbChpbnB1dCl7XHJcbiAgICBpbnB1dC5jbG9zZXN0KCcuZmllbGQnKS5hZGRDbGFzcyhcImhhcy1mb2N1c1wiKTtcclxufVxyXG5cclxuLyoqXHJcbiAqINCj0LHRgNCw0YLRjCDRhNC+0LrRg9GBXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dFxyXG4gKi9cclxuZnVuY3Rpb24gYmx1ckxhYmVsKGlucHV0KXtcclxuICAgIHZhciB3cmFwcGVyID0gaW5wdXQuY2xvc2VzdCgnLmZpZWxkJyk7XHJcbiAgICB3cmFwcGVyLnJlbW92ZUNsYXNzKFwiaGFzLWZvY3VzXCIpO1xyXG59XHJcblxyXG4vKipcclxuICog0J/RgNC+0LLQtdGA0LjRgtGMINC40L3Qv9GD0YIg0L3QsCDQvdCw0LvQuNGH0LjQtSB2YWx1ZVxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAcGFyYW0ge29iamVjdH0gaW5wdXRcclxuICovXHJcbmZ1bmN0aW9uIGNoZWNrSW5wdXQoaW5wdXQpe1xyXG4gICAgdmFyIHdyYXBwZXIgPSBpbnB1dC5jbG9zZXN0KCcuZmllbGQnKTtcclxuICAgIGlmIChpbnB1dC52YWwoKS5sZW5ndGggPiAwKVxyXG4gICAgICAgIHdyYXBwZXIuYWRkQ2xhc3MoXCJoYXMtdmFsdWVcIik7XHJcbiAgICBlbHNlXHJcbiAgICAgICAgd3JhcHBlci5yZW1vdmVDbGFzcyhcImhhcy12YWx1ZVwiKTtcclxufVxyXG5cclxuLyoqXHJcbiAqINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5INC00LvRjyDQuNC90L/Rg9GC0LBcclxuICogQGV4YW1wbGVcclxuICogSW5wdXQuaW5pdCgpO1xyXG4gKi9cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG4gICAgbGV0IGlucHV0cyA9ICQoJy5maWVsZF9faW5wdXQnKTtcclxuICAgIGxldCBwbGFjZWhvbGRlcnMgPSAkKCcuZmllbGRfX3BsYWNlaG9sZGVyJyk7XHJcbiAgICBcclxuICAgIHBsYWNlaG9sZGVycy5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5maWVsZCcpLmZpbmQoJy5maWVsZF9faW5wdXQnKS5mb2N1cygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaW5wdXRzLmVhY2goZnVuY3Rpb24oaSwgaXRlbSkge1xyXG4gICAgICAgIGNoZWNrSW5wdXQoJChpdGVtKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpbnB1dHMuZm9jdXMoZnVuY3Rpb24oKXtcclxuICAgICAgICBmb2N1c0xhYmVsKCQodGhpcykpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaW5wdXRzLmJsdXIoZnVuY3Rpb24oKXtcclxuICAgICAgICBibHVyTGFiZWwoJCh0aGlzKSk7XHJcbiAgICAgICAgY2hlY2tJbnB1dCgkKHRoaXMpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0fTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvaW5wdXQuanMiLCIvKipcclxuICog0JzQvtC00YPQu9GMINC00LvRjyDRgNCw0LHQvtGC0Ysg0KTQvtGA0LxcclxuICogQG1vZHVsZSBGb3JtXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gdmFsaWRhdGVGaWVsZChmaWVsZCkge1xyXG4gIGxldCBpc1ZhbGlkID0gZmllbGQudmFsaWRpdHkudmFsaWQ7XHJcbiAgbGV0IGZpZWxkQ29udGFpbmVyID0gJChmaWVsZCkuY2xvc2VzdCgnLmZpZWxkJyk7XHJcbiAgaWYgKGlzVmFsaWQpIHtcclxuICAgIGZpZWxkQ29udGFpbmVyLnJlbW92ZUNsYXNzKCdoYXMtZXJyb3InKTtcclxuICB9IGVsc2Uge1xyXG4gICAgZmllbGRDb250YWluZXIuYWRkQ2xhc3MoJ2hhcy1lcnJvcicpO1xyXG4gIH1cclxuICByZXR1cm4gaXNWYWxpZDtcclxufVxyXG5cclxuZnVuY3Rpb24gdmFsaWRhdGVGb3JtKGVsRm9ybSkge1xyXG4gIGxldCBlcnJvcnMgPSAwO1xyXG4gIEFycmF5LmZyb20oZWxGb3JtLmVsZW1lbnRzKS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgIGxldCBpc1ZhbGlkRmllbGQgPSB2YWxpZGF0ZUZpZWxkKGl0ZW0pO1xyXG4gICAgaWYoIWlzVmFsaWRGaWVsZCkge1xyXG4gICAgICBlcnJvcnMgKz0gMTtcclxuICAgIH1cclxuICB9KTtcclxuICByZXR1cm4gZXJyb3JzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRQYWdlVHlwZSAobGF5b3V0KSB7XHJcbiAgcmV0dXJuIGxheW91dCA9PT0gJ3Rlc3QnID8gJ3Rlc3QnIDogJ21haW4nO1xyXG59XHJcblxyXG4vKipcclxuICog0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YHQvtCx0YvRgtC40Lkg0YTQvtGA0LxcclxuICogQGV4YW1wbGVcclxuICogRm9ybS5pbml0KCk7XHJcbiAqL1xyXG5mdW5jdGlvbiBpbml0KCl7XHJcbiAgbGV0IGpzRm9ybSA9ICQoJy5qcy1mb3JtJyk7XHJcbiAgXHJcbiAganNGb3JtLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIGxldCBzZWxmID0gJCh0aGlzKTtcclxuICAgIGxldCBzZWxmRm9ybSA9IHNlbGYuZmluZCgnLmpzLWZvcm0tZm9ybScpO1xyXG4gICAgbGV0IHNlbGZSZXN1bHQgPSBzZWxmLmZpbmQoJy5qcy1mb3JtLXJlc3VsdCcpO1xyXG4gICAgbGV0IHNlbGZTdWJtaXQgPSBzZWxmLmZpbmQoJy5qcy1mb3JtLXN1Ym1pdCcpO1xyXG4gICAgXHJcbiAgICBzZWxmU3VibWl0Lm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBsZXQgaGFzRXJyb3IgPSB2YWxpZGF0ZUZvcm0oc2VsZkZvcm1bMF0pO1xyXG4gICAgICBpZiAoIWhhc0Vycm9yKSB7XHJcbiAgICAgICAgbGV0IHJlcXVlc3QgPSAkLmFqYXgoe1xyXG4gICAgICAgICAgdXJsOiAnaHR0cDovL2xvY2NpdGFuZS5oc21wLnJ1L2FwaS9lbWFpbHMvJyxcclxuICAgICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICdlbWFpbCc6ICQoc2VsZkZvcm0pLmZpbmQoJ2lucHV0W3R5cGU9XCJlbWFpbFwiXScpLnZhbCgpLFxyXG4gICAgICAgICAgICAncGFnZSc6IGdldFBhZ2VUeXBlKHNlbGYuYXR0cignZGF0YS1wYWdlLXR5cGUnKSlcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNlbGZTdWJtaXQuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXF1ZXN0LmRvbmUoZnVuY3Rpb24gKHJlc3BvbnNlLCB0ZXh0U3RhdHVzLCBqcVhIUikge1xyXG4gICAgICAgICAgc2VsZi5hZGRDbGFzcygnaXMtc3VibWl0dGVkJyk7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNlbGZSZXN1bHQuc2hvdygpO1xyXG4gICAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge2luaXR9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9mb3JtLmpzIiwiLyoqXHJcbiAqIE9uZXBhZ2UgU2Nyb2xsXHJcbiAqIEBtb2R1bGUgT25lcGFnZVxyXG4gKi9cclxuXHJcbmxldCBvbmVwYWdlO1xyXG5cclxuLyoqXHJcbiAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPIG9uZXBhZ2VcclxuICovXHJcbmZ1bmN0aW9uIGluaXQoKXtcclxuICBvbmVwYWdlID0gJChcIi5vbmVwYWdlLXdyYXBwZXJcIik7XHJcbiAgXHJcbiAgaWYgKG9uZXBhZ2UubGVuZ3RoID4gMCkge1xyXG4gICAgb25lcGFnZS5vbmVwYWdlX3Njcm9sbCh7XHJcbiAgICAgIHNlY3Rpb25Db250YWluZXI6IFwiLm9uZXBhZ2Utc2VjdGlvblwiLFxyXG4gICAgICBwYWdpbmF0aW9uOiB0cnVlLFxyXG4gICAgICB1cGRhdGVVcmw6IGZhbHNlLFxyXG4gICAgICBsb29wOiBmYWxzZSxcclxuICAgICAgcmVzcG9uc2l2ZUZhbGxiYWNrOiA2MDBcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0fTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvb25lcGFnZS1zY3JvbGwuanMiLCIvKipcclxuICog0KLQtdGB0YJcclxuICogQG1vZHVsZSBUZXN0XHJcbiAqL1xyXG5cclxubGV0IHJlc3VsdCA9IHtcclxuICBcImFcIjogMCxcclxuICBcImJcIjogMCxcclxuICBcImNcIjogMCxcclxuICBcImRcIjogMFxyXG59O1xyXG5sZXQgcGFnZXMgPSB7XHJcbiAgXCJhXCI6IFwicmVzdWx0LXJvbWFudGljLmh0bWxcIixcclxuICBcImJcIjogXCJyZXN1bHQtZmFudGFzeS5odG1sXCIsXHJcbiAgXCJjXCI6IFwicmVzdWx0LXByYWN0aWNhbC5odG1sXCIsXHJcbiAgXCJkXCI6IFwicmVzdWx0LXVucHJvbXB0ZWQuaHRtbFwiXHJcbn07XHJcbmxldCBjYXJvdXNlbCA9ICQoXCIub3dsLWNhcm91c2VsLmNhcm91c2VsLS10ZXN0XCIpO1xyXG5sZXQgdGVzdEN0cmwgPSAkKCcuanMtdGVzdC1jdHJsJyk7XHJcblxyXG5mdW5jdGlvbiBpc0xhc3RTbGlkZSgpIHtcclxuICByZXR1cm4gY2Fyb3VzZWwuZmluZCgnLm93bC1pdGVtJykuZmlsdGVyKCc6bGFzdCcpLmhhc0NsYXNzKCdhY3RpdmUnKTtcclxufVxyXG5mdW5jdGlvbiBnZXRQYWdlKGFuc3dlcikge1xyXG4gIGxldCBwYWdlVXJsID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbiArICcvJztcclxuICBpZihNYWluLkRldmljZURldGVjdGlvbi5pc01vYmlsZVZlcnNpb24oKSkge1xyXG4gICAgcGFnZVVybCArPSAnbW9iaWxlLyc7XHJcbiAgfVxyXG4gIHBhZ2VVcmwgKz0gcGFnZXNbYW5zd2VyXTtcclxuICByZXR1cm4gcGFnZVVybDtcclxufVxyXG5cclxuZnVuY3Rpb24gcHJvY2Vzc1Rlc3QoZWwsIGlzTGFzdFNsaWRlID0gZmFsc2UpIHtcclxuICBsZXQga2V5ID0gJChlbCkuYXR0cignZGF0YS1rZXknKTtcclxuICByZXN1bHRba2V5XSArPSAxO1xyXG4gIGlmICghaXNMYXN0U2xpZGUpIHtcclxuICAgIHNob3dOZXh0KGVsKTtcclxuICB9IGVsc2Uge1xyXG4gICAgc2hvd1Jlc3VsdChyZXN1bHQpO1xyXG4gIH1cclxufVxyXG5mdW5jdGlvbiBzaG93TmV4dChlbCkge1xyXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICBjYXJvdXNlbC50cmlnZ2VyKCduZXh0Lm93bC5jYXJvdXNlbCcpO1xyXG4gIH0sIDMwMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGV4dHJhY3RLZXlWYWx1ZShvYmosIHZhbHVlKSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKVtPYmplY3QudmFsdWVzKG9iaikuaW5kZXhPZih2YWx1ZSldO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjYWxjdWxhdGVSZXN1bHQocmVzdWx0KSB7XHJcbiAgbGV0IGFyciA9IE9iamVjdC52YWx1ZXMocmVzdWx0KTtcclxuICBsZXQgbWF4ID0gTWF0aC5tYXgoLi4uYXJyKTtcclxuICBsZXQgbWF4S2V5ID0gZXh0cmFjdEtleVZhbHVlKHJlc3VsdCwgbWF4KTtcclxuICByZXR1cm4gbWF4S2V5O1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93UmVzdWx0KHJlc3VsdCkge1xyXG4gIGxldCBhbnN3ZXIgPSBjYWxjdWxhdGVSZXN1bHQocmVzdWx0KTtcclxuICBsZXQgcGFnZSA9IGdldFBhZ2UoYW5zd2VyKTtcclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHBhZ2U7XHJcbiAgfSwgMzAwLCBwYWdlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINC60LDRgNGD0YHQtdC70LhcclxuICovXHJcbmZ1bmN0aW9uIGluaXQoKXtcclxuXHJcbiAgY2Fyb3VzZWwub3dsQ2Fyb3VzZWwoe1xyXG4gICAgaXRlbXM6IDEsXHJcbiAgICBuYXY6IGZhbHNlLFxyXG4gICAgZG90czogdHJ1ZSxcclxuICAgIGxvb3A6IGZhbHNlLFxyXG4gICAgbW91c2VEcmFnOiBmYWxzZSxcclxuICAgIHRvdWNoRHJhZzogZmFsc2UsXHJcbiAgICBwdWxsRHJhZzogZmFsc2UsXHJcbiAgICBhbmltYXRlT3V0OiAnZmFkZU91dCdcclxuICB9KTtcclxuICBcclxuICB0ZXN0Q3RybC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgcHJvY2Vzc1Rlc3QodGhpcywgaXNMYXN0U2xpZGUoKSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge2luaXR9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy90ZXN0LmpzIiwiLyoqXHJcbiAqINCf0LXRgNC10LrQu9GO0YfQtdC90LjQtSDQutC70LDRgdGB0L7QsiDQv9C+INGA0LDQt9C70LjRh9C90YvQvCDRgdC+0LHRi9GC0LjRj9C8XHJcbiAqIEBtb2R1bGUgQW5pbWF0aW9uXHJcbiAqL1xyXG5cclxubGV0IHNjcm9sbEFuaW1hdGlvbkJsb2NrcyA9ICQoJy5hLXNjcm9sbC1ib3gnKTtcclxubGV0IHBhcmFsbGF4QmxvY2tzID0gJCgnLmEtcGFyYWxsYXgtYm94Jyk7XHJcbiBcclxuZnVuY3Rpb24gYWRkQ2xhc3NUb2dnbGVyU2NlbmUgKGVsLCBjb250cm9sbGVyKSB7XHJcbiAgbmV3IFNjcm9sbE1hZ2ljLlNjZW5lKHtcclxuICAgIHRyaWdnZXJFbGVtZW50OiBlbCxcclxuICAgIHRyaWdnZXJIb29rOiAwLjdcclxuICB9KVxyXG4gIC5zZXRDbGFzc1RvZ2dsZShlbCwgJ2FuaW1hdGUnKVxyXG4gIC5hZGRUbyhjb250cm9sbGVyKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkQ2xhc3NUb2dnbGVyQ29udHJvbGxlciAoYW5pbWF0aW9uQmxvY2tzKSB7XHJcbiAgbGV0IGNvbnRyb2xsZXIgPSBuZXcgU2Nyb2xsTWFnaWMuQ29udHJvbGxlcigpO1xyXG4gIGFuaW1hdGlvbkJsb2Nrcy5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgY2xvc2VzdENvbnRhaW5lciA9ICQodGhpcykuY2xvc2VzdCgnW2NsYXNzKj1cImdyaWRcIl06bm90KFtjbGFzcyo9XCJjb2xcIl0pJylbMF07XHJcbiAgICBpZiAoY2xvc2VzdENvbnRhaW5lci5vZmZzZXRUb3AgPCB3aW5kb3cub3V0ZXJIZWlnaHQpIHtcclxuICAgICAgJCh0aGlzKS5jaGlsZHJlbignW2NsYXNzKj1cImEtXCJdJykuY3NzKHsndHJhbnNpdGlvbic6ICdub25lJ30pO1xyXG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgIGxldCBkZWxheSA9IDI1MCAqICQoY2xvc2VzdENvbnRhaW5lcikuaW5kZXgoKTtcclxuICAgICAgJChzZWxmKS5kYXRhKCd0aW1lcicsIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoc2VsZikuY2hpbGRyZW4oJ1tjbGFzcyo9XCJhLVwiXScpLmNzcyh7J3RyYW5zaXRpb24nOiAnJ30pO1xyXG4gICAgICAgICQoc2VsZikuYWRkQ2xhc3MoJ2FuaW1hdGUnKTtcclxuICAgICAgfSwgMjUwKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgYURlbGF5ID0gMDtcclxuICAgICAgaWYgKCQodGhpcykuYXR0cignZGF0YS1hLWRlbGF5JykgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGFEZWxheSA9IE51bWJlcigkKHRoaXMpLmF0dHIoJ2RhdGEtYS1kZWxheScpKSAqIDEwMDA7XHJcbiAgICAgIH1cclxuICAgICAgc2V0VGltZW91dChhZGRDbGFzc1RvZ2dsZXJTY2VuZSwgYURlbGF5LCB0aGlzLCBjb250cm9sbGVyKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RnJvbVBvc2l0aW9uIChlbCwgZGVmYXVsdFBvc2l0aW9uID0gMCl7XHJcbiAgcmV0dXJuIChlbC5hdHRyKCdkYXRhLXBhcmFsbGF4LWZyb20nKSAhPT0gdW5kZWZpbmVkKSA/IE51bWJlcihlbC5hdHRyKCdkYXRhLXBhcmFsbGF4LWZyb20nKSkgOiBkZWZhdWx0UG9zaXRpb247XHJcbn1cclxuZnVuY3Rpb24gZ2V0VG9Qb3NpdGlvbiAoZWwsIGRlZmF1bHRQb3NpdGlvbiA9IDApe1xyXG4gIHJldHVybiAoZWwuYXR0cignZGF0YS1wYXJhbGxheC10bycpICE9PSB1bmRlZmluZWQpID8gTnVtYmVyKGVsLmF0dHIoJ2RhdGEtcGFyYWxsYXgtdG8nKSkgOiBkZWZhdWx0UG9zaXRpb247XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFBhcmFsbGF4VGltZWxpbmUgKGVsKSB7XHJcbiAgbGV0IHR3ZWVuID0gbmV3IFRpbWVsaW5lTWF4KCk7XHJcbiAgbGV0IHR3ZWVuc0FyciA9IFtdO1xyXG4gIGlmICgkKGVsKS5maW5kKCcuYS1wYXJhbGxheC1iYWNrJykpIHtcclxuICAgIGxldCB0YXJnZXRFbCA9ICQoZWwpLmZpbmQoJy5hLXBhcmFsbGF4LWJhY2snKTtcclxuICAgIGxldCBmcm9tUG9zID0gZ2V0RnJvbVBvc2l0aW9uKHRhcmdldEVsLCAtMjApO1xyXG4gICAgbGV0IHRvUG9zID0gZ2V0VG9Qb3NpdGlvbih0YXJnZXRFbCk7XHJcbiAgICB0d2VlbnNBcnIucHVzaChUd2Vlbk1heC5mcm9tVG8odGFyZ2V0RWwsIDEsIHt5UGVyY2VudDogZnJvbVBvc30sIHt5UGVyY2VudDogdG9Qb3MsIGVhc2U6IExpbmVhci5lYXNlTm9uZX0pKTtcclxuICB9XHJcbiAgaWYgKCQoZWwpLmZpbmQoJy5hLXBhcmFsbGF4LW1pZGRsZScpKSB7XHJcbiAgICBsZXQgdGFyZ2V0RWwgPSAkKGVsKS5maW5kKCcuYS1wYXJhbGxheC1taWRkbGUnKTtcclxuICAgIGxldCBmcm9tUG9zID0gZ2V0RnJvbVBvc2l0aW9uKHRhcmdldEVsLCAtMTUpO1xyXG4gICAgbGV0IHRvUG9zID0gZ2V0VG9Qb3NpdGlvbih0YXJnZXRFbCk7XHJcbiAgICB0d2VlbnNBcnIucHVzaChUd2Vlbk1heC5mcm9tVG8odGFyZ2V0RWwsIDEsIHt5UGVyY2VudDogZnJvbVBvc30sIHt5UGVyY2VudDogdG9Qb3MsIGVhc2U6IExpbmVhci5lYXNlTm9uZX0pKTtcclxuICB9XHJcbiAgaWYgKCQoZWwpLmZpbmQoJy5hLXBhcmFsbGF4LWZyb250JykpIHtcclxuICAgIGxldCB0YXJnZXRFbCA9ICQoZWwpLmZpbmQoJy5hLXBhcmFsbGF4LWZyb250Jyk7XHJcbiAgICBsZXQgZnJvbVBvcyA9IGdldEZyb21Qb3NpdGlvbih0YXJnZXRFbCwgLTEwKTtcclxuICAgIGxldCB0b1BvcyA9IGdldFRvUG9zaXRpb24odGFyZ2V0RWwsIDEwKTtcclxuICAgIHR3ZWVuc0Fyci5wdXNoKFR3ZWVuTWF4LmZyb21Ubyh0YXJnZXRFbCwgMSwge3lQZXJjZW50OiBmcm9tUG9zfSwge3lQZXJjZW50OiB0b1BvcywgZWFzZTogTGluZWFyLmVhc2VOb25lfSkpO1xyXG4gIH1cclxuICB0d2Vlbi5hZGQodHdlZW5zQXJyKTtcclxuICByZXR1cm4gdHdlZW47XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFBhcmFsbGF4U2NlbmUgKGVsLCB0d2VlbiwgY29udHJvbGxlcikge1xyXG4gIG5ldyBTY3JvbGxNYWdpYy5TY2VuZSh7XHJcbiAgICB0cmlnZ2VyRWxlbWVudDogZWwsXHJcbiAgICBkdXJhdGlvbjogJChlbCkuaGVpZ2h0KClcclxuICB9KVxyXG4gIC5zZXRUd2Vlbih0d2VlbilcclxuICAuYWRkVG8oY29udHJvbGxlcik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFBhcmFsbGF4Q29udHJvbGxlciAoYW5pbWF0aW9uQmxvY2tzKSB7XHJcbiAgbGV0IGNvbnRyb2xsZXIgPSBuZXcgU2Nyb2xsTWFnaWMuQ29udHJvbGxlcigpO1xyXG4gIGFuaW1hdGlvbkJsb2Nrcy5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgdHdlZW4gPSBnZXRQYXJhbGxheFRpbWVsaW5lKHRoaXMpO1xyXG4gICAgYWRkUGFyYWxsYXhTY2VuZSh0aGlzLCB0d2VlbiwgY29udHJvbGxlcik7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXQgKCkge1xyXG4gIGlmIChzY3JvbGxBbmltYXRpb25CbG9ja3MubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDEwMjQpe1xyXG4gICAgJCgnaHRtbCcpLmFkZENsYXNzKCdpcy1hbmltYXRpbmcnKTtcclxuICAgIGFkZENsYXNzVG9nZ2xlckNvbnRyb2xsZXIoc2Nyb2xsQW5pbWF0aW9uQmxvY2tzKTtcclxuICB9XHJcbiAgaWYgKHBhcmFsbGF4QmxvY2tzLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiAxMDI0KXtcclxuICAgICQoJ2h0bWwnKS5hZGRDbGFzcygnaXMtYW5pbWF0aW5nJyk7XHJcbiAgICBhZGRQYXJhbGxheENvbnRyb2xsZXIocGFyYWxsYXhCbG9ja3MpO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7aW5pdH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL2FuaW1hdGlvbi5qcyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFWQTs7Ozs7Ozs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQzNCQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFPQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7Ozs7Ozs7O0FDckRBOzs7OztBQUtBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQVFBO0FBQ0E7Ozs7Ozs7OztBQ3RCQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUMzRkE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ25DQTs7Ozs7QUFNQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ2hFQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBVkE7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUN2RUE7Ozs7O0FBS0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3ZCQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBO0FBQ0E7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3ZGQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=