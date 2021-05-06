'use strict';
const togglePopUp = () => {

  let popupId;
  
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

export default togglePopUp;