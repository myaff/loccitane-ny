/**
 * Карусель
 * @module Carousel
 */

let carousel;

/**
 * Инициализация карусели
 */
function init(){
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

module.exports = {init};