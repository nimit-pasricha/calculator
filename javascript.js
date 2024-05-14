function add(num1, num2) {
  return +num1 + +num2;
}

function subtract(num1, num2) {
  return +num1 - +num2;
}

function multiply(num1, num2) {
  return +num1 * +num2;
}

function divide(num1, num2) {
  return +num1 / +num2;
}

let firstNumber = 0;
let secondNumber = 0;
let operator = null;
let displayValue = null;

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
  }
}
// TODO: Make the read and the display happen in the same method
// otherwise shit just wont work
function displayResult() {
  const display = document.querySelector(".display");
  const buttons = document.querySelectorAll("button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
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
          if (operator === null) {
            firstNumber = (firstNumber * 10 + +button.textContent).toString();
            display.textContent = firstNumber;
          } else {
            secondNumber = (secondNumber * 10 + +button.textContent).toString();
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
            firstNumber = displayValue;
            secondNumber = 0;
          }
          break;

        case "=":
          displayValue = operate(firstNumber, secondNumber, operator);
          display.textContent = displayValue;
          break;

        case "Clear":
          firstNumber = 0;
          secondNumber = 0;
          operator = null;
          displayValue = null;
          display.textContent = firstNumber;
      }
    });
  });
}
displayResult();
