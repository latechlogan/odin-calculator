// STATE
const STATE = {
  NUM1: "waiting for first number",
  OP: "waiting for operator",
  NUM2: "waiing for second number",
};

const CALC_DISPLAY = document.querySelector(".calculator__display");
const CALC_BUTTONS = document.querySelector(".calculator__controls");

let inputArray = [];
let firstValue = "";
let secondValue = "";
let operator = "";
let haveOperator = false;

// MAIN FUNCTIONS

CALC_BUTTONS.addEventListener("click", (e) => {
  CALC_DISPLAY.textContent += e.target.value;

  if (!isNaN(e.target.value)) {
    handleNumberInput(e.target.value);
  } else {
    handleNonNumberInput(e.target.value);
  }
});

function handleNumberInput(input) {
  if (haveOperator === false) {
    inputArray.push(input);
    firstValue += input;
  } else {
    inputArray.push(input);
    secondValue += input;
  }
}

function handleNonNumberInput(input) {
  if (haveOperator === false) {
    operator = input;
    haveOperator = true;
  } else {
    console.log(operate(+firstValue, +secondValue, operator));
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

function updateDisplay() {}

// HELPERS

add = (a, b) => {
  return a + b;
};

subtract = (a, b) => {
  return a - b;
};

multiply = (a, b) => {
  return a * b;
};

divide = (a, b) => {
  return a / b;
};

getIndexOfOperator = (array) => {
  array.some((element, index) => {
    if (isNaN(element)) {
      return index;
    }
  });
};
