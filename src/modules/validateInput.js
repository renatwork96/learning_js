'use strict';
const validateInput = (selector) => {

  const form = document.querySelector(selector);
  const inputSelector = form.querySelectorAll('input');
  const submit = form.querySelector('button');

  let validName;
  let validPhone;
  let validMail;

  inputSelector.forEach((item) => {


    //Для имен
    if (item.getAttribute('name') === "user_name") {

      let conditionsForm = /.{2,50}/ig;

      item.addEventListener('input', () => {
        item.value =  item.value.replace(/[^а-яё \-]/ig,'');
      });

      item.addEventListener('blur', () => {
        item.value = item.value.toLowerCase();
        item.value =  item.value.replace(/( |^)[а-яё]/g, function(x){ return x.toUpperCase();});
        item.value =  item.value.replace(/\s+/g, ' ');
        item.value =  item.value.replace(/\-+/g, '-');
        item.value =  item.value.replace(/^\s*/,'');
        
        
        validName = conditionsForm.test(item.value);
        console.log(validName + " -validName");
        conditionsForm.test(item.value);

        if(!validName){
          submit.style.cursor = "not-allowed";
          submit.disabled = true;
        } else if (validName && validPhone && validMail) {
          submit.style.cursor = "default";
          submit.disabled = false;
        }
      });

    }

    //Для email
    if (item.getAttribute('name') === "user_email") {

      let conditionsForm = /[a-z@.!~*'\_\-]+?@.+\.[a-z]{2,4}/ig;

      item.addEventListener('input', () => {
        item.value =  item.value.replace(/[^a-z@.!~*'\_\-]/ig,'');

        validMail = conditionsForm.test(item.value);
        conditionsForm.test(item.value);

        if(!validMail){
          submit.style.cursor = "not-allowed";
          submit.disabled = true;
        } else if (validName && validPhone && validMail) {
          submit.style.cursor = "default";
          submit.disabled = false;
        }
      });

      

    }

    //Для телефона
    if (item.getAttribute('name') === "user_phone") {

      let conditionsForm = /\+?[0-9]{11}/ig;

      item.addEventListener('input', () => {
        item.value =  item.value.replace(/[^0-9\+]/g, '');

        validPhone = conditionsForm.test(item.value);
        conditionsForm.test(item.value);
        
        if(!validPhone){
          submit.style.cursor = "not-allowed";
          submit.disabled = true;
        } else if (validName && validPhone && validMail) {
          submit.style.cursor = "default";
          submit.disabled = false;
        }
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


