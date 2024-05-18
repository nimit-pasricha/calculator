function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

let firstOperand = null;
let secondOperand = null;
let operator = null;

function operate(num1, num2, operator) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
  }
}

function displayResult() {
  let isFirstOperand = true;
  let displayValue = 0;
  let isFirstOperandFloating = false;
  let isSecondOperandFloating = false;

  const display = document.querySelector("#display");
  display.textContent = displayValue;

  const buttons = document.querySelectorAll("button");

  buttons.forEach((button) =>
    button.addEventListener("click", () => {
      const buttonContent = button.textContent;
      switch (buttonContent) {
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
          if (isFirstOperand === null) {
            firstOperand = 0;
            firstOperand = firstOperand * 10 + +buttonContent;
            displayValue = firstOperand;
            isFirstOperand = true;
          } else if (isFirstOperand) {
            if (firstOperand >= 0) {
              firstOperand = firstOperand * 10 + +buttonContent;
            } else {
              firstOperand = firstOperand * 10 - +buttonContent;
            }
            displayValue = firstOperand;
          } else {
            if (secondOperand >= 0) {
              secondOperand = secondOperand * 10 + +buttonContent;
            } else {
              secondOperand = secondOperand * 10 - +buttonContent;
            }
            displayValue = secondOperand;
          }
          break;

        case "+/-":
          if (isFirstOperand === null || isFirstOperand) {
            firstOperand = -firstOperand;
            displayValue = firstOperand;
          } else {
            secondOperand = -secondOperand;
            displayValue = secondOperand;
          }
          break;

        case "Clear":
          firstOperand = null;
          secondOperand = null;
          operator = null;
          isFirstOperand = true;
          displayValue = 0;
          break;

        case "=":
          if (secondOperand === null) {
            // do nothing
          } else {
            displayValue = operate(firstOperand, secondOperand, operator);
            firstOperand = displayValue;
            secondOperand = null;
            operator = null;
            isFirstOperand = null;
          }
          break;

        case "/":
        case "*":
        case "-":
        case "+":
          if (isFirstOperand === null || isFirstOperand) {
            isFirstOperand = false;
          } else {
            firstOperand = operate(firstOperand, secondOperand, operator);
            isFirstOperand = false;
            displayValue = firstOperand;
            secondOperand = null;
          }
          operator = buttonContent;
          break;

        case ".":
          if (isFirstOperand === null) {
            firstOperand = 0;
            displayValue = firstOperand + ".";
            isFirstOperandFloating = true;
          } else if (isFirstOperand) {
            if (isFirstOperandFloating) {
              // do nothing
            } else {
              displayValue = firstOperand + ".";
              isFirstOperandFloating = true;
            }
          } else {
            if (isSecondOperandFloating) {
              // do nothing
            } else {
              displayValue = secondOperand + ".";
              isSecondOperandFloating = true;
            }
          }
      }
      display.textContent = displayValue;
    })
  );
}
displayResult();
