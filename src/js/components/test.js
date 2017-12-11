/**
 * Тест
 * @module Test
 */

let result = {
  "a": 0,
  "b": 0,
  "c": 0,
  "d": 0
};
let pages = {
  "a": "result-romantic.html",
  "b": "result-fantasy.html",
  "c": "result-practical.html",
  "d": "result-unprompted.html"
};
let carousel = $(".owl-carousel.carousel--test");
let testCtrl = $('.js-test-ctrl');

function isLastSlide() {
  return carousel.find('.owl-item').filter(':last').hasClass('active');
}
function getPage(answer) {
  let pageUrl = window.location.origin + '/';
  if(Main.DeviceDetection.isMobileVersion()) {
    pageUrl += 'mobile/';
  }
  pageUrl += pages[answer];
  return pageUrl;
}

function processTest(el, isLastSlide = false) {
  let key = $(el).attr('data-key');
  result[key] += 1;
  if (!isLastSlide) {
    showNext(el);
  } else {
    showResult(result);
  }
}
function showNext(el) {
  setTimeout(function() {
    carousel.trigger('next.owl.carousel');
  }, 300);
}

function extractKeyValue(obj, value) {
    return Object.keys(obj)[Object.values(obj).indexOf(value)];
}

function calculateResult(result) {
  let arr = Object.values(result);
  let max = Math.max(...arr);
  let maxKey = extractKeyValue(result, max);
  return maxKey;
}

function showResult(result) {
  let answer = calculateResult(result);
  let page = getPage(answer);
  setTimeout(function(){
    window.location.href = page;
  }, 300, page);
}

/**
 * Инициализация карусели
 */
function init(){

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
  
  testCtrl.on('click', function() {
    $(this).addClass('is-active');
    processTest(this, isLastSlide());
  });
}

module.exports = {init};