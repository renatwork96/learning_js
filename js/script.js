'use strict';

let money;
// let income = 'Фриланс'; 
// let addExpenses =prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
// let deposit = confirm('Есть ли у вас депозит в банке?');
// let mission = 100000; 
// let period = 6;
let amount1;
let amount2;
let expenses = [];
// let budgetDay;

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let start = function() {
  do {
  money = prompt('Ваш месячный доход?');
 } while (!isNumber(money));
};

start();


let appData = {
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 50000,
  period: 3,
  asking: function(){
    let addExpenses =prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
  },

  getExpensesMonth: function() {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
      appData.expenses[i] = prompt('Введите обязательную статью расходов?');
      sum = prompt('Во сколько это обойдется?');
      if (isNumber(sum)) {
        sum += sum;
      } else { do {
        sum = prompt('Во сколько это обойдется?');
        } while (!isNumber(sum));
      }
    }
    console.log( sum + " вызов суммы расходов" );
    return sum;
  },

  getAccumulatedMonth: function() {
    return money - appData.getExpensesMonth;
  },

  getTargetMonth: function() {
    if (appData.budgetMonth > 0) {
      return Math.ceil( appData.mission / appData.budgetMonth );
    } else {
      return 'Цель не будет достигнута';
    }
  }
};

appData.asking();


console.log(Object.keys(appData.income).length);

console.log('Период равен ' + appData.period + ' месяцев.');
console.log('Цель заработать ' + appData.mission + ' рублей.');

// expenses1 = prompt('Введите обязательную статью расходов?');
// amount1 = +prompt('Во сколько это обойдется?');
// expenses2 = prompt('Введите обязательную статью расходов?');
// amount2 = +prompt('Во сколько это обойдется?');

appData.expensesMonth = appData.getExpensesMonth();
console.log( appData.expensesMonth + " вызов суммы расходов 3" );

appData.budgetMonth = appData.getAccumulatedMonth();

appData.getTargetMonth();

console.log( appData.getTargetMonth() );

console.log('Месячный бюджет: ' + appData.budgetMonth);

appData.budgetDay = Math.floor(appData.budgetMonth / 30);

console.log('Бюджет на день: ' + appData.budgetDay);

let getStatusIncome = function() {
  if (appData.budgetDay >= 1200) {
    alert('У вас высокий уровень дохода');
  } else if (1200 > appData.budgetDay && appData.budgetDay >= 600) {
    alert('У вас средний уровень дохода');
  } else if (600 > appData.budgetDay && appData.budgetDay >= 0) {
    alert('К сожалению у вас уровень дохода ниже среднего');
  } else if (appData.budgetDay < 0) {
    alert('Что то пошло не так');
  }
};

getStatusIncome();




