'use strict';
const validateInput = (selector) => {

  const form = document.querySelector(selector);
  const inputSelector = form.querySelectorAll('input');

  inputSelector.forEach((item) => {

    //Для имен
    if (item.getAttribute('name') === "user_name") {

      item.addEventListener('input', () => {
        item.value =  item.value.replace(/[^а-яё \-]/ig,'');
      });

      item.addEventListener('blur', () => {
        item.value = item.value.toLowerCase();
        item.value =  item.value.replace(/( |^)[а-яё]/g, function(x){ return x.toUpperCase();});
        item.value =  item.value.replace(/\s+/g, ' ');
        item.value =  item.value.replace(/\-+/g, '-');
        item.value =  item.value.replace(/^\s*/,'');
      });

    }

    //Для email
    if (item.getAttribute('name') === "user_email") {

      item.addEventListener('input', () => {
        item.value =  item.value.replace(/[^a-z@.!~*'\_\-]/ig,'');
      });

    }

    //Для телефона
    if (item.getAttribute('name') === "user_phone") {

      item.addEventListener('input', () => {
        item.value =  item.value.replace(/[^0-9\+]/g, '');
      });

      // item.addEventListener('blur', () => {
      //   item.value =  item.value.replace(/\-+/g, '-');
      //   item.value =  item.value.replace(/^\s*/,'');
      // });

    }

    //Для сообщения
    if (item.getAttribute('name') === "user_message") {

      item.addEventListener('input', () => {
        item.value =  item.value.replace(/[^а-яё0-9 \.,!\-]/ig,'');
      });

      item.addEventListener('blur', () => {
        item.value =  item.value.replace(/\s+/g, ' ');
        item.value =  item.value.replace(/\-+/g, '-');
        item.value =  item.value.replace(/^\s*/,'');
      });

    }

  });

};

export default validateInput;