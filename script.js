const calculator = document.querySelector(".calculator");
const keys = document.querySelector(".calculators-btn");
const display = document.getElementById("text");
const lastValueCalulated = document.querySelector(".last-calc");

let result_memory = [];
let operation_memory = [];

function displayNumber(displayedNumber, keyContent) {
  let previousKeyType = calculator.dataset.previousKeyType;

  if (displayedNumber === "0" || previousKeyType === "operator") {
    display.textContent = keyContent;
    addDataSet("");
  } else display.textContent = displayedNumber + keyContent;
}

function addDataSet(data) {
  calculator.dataset.previousKeyType = data;
}

function performOperation(operation, result, firstValue, secondValue) {
  if (operation === "plus")
    result = parseFloat(firstValue) + parseFloat(secondValue);
  else if (operation === "minus")
    result = parseFloat(firstValue) - parseFloat(secondValue);
  else if (operation === "times")
    result = parseFloat(firstValue) * parseFloat(secondValue);
  else if (operation === "divide")
    result = parseFloat(firstValue) / parseFloat(secondValue);
  else if (operation === "percentage")
    result = (parseFloat(firstValue) / parseFloat(secondValue)) * 100;

  return result;
}

function calculate(firstValue, operation, secondValue) {
  let result = "";
  result = performOperation(operation, result, firstValue, secondValue);
  return result;
}

function clearContent() {
  let previousNumber = display.textContent;
  display.textContent = previousNumber.slice(0, -1);
  if (previousNumber.length === 1) display.textContent = "0";
}

function clearAll() {
  display.textContent = "0";
}

function addDecimalPoint(displayedNumber) {
  if (!displayedNumber.includes("."))
    display.textContent = displayedNumber + ".";
}

function clearCache() {
  result_memory = [];
}

function addToMemory(firstValue, operation, secondNumber) {
  let output = calculate(firstValue, operation, secondNumber);
  result_memory.push(output);
}

function selectOperation(action, displayedNumber, keyContent) {
  switch (action) {
    case "plus":
    case "minus":
    case "times":
    case "divide":
    case "percentage":
      calculator.dataset.firstValue = displayedNumber;
      calculator.dataset.operator = action;
      addDataSet("operator");
      break;
    case "decimal":
      addDecimalPoint(displayedNumber);
      break;
    case "clear":
      clearContent();
      break;
    case "clear-all":
      clearAll();
      break;
    case "calculate":
      const firstValue = calculator.dataset.firstValue;
      const operation = calculator.dataset.operator;
      const secondNumber = displayedNumber;

      display.textContent = calculate(firstValue, operation, secondNumber);
      addToMemory(firstValue, operation, secondNumber);
      break;
    case "memory-clear":
      clearCache();
      break;
    case "memory-subtraction":
      result_memory.pop();
      break;
    case "memory-recall":
        let lastIndex = result_memory.length - 1;
        lastValueCalulated.textContent = result_memory[lastIndex];
      break;
    default:
      displayNumber(displayedNumber, keyContent);
      break;
  }
}

keys.addEventListener("click", (e) => {
  const key = e.target;
  const action = key.dataset.action;
  const keyContent = key.textContent;
  const displayedNumber = display.textContent;

  if (e.target.matches("button")) {
    selectOperation(action, displayedNumber, keyContent);
  }
});
