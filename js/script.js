'use strict';

let money;

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let start = function() {
  do {
  money = prompt('Ваш месячный доход?');
 } while (!isNumber(money) || money === '' || money === null);
};

let cycleQuestionNumbers = function(question) {
  let returnNumber = 0;
  do {
    returnNumber = prompt(question);
  } while (!isNumber(returnNumber) || returnNumber === '' || returnNumber === null);
  return +returnNumber;
};

let cycleQuestionText = function(question) {
  let returnText = 0;
  do {
    returnText = prompt(question);
  } while (isNumber(returnText) || returnText === '' || returnText === null);
  return returnText;
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
  precentDeposit: 0,
  moneyDeposit: 0,
  mission: 50000,
  period: 3,
  asking: function() {

    if(confirm('Есть ли у вас дополнительный заработок?')){
      let itemIncome = cycleQuestionText('Какой у вас дополнительный заработок?');
      appData.income[itemIncome] = cycleQuestionNumbers('Сколько в месяц вы на этом зарабатываете?');
    }

    let addExpenses =cycleQuestionText('Перечислите возможные расходы за рассчитываемый период через запятую');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');

    let i = 0;
    for (let word of appData.addExpenses) {
      appData.addExpenses[i] = word.charAt(0).toUpperCase() + word.substr(1);
      i++;
    }

    let str = appData.addExpenses.join(', ');
    console.log(str);

    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    for (let i = 0; i < 2; i++) {
      let cashExpenses = function() {
        let amount = 0;
          do {
            amount = prompt('Во сколько это обойдется?');
          } while (!isNumber(amount) || amount === '' || amount === null);
        return +amount;
      };
      appData.expenses[cycleQuestionText('Введите обязательную статью расходов?')] = cashExpenses();
      
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
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

  getTargetMonth: function() {
    return Math.ceil( appData.mission / appData.budgetMonth );
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
  },

  getInfoDeposit: function(){
    if(appData.deposit) {
      appData.precentDeposit = cycleQuestionNumbers('Какой годовой процент?');
      appData.moneyDeposit = cycleQuestionNumbers('Какая сумма заложена?');
    }
  },
  calcSavedMoney: function() {
    return appData.budgetMonth * appData.period;
  }
};

appData.asking();
appData.expensesMonth = appData.getExpensesMonth();

console.log("Расходы за месяц " + appData.expensesMonth);

appData.getBudget();
appData.getTargetMonth();

if (appData.getTargetMonth() > 0) {
  console.log( "За какой период будет достигнута цель (в месяцах): " + appData.getTargetMonth() );
} else  {
  console.log('Цель не будет достигнута');
}


console.log('Уровень дохода: ' + appData.getStatusIncome());
appData.getInfoDeposit();


console.log("Наша программа включает в себя данные:");
for (let key in appData) {
  console.log(key, appData[key]);
}





