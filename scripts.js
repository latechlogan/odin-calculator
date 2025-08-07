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
  if (haveOperator === false) {
    /*
    if current state is STATE.RES
      inputArray = [];
      firstValue = "";
      secondValue = "";
      operator = "";
      haveOperator = false;
    */
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
    /*
    if current state is STATE.RES
      inputArray = [];
      firstValue = "";
      secondValue = "";
      operator = "";
      haveOperator = false;
    */
    // inputArray and firstValue need the operation result without "magic"
    // numbers, but I think operating again might be a mistake
    currentState = STATE.OP;
    operator = input;
    haveOperator = true;
  } else {
    currentState = STATE.RES;
    operate(+firstValue, +secondValue, operator);
  }
}

function operate(a, b, operator) {
  switch (operator) {
    case "+":
      let addResult = add(a, b);
      updateDisplay(addResult);
      return;
    case "-":
      let subtractResult = subtract(a, b);
      updateDisplay(subtractResult);
      return;
    case "*":
      let multiplyResult = multiply(a, b);
      updateDisplay(multiplyResult);
      return;
    case "/":
      let divideResult = divide(a, b);
      updateDisplay(divideResult);
      return;
  }
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
