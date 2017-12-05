/**
 * Модуль для работы Форм
 * @module Form
 */

function validateField(field) {
  let isValid = field.validity.valid;
  let fieldContainer = $(field).closest('.field');
  if (isValid) {
    fieldContainer.removeClass('has-error');
  } else {
    fieldContainer.addClass('has-error');
  }
  return isValid;
}

function validateForm(elForm) {
  let errors = 0;
  Array.from(elForm.elements).forEach(function(item) {
    let isValidField = validateField(item);
    if(!isValidField) {
      errors += 1;
    }
  });
  return errors;
}

function getPageType (layout) {
  return layout === 'test' ? 'test' : 'main';
}

/**
 * инициализация событий форм
 * @example
 * Form.init();
 */
function init(){
  let jsForm = $('.js-form');
  
  jsForm.each(function(){
    let self = $(this);
    let selfForm = self.find('.js-form-form');
    let selfResult = self.find('.js-form-result');
    let selfSubmit = self.find('.js-form-submit');
    
    selfSubmit.on('click', function(e) {
      e.preventDefault();
      let hasError = validateForm(selfForm[0]);
      if (!hasError) {
        let request = $.ajax({
          url: 'http://loccitane.hsmp.ru/api/emails/',
          type: 'POST',
          dataType: 'json',
          data: {
            'email': $(selfForm).find('input[type="email"]').val(),
            'page': getPageType(self.attr('data-page-type'))
          },
          beforeSend: function () {
            selfSubmit.attr('disabled', 'disabled');
          }
        });
        request.done(function (response, textStatus, jqXHR) {
          self.addClass('is-submitted');
          setTimeout(function(){
            selfResult.show();
          }, 300);
        });
      }
    });
  });
}

module.exports = {init};