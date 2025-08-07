// STATE MANAGEMENT

const STATE = {
  NUM1: "waiting for first number",
  OP: "waiting for operator",
  NUM2: "waiing for second number",
  RES: "showing result",
};

let currentState = STATE.NUM1;

// VARIABLES

const CALC_DISPLAY = document.querySelector(".calculator__display");
const CALC_BUTTONS = document.querySelector(".calculator__controls");

let firstValue = "";
let secondValue = "";
let operator = "";
let haveOperator = false;

// MAIN FUNCTIONS

CALC_BUTTONS.addEventListener("click", (e) => {
  if (!isNaN(e.target.value)) {
    handleNumberInput(e.target.value);
  } else {
    handleNonNumberInput(e.target.value);
  }

  updateDisplay(e.target.value);
});

function handleNumberInput(input) {
  if (currentState === STATE.RES) {
    firstValue = "";
    secondValue = "";
    operator = "";
    haveOperator = false;
  }

  if (haveOperator === false) {
    currentState = STATE.NUM1;
    firstValue += input;
  } else {
    currentState = STATE.NUM2;
    secondValue += input;
  }
}

function handleNonNumberInput(input) {
  if (haveOperator === false) {
    currentState = STATE.OP;
    operator = input;
    haveOperator = true;
  } else {
    currentState = STATE.RES;
    operate(+firstValue, +secondValue, operator);

    //handle transition to next state

    secondValue = "";
    operator = input;
    haveOperator = true;

    currentState = STATE.NUM2;
  }
}

function operate(a, b, operator) {
  switch (operator) {
    case "+":
      let addResult = add(a, b);
      storeOperationResults(addResult);
      updateDisplay(addResult);
      return;
    case "-":
      let subtractResult = subtract(a, b);
      storeOperationResults(subtractResult);
      updateDisplay(subtractResult);
      return;
    case "*":
      let multiplyResult = multiply(a, b);
      storeOperationResults(multiplyResult);
      updateDisplay(multiplyResult);
      return;
    case "/":
      let divideResult = divide(a, b);
      storeOperationResults(divideResult);
      updateDisplay(divideResult);
      return;
  }
}

function storeOperationResults(result) {
  firstValue = result;
}

function updateDisplay(input) {
  if (currentState === STATE.RES) {
    CALC_DISPLAY.innerHTML = "";
  }
  CALC_DISPLAY.textContent += input;
}

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
