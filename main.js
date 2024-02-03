let screenDisplay = document.querySelector('#display');
let buttons = document.querySelectorAll('button');
let them = document.querySelector('.them');
let background = document.querySelector('.calculator');
let result = "";
let buttonArray = Array.from(buttons);

function calculateExpression(expression) {
  const operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    '%': (a, b) => a % b,
  };

  const nums = expression.split(/[\+\-\*\/\%]/).map(Number);
  const operatorsArr = expression.split('').filter(char => ['+', '-', '*', '/', '%'].includes(char));

  let res = nums[0];
  for (let i = 0; i < operatorsArr.length; i++) {
    res = operators[operatorsArr[i]](res, nums[i + 1]);
  }

  return res;
}

let isResultDisplayed = false;

buttonArray.forEach(button => {
  button.addEventListener('click', (e) => {
    const targetValue = e.target.innerHTML;

    if (targetValue === '=') {
      screenDisplay.value = calculateExpression(result);
      isResultDisplayed = true;
    } else if (targetValue === 'AC') {
      result = "";
      screenDisplay.value = result;
    } else if (targetValue === 'DEL') {
      result = result.substring(0, result.length - 1);
      screenDisplay.value = result;
    } else {
      if (isResultDisplayed) {
        result = screenDisplay.value;
        isResultDisplayed = false;
      }
      result += targetValue;
      screenDisplay.value = result;
    }
  });
})

them.addEventListener('click', () => {
  background.classList.toggle('them-color');
})
