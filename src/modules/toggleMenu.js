'use strict';
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

export default toggleMenu;