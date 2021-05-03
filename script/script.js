window.addEventListener('DOMContentLoaded', function() {
  'use strict';

  //Timer
  let timerId;

  function countTimer(deadline){
    let timerHours = document.querySelector('#timer-hours');
    let timerMinutes = document.querySelector('#timer-minutes');
    let timerSeconds = document.querySelector('#timer-seconds');

    function addZero(numbers) {
      if (numbers < 10) {
        numbers = '0' + numbers;
        return numbers;
      } else {
        return numbers;
      }
    }

    function getTimeRemaining(){
      let dateStop = new Date(deadline).getTime();
      let dateNow = new Date().getTime();
      let timeRemaning = (dateStop - dateNow) / 1000;
      let seconds;
      let minutes;
      let hours;
      if (timeRemaning > 0) {
        seconds = addZero(Math.floor(timeRemaning % 60));
        minutes = addZero(Math.floor((timeRemaning / 60) % 60));
        hours = addZero(Math.floor(timeRemaning / 60 / 60));
      } else {
        seconds = '00';
        minutes = '00';
        hours = '00';
      }
      return {timeRemaning, hours, minutes, seconds};
    }

    

    function updateClock() {
      let timer = getTimeRemaining();

      timerHours.textContent = timer.hours;
      timerMinutes.textContent = timer.minutes;
      timerSeconds.textContent = timer.seconds;

      if(timer.timeRemaning < 0){
        clearInterval(timerId);
      } 
    }
    setInterval(updateClock, 1000);
  }

  //countTimer();
  timerId = countTimer('29 april 2021');

  //меню
  const toggleMenu = () => {
    

    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu'),
      closeBtn = document.querySelector('.close-btn'),
      menuItems = menu.querySelectorAll('ul>li');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    btnMenu.addEventListener('click', handlerMenu);

    menu.addEventListener('click', () => {
      let target = event.target;

      if (target === closeBtn){
        handlerMenu();
      }

      for(let i = 0; i < menuItems.length; i++) {
        if (target === menuItems[i].firstElementChild){
          handlerMenu();
        }
      }
    });

    //closeBtn.addEventListener('click', handlerMenu);

    //menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
  };

  toggleMenu();

  //popup
  let popupId;

  const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),
      popupContent = document.querySelector('.popup-content');

    let count = 0;

    const popapAnimation = () => {
      count += 0.05;
      popupContent.style.opacity = count;
      popup.style.display = 'block';
      if(count >= 1 ) {
        clearInterval(popupId);
        count = 0;
      }
    };

    popupBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        if (window.innerWidth > 768) {
          popupId = setInterval(popapAnimation, 20);
        } else {
          popup.style.display = 'block';
        }
      });
    });

    popup.addEventListener('click', (event) => {
      let target = event.target;

      if (target.classList.contains('popup-close')) {
        popup.style.display = 'none';
        clearInterval(popupId);
      } else {

        target = target.closest('.popup-content');

        if(!target) {
          popup.style.display = 'none';
        }
      }
      
    });

  };

  togglePopUp();

  //табы

  const tabs = () => {

    const tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');
    
      

    const toggleTabContent = (index) => {
      
      for(let i = 0; i < tabContent.length; i++) {
        
        if (index === i) {

          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');

        } else {

          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');

        }

      }

    };
      tabHeader.addEventListener('click', (event) => {
        
        let target = event.target;
          target = target.closest('.service-header-tab');

        if (target){

          tab.forEach((item, i) => {

            if (item === target) {
              toggleTabContent(i);
            }

          });

        }
      });
    };

  tabs();

  //Слайдер

  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
      btn = document.querySelectorAll('.portfolio-btn'),
      slider = document.querySelector('.portfolio-content'),
      portfolioDots = document.getElementsByClassName('portfolio-dots')[0];

    let currentSlide = 0;
    let interval;

    const addDots = () => {
      for (let i = 0; i < slide.length; i++) {
        
        let dotLi = document.createElement('li');
        dotLi.classList.add('dot');
        portfolioDots.appendChild(dotLi);

        if (i === 0) {
          dotLi.classList.add('dot-active');
        }
      }
    };

    addDots();

    let dot = document.querySelectorAll('.dot');

    const prevSlide = (elem, index, strClass) => {
      //slide[currentSlide].classList.remove('portfolio-item-active'); Пример 
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault();

      let target = event.target;

      if(!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if(target.matches('#arrow-right')) {
        currentSlide++;
      } else if(target.matches('#arrow-left')) {
        currentSlide--;
      } else if(target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      } else if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');

    });

    slider.addEventListener('mouseover', (event) => {
      if (event.target.matches('.portfolio-btn') || 
      event.target.matches('.dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.portfolio-btn') || 
      event.target.matches('.dot')) {
        startSlide();
      }
    });

    startSlide(1500);

  };

  slider();

  //Смена фото 
  const command = document.getElementById('command');
  const comandPhotos = document.querySelectorAll('.command__photo');
  let comandPhotosImg = [];
  
  command.addEventListener('mouseover', (event) => {
    
    let target = event.target;

    for(let i = 0; i < comandPhotos.length; i++) {

      if (target === comandPhotos[i]) {
        comandPhotosImg[i] = event.target.src;
        event.target.src = event.target.dataset.img;
      }

    }

  });

  command.addEventListener('mouseout', (event) => {

    let target = event.target;

    for(let i = 0; i < comandPhotos.length; i++) {

      if (target === comandPhotos[i]) {
        event.target.src = comandPhotosImg[i];
      }

    }

  });

  //Проверка форм
  
  const validateInput = (selector) => {

    const form = document.querySelector(selector);
    const inputSelector = form.querySelectorAll('input');

    for (let i = 0; i < inputSelector.length; i++) {

      //Для имен
      if (inputSelector[i].getAttribute('name') === "user_name") {

        inputSelector[i].addEventListener('input', () => {
          inputSelector[i].value =  inputSelector[i].value.replace(/[^а-яё \-]/ig,'');
        });

        inputSelector[i].addEventListener('blur', () => {
          inputSelector[i].value = inputSelector[i].value.toLowerCase();
          inputSelector[i].value =  inputSelector[i].value.replace(/( |^)[а-яё]/g, function(x){ return x.toUpperCase();});
          inputSelector[i].value =  inputSelector[i].value.replace(/\s+/g, ' ');
          inputSelector[i].value =  inputSelector[i].value.replace(/\-+/g, '-');
          inputSelector[i].value =  inputSelector[i].value.replace(/^\s*/,'');
        });

      }

      //Для email
      if (inputSelector[i].getAttribute('name') === "user_email") {

        inputSelector[i].addEventListener('input', () => {
          inputSelector[i].value =  inputSelector[i].value.replace(/[^a-z@.!~*'\_\-]/ig,'');
        });

      }

      //Для телефона
      if (inputSelector[i].getAttribute('name') === "user_phone") {

        inputSelector[i].addEventListener('input', () => {
          inputSelector[i].value =  inputSelector[i].value.replace(/[^0-9\-()]/g, '');
        });

        inputSelector[i].addEventListener('blur', () => {
          inputSelector[i].value =  inputSelector[i].value.replace(/\-+/g, '-');
          inputSelector[i].value =  inputSelector[i].value.replace(/^\s*/,'');
        });

      }

      //Для сообщения
      if (inputSelector[i].getAttribute('name') === "user_message") {

        inputSelector[i].addEventListener('input', () => {
          inputSelector[i].value =  inputSelector[i].value.replace(/[^а-яё \-]/ig,'');
        });

        inputSelector[i].addEventListener('blur', () => {
          inputSelector[i].value =  inputSelector[i].value.replace(/\s+/g, ' ');
          inputSelector[i].value =  inputSelector[i].value.replace(/\-+/g, '-');
          inputSelector[i].value =  inputSelector[i].value.replace(/^\s*/,'');
        });

      }

    }

  };

  const validateCalc = (selector) => {

    const inputs = document.querySelectorAll(selector);

    for (let i = 0; i < inputs.length; i++) {

      inputs[i].addEventListener('input', () => {
        inputs[i].value =  inputs[i].value.replace(/\D/g, '');
      });

    }

  };

  validateInput('#form1');
  validateInput('#form2');
  validateInput('#form3');
  validateCalc('.calc-item');

});