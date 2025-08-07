const calculatorDisplay = document.querySelector(".calculator__display");
const calculatorButtons = document.querySelector(".calculator__controls");

let inputArray = [];
let firstValue = "";
let secondValue = "";
let operator = "";
let haveOperator = false;

// MAIN FUNCTIONS

calculatorButtons.addEventListener("click", (e) => {
  calculatorDisplay.textContent += e.target.value;

  handleNumberInput(e.target.value);
  handleNonNumberInput(e.target.value);
});

function handleNumberInput(input) {
  if (!isNaN(input)) {
    if (haveOperator === false) {
      inputArray.push(input);
      firstValue += input;
    } else {
      inputArray.push(input);
      secondValue += input;
    }
  }
}

function handleNonNumberInput(input) {
  if (isNaN(input)) {
    if (haveOperator === false) {
      operator = input;
      haveOperator = true;
    } else {
      console.log(operate(+firstValue, +secondValue, operator));
    }
  }
}

function operate(a, b, operator) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
}

// HELPERS

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

getIndexOfOperator = (array) => {
  array.some((element, index) => {
    if (isNaN(element)) {
      return index;
    }
  });
};
