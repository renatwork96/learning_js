'use strict';
const calc = (price = 100) => {
  const calcBlock = document.querySelector('.calc-block'),
    calcType = document.querySelector('.calc-type'),
    calcSquare = document.querySelector('.calc-square'),
    calcDay = document.querySelector('.calc-day'),
    calcCount = document.querySelector('.calc-count'),
    totalValue = document.getElementById('total');

  const countSum = () => {
    let total = 0;
    let countValue = 1;
    let dayValue = 1;
    const typeValue = calcType.options[calcType.selectedIndex].value;
    const squareValue = +calcSquare.value;

    if (calcCount.value > 1) {
      countValue += (calcCount.value - 1) / 10;
    }

    if (calcDay.value && calcDay.value < 5) {
      dayValue *= 2;
    } else if (calcDay.value && calcDay.value < 10) {
      dayValue *= 1.5;
    } 

    if (typeValue && squareValue) {
      total = Math.round(price * typeValue * squareValue * countValue * dayValue);
    }


    const animate = ({timing, draw, duration}, callback) => {
      let start = performance.now();
      requestAnimationFrame(function animate(time) {
          let timeFraction = (time - start) / duration;
          if (timeFraction > 1) {timeFraction = 1;}
          let progress = timing(timeFraction);
          draw(progress); 
          if (timeFraction < 1) {
              requestAnimationFrame(animate);
          }
      });
    };

    const recountTotal = () => {
      totalValue.textContent = 0;
      animate({
        duration: 1000,
        timing(timeFraction) {
            return timeFraction;
        },
        draw(progress) {
            totalValue.textContent = Math.floor(progress * total);
        }
      });
    };
    
    recountTotal();      
  };

  calcBlock.addEventListener('change', (event) => {
    const target = event.target;

    if (target === calcType || target === calcSquare || target === calcDay || target === calcCount) {
      countSum();
    }

    // if (target.matches('select') || target.matches('input')) {
    //   countSum();
    // }
  });
};

export default calc;