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

      if(timer.timeRemaning >=0){
        setInterval(updateClock, 1000);
      } else {
        clearInterval(timerId);
      }
    }
    
    updateClock();
  }

  //countTimer();
  timerId = countTimer('27 april 2021');
});