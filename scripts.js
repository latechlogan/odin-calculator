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
  if (e.target.value === "clear") {
    clearAll();
    return;
  }

  if (!isNaN(e.target.value)) {
    handleNumberInput(e.target.value);
  } else {
    handleNonNumberInput(e.target.value);
  }
});

function handleNumberInput(input) {
  if (currentState === STATE.NUM2 && operator === "=") {
    clearAll();
  }

  if (haveOperator === false) {
    currentState = STATE.NUM1;
    firstValue += input;

    updateDisplay(firstValue);
  } else {
    if (operator === "/" && input === "0") {
      updateDisplay("To infinity and beyond!");
      return;
    }
    currentState = STATE.NUM2;
    secondValue += input;

    updateDisplay(secondValue);
  }
}

function handleNonNumberInput(input) {
  if (haveOperator === false) {
    if (input === "=") {
      return;
    } else {
      currentState = STATE.OP;
      operator = input;
      haveOperator = true;
    }
  } else {
    currentState = STATE.RES;
    operate(+firstValue, +secondValue, operator);

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
      addResult = handleDecimalResults(addResult);
      storeOperationResults(addResult);
      updateDisplay(addResult);
      return;
    case "-":
      let subtractResult = subtract(a, b);
      subtractResult = handleDecimalResults(subtractResult);
      storeOperationResults(subtractResult);
      updateDisplay(subtractResult);
      return;
    case "*":
      let multiplyResult = multiply(a, b);
      multiplyResult = handleDecimalResults(multiplyResult);
      storeOperationResults(multiplyResult);
      updateDisplay(multiplyResult);
      return;
    case "/":
      let divideResult = divide(a, b);
      divideResult = handleDecimalResults(divideResult);
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

  if (input !== "=") {
    CALC_DISPLAY.textContent = input;
  }
}

function clearAll() {
  firstValue = "";
  secondValue = "";
  operator = "";
  haveOperator = false;

  currentState = STATE.NUM1;

  CALC_DISPLAY.innerHTML = "";
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

handleDecimalResults = (num) => {
  const numStr = String(num);
  if (numStr.includes(".")) {
    return num.toFixed(1); // magic number for decimal places
  } else {
    return numStr; // Return as string if no decimal to avoid adding ".00"
  }
};
