window.addEventListener('DOMContentLoaded', function() {
  'use strict';

  function message(){
    const timesOfDay = document.querySelector('#timesOfDay');
    const dayOfWeek = document.querySelector('#dayOfWeek');
    const currentTime = document.querySelector('#currentTime');
    const beforeNewYear = document.querySelector('#beforeNewYear');

    let dateNow = new Date();
    let dateNewYear = new Date('1 January 2022');
    let hour = dateNow.getHours();
    
    //Время суток
    if (hour <= 6) {
      timesOfDay.textContent = 'Доброй ночи';
    } else if (hour <= 12) {
      timesOfDay.textContent = 'Доброе утро';
    } else if (hour <= 18) {
      timesOfDay.textContent = 'Добрый день';
    } else {
      timesOfDay.textContent = 'Добрый вечер';
    }

    //День недели
    let days = [
      'Воскресенье',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота'
    ];
    let d = new Date();
    let n = d.getDay();
    dayOfWeek.textContent = days[n];

    //Время в формате PM/AM
    if (hour <= 12) {
      currentTime.textContent = dateNow.toLocaleTimeString('en');
    } else {
      currentTime.textContent = dateNow.toLocaleTimeString('en');
    }

    //Дней до Нового года
    let dayBeforeNewYear = Math.ceil((dateNewYear.getTime() - dateNow.getTime()) / ( 1000 * 60 * 60 * 24 ));
    beforeNewYear.textContent = dayBeforeNewYear;
  }
});