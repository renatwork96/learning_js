'use strict';

let money = 40000; 
let income = 5000; 
let addExpenses = 'Интернет, Транспорт, Комуналка, Кафе'; 
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


money = Number( prompt('Ваш месячный доход?') );

while (!money) {
  alert('Вы ввели неправильное значение, повторите попытку');
  money = Number( prompt('Ваш месячный доход?') );
}

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?');

let amount1 = Number( prompt('Во сколько это обойдется?') );

while (!amount1) {
  alert('Вы ввели неправильное значение, повторите попытку');
  amount1 = Number( prompt('Во сколько это обойдется?') );
}
let expenses2 = prompt('Введите обязательную статью расходов?');

let amount2 =  Number( prompt('Во сколько это обойдется?') );

while (!amount2) {
  alert('Вы ввели неправильное значение, повторите попытку');
  amount2 = Number( prompt('Во сколько это обойдется?') );
}

let budgetMonth  = money - amount1 - amount2;
console.log(budgetMonth);

let missionMonth;

if (budgetMonth > 0) {
  missionMonth = Math.ceil( mission / budgetMonth );
  console.log('Цель будет достигнута за ' + missionMonth + ' месяцев(-а)');
} else {
  console.log('Цель не будет достигнута');
}

budgetDay = Math.floor( budgetMonth / 30 );
console.log('Бюджет на день: ' + budgetDay);

if (budgetDay >= 1200) {
  alert('У вас высокий уровень дохода');
} else if (1200 > budgetDay && budgetDay >= 600) {
  alert('У вас средний уровень дохода');
} else if (600 > budgetDay && budgetDay >= 0) {
  alert('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay < 0) {
  alert('Что то пошло не так');
}