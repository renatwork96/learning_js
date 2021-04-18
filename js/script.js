'use strict';

let start = document.getElementById('start');

let incomePlus = document.getElementsByTagName('button')[0];
let expensesPlus = document.getElementsByTagName('button')[1];

let depositCheck = document.querySelector('#deposit-check');

let additionalIncomeItem = document.querySelectorAll('.additional_income-item');

const value = document.querySelectorAll('[class*="-value"]');
// console.log(value);
let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
let additionalIncmeValue = document.getElementsByClassName('additional_income-value')[0];
let targetMonthValue = document.getElementsByClassName('target_month-value')[0];
let incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
let salaryAmount = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('.income-title');
let expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
let incomeItems = document.querySelectorAll('.income-items');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');
let periodAmount = document.querySelector('.period-amount');
let inocomeItem = document.querySelectorAll('.income-item');


let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let checkQuestionNumbers = function(question) {
  let returnNumber = 0;
  do {
    returnNumber = prompt(question);
  } while (!isNumber(returnNumber) || returnNumber === '' || returnNumber === null);
  return +returnNumber;
};

let checkQuestionText = function(question) {
  let returnText = 0;
  do {
    returnText = prompt(question);
  } while (isNumber(returnText) || returnText === '' || returnText === null);
  return returnText;
};

let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  precentDeposit: 0,
  moneyDeposit: 0,
  start: function() {
    appData.budget = +salaryAmount.value;
    // console.log('salaryAmount.value: ',salaryAmount.value);

    appData.getExpenses();
    appData.getIncome();
    appData.expensesMonth = appData.getExpensesMonth();
    appData.incomeMonth = appData.getIncomeMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();

    appData.showResult();
  },

  showResult: function() {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncmeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value =  appData.calcPeriod();
    
  },

  addExpensesBlock: function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3){
      expensesPlus.style.display = 'none';
    }
  },
  addIncomeBlock: function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3){
      incomePlus.style.display = 'none';
    }
  },

  getExpenses: function() {
    expensesItems.forEach(function(item){
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== ''){
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    });
  },

  getIncome: function() {
    incomeItems.forEach(function(item){
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if(itemIncome !== '' && cashIncome !== ''){
        appData.income[itemIncome] = +cashIncome;
      }
    });
    // if(confirm('Есть ли у вас дополнительный заработок?')){
    //   let itemIncome = checkQuestionText('Какой у вас дополнительный заработок?');
    //   appData.income[itemIncome] = +checkQuestionNumbers('Сколько в месяц вы на этом зарабатываете?');
    // }

    // for (let key in appData.income){
    //   appData.incomeMonth += +appData.income[key];
    // }
  },
  getAddExpenses: function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim();
      if (item !== ''){
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function() {
    additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },

  getExpensesMonth: function() {
    let sum = 0;
    for (let key in appData.expenses) {
      sum += +appData.expenses[key];
    }
    return sum;
  },

  getIncomeMonth: function() {
    let sum = 0;
    for (let key in appData.income) {
      sum += +appData.income[key];
    }
    return sum;
    
  },

  blockStartBtn: function() {
    if((salaryAmount.value === '') || !isNumber(salaryAmount.value) || (salaryAmount.value === null)){
      start.disabled = true;
      
    } else {
      start.disabled = false;
      start.addEventListener('click', appData.start);
    }
  },

  getBudget: function() {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

  getTargetMonth: function() {
    return Math.ceil( targetAmount.value / appData.budgetMonth );
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
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    if(appData.deposit) {
      appData.precentDeposit = checkQuestionNumbers('Какой годовой процент?');
      appData.moneyDeposit = checkQuestionNumbers('Какая сумма заложена?');
    }
  },
  calcPeriod: function() {
    return appData.budgetMonth * periodSelect.value;
  }
};

start.disabled = true;
salaryAmount.addEventListener('input', appData.blockStartBtn);

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener("change", function() {
  periodAmount.innerHTML = this.value;
  incomePeriodValue.value =  appData.calcPeriod();
});

appData.getTargetMonth();

// if (appData.getTargetMonth() > 0) {
//   console.log( "За какой период будет достигнута цель (в месяцах): " + appData.getTargetMonth() );
// } else  {
//   console.log('Цель не будет достигнута');
// }


// console.log('Уровень дохода: ' + appData.getStatusIncome());



// console.log("Наша программа включает в себя данные:");
// for (let key in appData) {
//   console.log(key, appData[key]);
// }





