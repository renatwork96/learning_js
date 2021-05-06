'use strict';
const sendForm = (formId, textStyle) => {
    
  const errorVessage = 'Что-то пошло не так...',
    loadMessage = 'Загрузка...',
    successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

  const form = document.getElementById(formId);

  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = textStyle;
  
  form.addEventListener('submit', (event) => {
    
    event.preventDefault();
    form.appendChild(statusMessage);
    statusMessage.textContent = loadMessage;
    const formData = new FormData(form);
    let body = {};

    formData.forEach((val, key) => {
      body[key] = val;
    });

    const postData = (bodyForm) => {

      return fetch('./server.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyForm),
        credentials: 'include'
      });

      // return new Promise((resolve, reject) => {
      //   const request = new XMLHttpRequest();
      //   request.addEventListener('readystatechange', () => {

      //     if (request.readyState !== 4) {
      //       return;
      //     }

      //     if (request.status === 200) {
      //       resolve();
      //     } else {
      //       reject(request.status);
      //     }
      //   });

      //   request.open('POST', './server.php');
      //   request.setRequestHeader('Content-Type', 'application/json');
      //   request.send(JSON.stringify(body));
      // });

    };

  
    postData(body)
    .then((response) => {
        if(response.status !== 200) {
          throw new Error ('status network not 200');
        }
        console.log(response);
        statusMessage.textContent = successMessage;  
        form.reset();  
        setTimeout(() => {statusMessage.textContent = '';}, 4000);      
      })
    .catch((error) => {
        statusMessage.textContent = errorVessage;
        console.error(error);
      });
    
  });

};

export default sendForm;
