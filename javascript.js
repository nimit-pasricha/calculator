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

let firstOperand = 0;
let secondOperand = 0;
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
  const display = document.querySelector("#display");
  display.textContent = 0;

  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) =>
    button.addEventListener("click", () => {
      const buttonContent = button.textContent;
      console.log(buttonContent);
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
          if (isFirstOperand) {
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
            displayValue = firstOperand;
          }
          break;
        case "+/-":
          if (isFirstOperand) {
            firstOperand = -firstOperand;
            displayValue = firstOperand;
          } else {
            secondOperand = -secondOperand;
            displayValue = secondOperand;
          }
          break;
      }
      display.textContent = displayValue;
    })
  );
}
displayResult();
