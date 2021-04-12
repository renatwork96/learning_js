'use strict';

let money;

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
  budget: +money,
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
  asking: function() {
    let addExpenses =prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    for (let i = 0; i < 2; i++) {
      let text = function() {
        let amount = 0;
          do {
            amount = prompt('Во сколько это обойдется?');
          } while (!isNumber(amount));
        return +amount;
      };
      appData.expenses[prompt('Введите обязательную статью расходов?')] = text();
      
    }

  },

  getExpensesMonth: function() {
    let sum = 0;
    for (let key in appData.expenses) {
      sum += +appData.expenses[key];
    }
    return sum;
  },

  getBudget: function() {
    appData.budgetMonth = money - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
  },

  getTargetMonth: function() {
    if (appData.budgetMonth > 0) {
      return Math.ceil( appData.mission / appData.budgetMonth );
    } else {
      return 'Цель не будет достигнута';
    }
  },

  getStatusIncome: function() {
    if (appData.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (1200 > appData.budgetDay && appData.budgetDay >= 600) {
      return ('У вас средний уровень дохода');
    } else if (600 > appData.budgetDay && appData.budgetDay >= 0) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (appData.budgetDay < 0) {
      return ('Что то пошло не так');
    }
  }
};

appData.asking();

//console.log(appData.expenses);

appData.expensesMonth = appData.getExpensesMonth();

console.log("Расходы за месяц " + appData.expensesMonth);

appData.getBudget();

appData.getTargetMonth();

console.log( "За какой период будет достигнута цель (в месяцах): " + appData.getTargetMonth() );

console.log('Уровень дохода: ' + appData.getStatusIncome());

console.log("Наша программа включает в себя данные:");
for (let key in appData) {
  console.log(key, appData[key]);
}





