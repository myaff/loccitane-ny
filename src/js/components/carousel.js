/**
 * Карусель
 * @module Carousel
 */

let carousel;

/**
 * Инициализация карусели
 */
function init(){
  carousel = $(".owl-carousel");

  carousel.owlCarousel({
    items: 1,
    nav: false,
    dots: true,
    loop: false,
    mouseDrag: false,
    animateOut: 'fadeOut'
  });
}

module.exports = {init};