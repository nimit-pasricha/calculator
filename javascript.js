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

let firstNumber;
let secondNumber;
let operator = null;

function operate(num1, num2, operation) {
  switch (operation) {
    case "+":
      add(num1, num2);
      break;
    case "-":
      subtract(num1, num2);
      break;
    case "*":
      multiply(num1, num2);
      break;
    case "/":
      divide(num1, num2);
      break;
  }
}
// TODO: Make the read and the display happen in the same method
// otherwise shit just wont work
function displayResult() {
  let displayValue = null;
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
          if (operator !== null) {
            firstNumber = button.textContent;
          } else {
            displayValue = operate(firstNumber, button.textContent, operator);
            firstNumber = button.textContent;
          }
          break;
      }
      display.textContent = firstNumber;
    });
  });
}
displayResult();
