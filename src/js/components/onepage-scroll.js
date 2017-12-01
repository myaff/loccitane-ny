/**
 * Onepage Scroll
 * @module Onepage
 */

let onepage;

/**
 * Инициализация onepage
 */
function init(){
  onepage = $(".onepage-wrapper");
  
  if (onepage.length > 0) {
    onepage.onepage_scroll({
      sectionContainer: ".onepage-section",
      pagination: true,
      updateUrl: false,
      loop: false,
      responsiveFallback: 600
    })
  }
}

module.exports = {init};