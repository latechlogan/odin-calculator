// STATE MANAGEMENT
const STATE = {
  NUM1: "waiting for first number",
  OP: "waiting for operator",
  NUM2: "waiing for second number",
};

let currentState = STATE.NUM1;

// VARIABLES
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
    currentState = STATE.NUM1;
    inputArray.push(input);
    firstValue += input;
  } else {
    currentState = STATE.NUM2;
    inputArray.push(input);
    secondValue += input;
  }
}

function handleNonNumberInput(input) {
  if (haveOperator === false) {
    currentState = STATE.OP;
    operator = input;
    haveOperator = true;
  } else {
    // remove console.log()
    console.log(operate(+firstValue, +secondValue, operator));
    operate(+firstValue, +secondValue, operator);
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
