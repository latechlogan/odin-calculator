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

let inputArray = [];
let firstValue = "";
let secondValue = "";
let operator = "";
let haveOperator = false;

// MAIN FUNCTIONS

CALC_BUTTONS.addEventListener("click", (e) => {
  updateDisplay(e.target.value);

  if (!isNaN(e.target.value)) {
    handleNumberInput(e.target.value);
  } else {
    handleNonNumberInput(e.target.value);
  }
});

function handleNumberInput(input) {
  // reset function?
  if (currentState === STATE.RES) {
    inputArray = [];
    firstValue = "";
    secondValue = "";
    operator = "";
    haveOperator = false;
  }

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
  // not sure this is correct, it should work with the code below, see note
  if (currentState === STATE.RES) {
    secondValue = "";
    operator = "";
    haveOperator = false;
  }

  if (haveOperator === false) {
    currentState = STATE.OP;
    operator = input;
    haveOperator = true;
  } else {
    currentState = STATE.RES;
    operate(+firstValue, +secondValue, operator);
    /**
     * going here on second operator click, but that click becomes the first
     * operator click -- the operation result is firstValue and the operator
     * clicked becomes the operator -- so, we need to store & display the
     * operator and now we are waiting for secondValue input
     */
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
  inputArray = [result];
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

getIndexOfOperator = (array) => {
  array.some((element, index) => {
    if (isNaN(element)) {
      return index;
    }
  });
};
