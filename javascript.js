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
const display = document.querySelector(".display");

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
          if (operator === null) {
            // if operator is null, we are still taking the first operand
            // (the a part of a + b)
            firstNumber = (firstNumber * 10 + +button.textContent).toString();
            display.textContent = firstNumber;
          } else if (operator === "=") {
            firstNumber = button.textContent;
            display.textContent = firstNumber;
            operator = null;
          } else {
            // if operator is not null, we are taking the second operand
            // (the b part of a + b)
            secondNumber = (secondNumber * 10 + +button.textContent).toString();
            display.textContent = secondNumber;
          }
          break;

        case "+":
        case "-":
        case "*":
        case "/":
          if (secondNumber === 0) {
            // if we don't have a second number yet, we simply
            // setup this operator in preparation of that second
            // number
            operator = button.textContent;
            display.textContent = firstNumber;
          } else {
            // if we have a second operator, we first have to evalutate
            // the current expression AND THEN setup this new operator
            // in preparation for the next number
            displayValue = operate(firstNumber, secondNumber, operator);
            display.textContent = displayValue;
            operator = button.textContent;
            // this is done because the displayValue is what our
            // NEXT operation is going to act on
            firstNumber = displayValue;
            // we've resolved the current expression and reset
            // secondNumber to accept a new number from the user
            secondNumber = 0;
          }
          break;

        case "=":
          displayValue = operate(firstNumber, secondNumber, operator);
          display.textContent = displayValue;
          firstNumber = displayValue;
          operator = "=";
          secondNumber = null;
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
}
