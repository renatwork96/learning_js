'use strict';

const start = document.getElementById('start');
const cancel = document.getElementById('cancel');

const incomePlus = document.getElementsByTagName('button')[0];
const expensesPlus = document.getElementsByTagName('button')[1];

const depositCheck = document.getElementById('deposit-check');

const additionalIncomeItem = document.querySelectorAll('.additional_income-item');

const value = document.querySelectorAll('[class*="-value"]');
// console.log(value);
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const additionalIncmeValue = document.getElementsByClassName('additional_income-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
const expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
let incomeItems = document.querySelectorAll('.income-items');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');
const inocomeItem = document.querySelectorAll('.income-item');
let depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');

const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const checkQuestionNumbers = (question) => {
  let returnNumber = 0;
  do {
    returnNumber = prompt(question);
  } while (!isNumber(returnNumber) || returnNumber === '' || returnNumber === null);
  return +returnNumber;
};

const checkQuestionText = (question) => {
  let returnText = 0;
  do {
    returnText = prompt(question);
  } while (isNumber(returnText) || returnText === '' || returnText === null);
  return returnText;
};

class AppData {
  constructor() {
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
  }

  start() {
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.expensesMonth = this.getExpensesMonth();
    this.incomeMonth = this.getIncomeMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getInfoDeposit();
    this.getBudget();

    this.showResult();
    start.style.display = 'none';
    cancel.style.display = 'block';
    let inputText = document.querySelectorAll('input[type=text]');
    inputText.forEach((item) =>{
      item.disabled = true;
    });
    incomePlus.disabled = true;
    expensesPlus.disabled = true;
  }

  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncmeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value =  this.calcPeriod();
  }

  addExpensesBlock() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3){
      expensesPlus.style.display = 'none';
    }
  }

  addIncomeBlock() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3){
      incomePlus.style.display = 'none';
    }
  }

  getExpenses() {
    expensesItems.forEach(item =>{
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== ''){
        this.expenses[itemExpenses] = +cashExpenses;
      }
    });
  }

  getIncome() {
    incomeItems.forEach(item =>{
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      
      if(itemIncome !== '' && cashIncome !== ''){
        this.income[itemIncome] = +cashIncome;
      }
    });
  }

  getAddExpenses() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(item =>{
      item = item.trim();
      if (item !== ''){
        this.addExpenses.push(item);
      }
    });
  }

  getAddIncome() {
    additionalIncomeItem.forEach(item =>{
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
  }

  getExpensesMonth() {
    let sum = 0;
    for (let key in this.expenses) {
      sum += +this.expenses[key];
    }
    return sum;
  }

  getIncomeMonth() {
    let sum = 0;
    for (let key in this.income) {
      sum += +this.income[key];
    }
    return sum;
  }

  blockStartBtn() {
    if((salaryAmount.value === '') || !isNumber(salaryAmount.value) || (salaryAmount.value === null)){
      start.disabled = true;
      
    } else {
      start.disabled = false;
      this.checkPercentValue;
    }
  }

  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.precentDeposit / 100);
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }

  getTargetMonth() {
    return Math.ceil( targetAmount.value / this.budgetMonth );
  }

  getStatusIncome() {
    if (this.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (1200 > this.budgetDay && this.budgetDay >= 600) {
      return ('У вас средний уровень дохода');
    } else if (600 > this.budgetDay && this.budgetDay >= 0) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (this.budgetDay < 0) {
      return ('Что то пошло не так');
    }
  }

  getInfoDeposit() {
    if(this.deposit) {
      this.precentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }

  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }

  reset() {
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

    inputText.forEach((item) => {
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

    depositPercent.style.display = 'none';
    depositBank.style.display = 'none';
    depositAmount.style.display = 'none';
    depositCheck.disabled = false;
    depositCheck.checked = false;
    depositBank.value = '';
  }

  // checkPercent() {
  //   if (isNumber(depositPercent.value) || depositPercent.value < 0 || depositPercent.value > 100) {
  //     start.disabled = true;
  //     alert('Введите корректное значение в поле проценты');
  //   } else {
  //     console.log(this);
  //     this.blockStartBtn();
  //   }
  // }

  checkPercentValue() {
    if (depositCheck.checked) {
      if (!isNumber(depositPercent.value) || depositPercent.value < 0 || depositPercent.value > 100) {
        alert("Введите корректное значение в поле проценты");
        start.disabled = true;
      }
    }
    
  }

  changePercent() {
    const valueSelect = this.value;
    if (valueSelect === 'other') {
      depositPercent.style.display = 'inline-block';
      depositPercent.value = '';
    } else {
      depositPercent.value = valueSelect;
      depositPercent.style.display = 'none';
    }
  }

  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
  }

  eventsListeners() {
    start.disabled = true;
    salaryAmount.addEventListener('input', this.blockStartBtn.bind(this));
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

    depositCheck.addEventListener('change', this.depositHandler.bind(this));
    depositPercent.addEventListener('input', this.checkPercentValue);
  }
}

const appData = new AppData();

appData.eventsListeners();





