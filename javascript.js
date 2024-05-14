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
let secondNumber = null;
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
          } else {
            secondNumber = button.textContent;
            displayValue = operate(firstNumber, secondNumber, operator);
            console.log(displayValue);
            firstNumber = secondNumber;
            operator = null;
          }
          break;
        case "+":
        case "-":
        case "*":
        case "/":
          operator = button.textContent;
          console.log(operator);
          if (secondNumber !== null) {
            firstNumber = displayValue;
          }
      }
      display.textContent = firstNumber;
    });
  });
}
displayResult();
