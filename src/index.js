
'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changeAvatar from './modules/changeAvatar';
import validateInput from './modules/validateInput';
import validateCalc from './modules/validateCalc';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

//Timer
countTimer('8 may 2021');

//меню
toggleMenu();

//popup
togglePopUp();

//табы
tabs();

//Слайдер
slider();

//Смена фото 
changeAvatar();

//Проверка форм
validateInput('#form1');
validateInput('#form2');
validateInput('#form3');
validateCalc('.calc-block > input');

//Калькулятор
calc(100);

//send-ajax-form
sendForm('form1', 'font-size: 2rem;');
sendForm('form2', 'font-size: 2rem;');
sendForm('form3', 'font-size: 2rem; color: white;');
