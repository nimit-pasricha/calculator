function add(num1, num2) {
  return +num1 + +num2;
}

function subtract(num1, num2) {
  return +num1 - +num2;
}

function multiply(num1, num2) {
  return +num1 * +num2;
}

// TODO: Shrink the decimal numbers to fit the output window
// eg: There should not be any 3.666666666666666666667. Shorted it
// to fit the exact width of the window
function divide(num1, num2) {
  if (num2 == 0) {
    return "Clown Behavior";
  } else {
    return +num1 / +num2;
  }
}

let firstNumber = 0;
let secondNumber = 0;
let operator = null;
let displayValue = null;
const buttons = document.querySelectorAll("button");
const display = document.querySelector("#display");
display.style.fontSize = "64px";
let isDecimalPoint = false;

function operate(num1, num2, operation) {
  switch (operation) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      return num1;
  }
}

// TODO: Add floating point functionality
function displayResult() {
  display.textContent = 0;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (displayValue === "Clown Behavior") {
        firstNumber = 0;
        resetCalculator();
      }

      switch (button.textContent) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          // check if we are dealing with the first number
          // or the second number
          if (operator === null) {
            if (firstNumber.toString() === "0") {
              firstNumber = button.textContent;
              display.textContent = firstNumber;
            } else {
              firstNumber = firstNumber + button.textContent;
              display.textContent = firstNumber;
            }
          } else if (operator === "=") {
            if (isDecimalPoint) {
              firstNumber = firstNumber + button.textContent;
            } else {
              firstNumber = button.textContent;
            }
            display.textContent = firstNumber;
            operator = null;
          } else {
            if (secondNumber.toString() === "0") {
              secondNumber = button.textContent;
              display.textContent = secondNumber;
            } else {
              secondNumber = secondNumber + button.textContent;
              display.textContent = secondNumber;
            }
          }
          break;

        case ".":
          if (operator === "=") {
            firstNumber = 0 + ".";
            display.textContent = firstNumber;
          } else if (operator === null) {
            if (!firstNumber.toString().includes(".")) {
              firstNumber = firstNumber + ".";
            }
            display.textContent = firstNumber;
          } else {
            if (!secondNumber.toString().includes(".")) {
              secondNumber = secondNumber + ".";
            }
            display.textContent = secondNumber;
          }
          isDecimalPoint = true;
          break;
        case "+/-":
          if (operator === null || operator === "=") {
            if (firstNumber.toString()[0] === "-") {
              firstNumber = firstNumber.toString().slice(1);
            } else {
              firstNumber = "-" + firstNumber;
            }
            display.textContent = firstNumber;
          } else {
            if (secondNumber.toString()[0] === "-") {
              secondNumber = secondNumber.toString().slice(1);
            } else {
              secondNumber = "-" + secondNumber;
            }
            display.textContent = secondNumber;
          }
          break;

        case "+":
        case "-":
        case "*":
        case "/":
          if (secondNumber === 0) {
            operator = button.textContent;
            display.textContent = firstNumber;
          } else {
            displayValue = operate(firstNumber, secondNumber, operator);
            display.textContent = displayValue;
            operator = button.textContent;
            // this is done because the displayValue is what we are going
            // to operate on next
            firstNumber = displayValue;
            secondNumber = 0;
          }
          isDecimalPoint = false;
          break;

        case "=":
          displayValue = operate(firstNumber, secondNumber, operator);
          display.textContent = displayValue;
          firstNumber = displayValue;
          operator = "=";
          secondNumber = null;
          isDecimalPoint = false;
          break;

        case "Clear":
          resetCalculator();
      }
    });
  });
}
displayResult();

function resetCalculator() {
  firstNumber = 0;
  secondNumber = 0;
  operator = null;
  displayValue = null;
  display.textContent = firstNumber;
  isDecimalPoint = false;
}
