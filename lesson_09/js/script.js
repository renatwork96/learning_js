'use strict';

const calculate = document.getElementById('start');

const pluse1 = document.getElementsByTagName('button')[0];
const pluse2 = document.getElementsByTagName('button')[1];

const depositCheck = document.querySelector('#deposit-check');

const incomeItem = document.querySelectorAll('additional_income-item');

const value = document.querySelectorAll('[class*="-value"]');
console.log(value);

//Вопросы по отсеву
// const value = document.querySelectorAll('.result-total');
// console.log(value.querySelectorAll('budget_month-value'));

const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
const incomeAmount = document.querySelector('.income-amount');
const expensesTitle = document.querySelector('.expenses-title');
const expensesAmount = document.querySelector('.expenses-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');

// получить каждый элемент в отдельную переменную:


// Каждый элемент в правой части программы через класс(не через querySelector), которые имеют в имени класса "-value", начиная с class="budget_day-value" и заканчивая class="target_month-value">