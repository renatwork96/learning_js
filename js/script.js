'use strict';

let start = document.getElementById('start');
let cancel = document.getElementById('cancel');

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

const AppData = function () {
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.precentDeposit = 0;
  this.moneyDeposit = 0;

};

AppData.prototype.start = function() {
    this.budget = +salaryAmount.value;
    // console.log('salaryAmount.value: ',salaryAmount.value);

    this.getExpenses();
    this.getIncome();
    this.expensesMonth = this.getExpensesMonth();
    this.incomeMonth = this.getIncomeMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();

    this.showResult();
    start.style.display = 'none';
    cancel.style.display = 'block';
    let inputText = document.querySelectorAll('input[type=text]');
    inputText.forEach(function(item){
    item.disabled = true;
    });
    incomePlus.disabled = true;
    expensesPlus.disabled = true;
  };

AppData.prototype.showResult = function() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncmeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value =  this.calcPeriod();
    
  };

AppData.prototype.addExpensesBlock = function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3){
      expensesPlus.style.display = 'none';
    }
  };

AppData.prototype.addIncomeBlock = function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3){
      incomePlus.style.display = 'none';
    }
  };

AppData.prototype.getExpenses = function() {
    expensesItems.forEach(item =>{
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== ''){
        this.expenses[itemExpenses] = +cashExpenses;
      }
    });
  };

AppData.prototype.getIncome = function() {
    incomeItems.forEach(item =>{
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      
      if(itemIncome !== '' && cashIncome !== ''){
        
        this.income[itemIncome] = +cashIncome;
      }
    });
  };

AppData.prototype.getAddExpenses = function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(item =>{
      item = item.trim();
      if (item !== ''){
        this.addExpenses.push(item);
      }
    });
  };

AppData.prototype.getAddIncome = function() {
    additionalIncomeItem.forEach(item =>{
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
  };

AppData.prototype.getExpensesMonth = function() {
    let sum = 0;
    for (let key in this.expenses) {
      sum += +this.expenses[key];
    }
    return sum;
  };

AppData.prototype.getIncomeMonth = function() {
  let sum = 0;
  for (let key in this.income) {
    sum += +this.income[key];
  }
  return sum;
};

AppData.prototype.blockStartBtn = function() {
    if((salaryAmount.value === '') || !isNumber(salaryAmount.value) || (salaryAmount.value === null)){
      start.disabled = true;
      
    } else {
      start.disabled = false;
    }
  };

AppData.prototype.getBudget = function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  };

AppData.prototype.getTargetMonth = function() {
    return Math.ceil( targetAmount.value / this.budgetMonth );
  };

AppData.prototype.getStatusIncome = function() {
    if (this.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (1200 > this.budgetDay && this.budgetDay >= 600) {
      return ('У вас средний уровень дохода');
    } else if (600 > this.budgetDay && this.budgetDay >= 0) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (this.budgetDay < 0) {
      return ('Что то пошло не так');
    }
  };

AppData.prototype.getInfoDeposit = function(){
    this.deposit = confirm('Есть ли у вас депозит в банке?');
    if(this.deposit) {
      this.precentDeposit = checkQuestionNumbers('Какой годовой процент?');
      this.moneyDeposit = checkQuestionNumbers('Какая сумма заложена?');
    }
  };

AppData.prototype.calcPeriod = function() {
    return this.budgetMonth * periodSelect.value;
  };

AppData.prototype.reset = function() {
    
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.precentDeposit = 0;
    this.moneyDeposit = 0;
    periodAmount.innerHTML = 1;
    incomePeriodValue.value =  1;
    
    let inputText = document.querySelectorAll('input[type=text]');

    for (let i = expensesItems.length - 1; i > 0; i--) {
      let removeBlock = expensesItems[i];
      removeBlock.parentNode.removeChild(removeBlock);
    }

    for (let i = incomeItems.length - 1; i > 0; i--) {
      let removeBlock = incomeItems[i];
      removeBlock.parentNode.removeChild(removeBlock);
    }

    inputText.forEach(function(item){
      item.value = '';
      item.disabled = false;
      incomePlus.disabled = false;
      expensesPlus.disabled = false;
    });
    start.disabled = true;
    start.style.display = 'block';
    cancel.style.display = 'none';
    expensesPlus.style.display = 'block';
    incomePlus.style.display = 'block';
    document.querySelector('.period-select').value = 1;
    expensesItems = document.querySelectorAll('.expenses-items');
    incomeItems = document.querySelectorAll('.income-items');
  };

AppData.prototype.eventsListeners = function() {
  start.disabled = true;
  salaryAmount.addEventListener('input', this.blockStartBtn);
  start.addEventListener('click', this.start.bind(this));

  expensesPlus.addEventListener('click', this.addExpensesBlock);
  incomePlus.addEventListener('click', this.addIncomeBlock);
  let _this = this;
  periodSelect.addEventListener('input', function() {
    periodAmount.innerHTML = this.value;
    incomePeriodValue.value =  _this.calcPeriod();
  });

  cancel.addEventListener('click', this.reset.bind(this));
  this.getTargetMonth();
};

const appData = new AppData();

appData.eventsListeners();





