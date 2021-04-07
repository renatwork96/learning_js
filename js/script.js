let money = 40000; 
let income = 5000; 
let addExpenses = 'Интернет, Транспорт, Комуналка'; 
let deposit = true;
let mission = 100000; 
let period = 6;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев.');
console.log('Цель заработать ' + mission + ' рублей.');
addExpenses = addExpenses.toLowerCase();
console.log(addExpenses.split(', '));
let budgetDay = money / 30;
console.log(budgetDay);
