'use strict';

let money;
let income = 'Фриланс'; 
let addExpenses =prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 100000; 
let period = 6;
let amount1;
let amount2;
let expenses = [];
let budgetDay;
let missionMonth;
let accumulatedMonth;

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let start = function() {
  do {
  money = prompt('Ваш месячный доход?');
 } while (!isNumber(money));
};

start();



let showTypeOf = function(data) {
  console.log(typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(income.length);
console.log('Период равен ' + period + ' месяцев.');
console.log('Цель заработать ' + mission + ' рублей.');
console.log(addExpenses.toLowerCase().split(', '));

// expenses1 = prompt('Введите обязательную статью расходов?');
// amount1 = +prompt('Во сколько это обойдется?');
// expenses2 = prompt('Введите обязательную статью расходов?');
// amount2 = +prompt('Во сколько это обойдется?');

let getExpensesMonth = function() {
  let sum = 0;
  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt('Введите обязательную статью расходов?');
    sum = prompt('Во сколько это обойдется?');
    if (isNumber(sum)) {
      sum += sum;
    } else { do {
      sum = prompt('Во сколько это обойдется?');
      } while (!isNumber(sum));
    }
  }
  return sum;
};

let getAccumulatedMonth = function() {
  return money - getExpensesMonth();
};

accumulatedMonth = getAccumulatedMonth();

let getTargetMonth = function() {
  if (accumulatedMonth > 0) {
    return Math.ceil( mission / accumulatedMonth );
  } else {
    return 'Цель не будет достигнута';
  }
};

console.log( getTargetMonth() );

console.log('Месячный бюджет: ' + accumulatedMonth);

budgetDay = Math.floor(accumulatedMonth / 30);

console.log('Бюджет на день: ' + budgetDay);

let getStatusIncome = function() {
  if (budgetDay >= 1200) {
    alert('У вас высокий уровень дохода');
  } else if (1200 > budgetDay && budgetDay >= 600) {
    alert('У вас средний уровень дохода');
  } else if (600 > budgetDay && budgetDay >= 0) {
    alert('К сожалению у вас уровень дохода ниже среднего');
  } else if (budgetDay < 0) {
    alert('Что то пошло не так');
  }
};

getStatusIncome();




