function add(num1, num2) {
  if (num1 === "-" || num2 === "-") {
    return "🤡";
  }
  return num1 + num2;
}

function subtract(num1, num2) {
  if (num1 === "-" || num2 === "-") {
    return "🤡";
  }
  return num1 - num2;
}

function multiply(num1, num2) {
  if (num1 === "-" || num2 === "-") {
    return "🤡";
  }
  return num1 * num2;
}

function divide(num1, num2) {
  if (+num2 === 0) {
    return "🤡";
  } else {
    return num1 / num2;
  }
}

let firstOperand = null;
let secondOperand = null;
let operator = null;
let displayValue = 0;
let isFirstOperand = true;
let isFirstOperandFloating = false;
let isSecondOperandFloating = false;

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

function displayResultMouse() {
  const display = document.querySelector("#display");
  display.textContent = displayValue;
  const operators = document.querySelectorAll(".operator");

  const buttons = document.querySelectorAll("button");

  buttons.forEach((button) =>
    button.addEventListener("mousedown", () => {
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
            if (isFirstOperandFloating) {
              console.log("Hello");
              firstOperand = +(displayValue.toString() + buttonContent);
            } else {
              if (firstOperand >= 0) {
                firstOperand = firstOperand * 10 + +buttonContent;
              } else {
                firstOperand = firstOperand * 10 - +buttonContent;
              }
            }
            displayValue = firstOperand;
          } else {
            if (isSecondOperandFloating) {
              secondOperand = +(displayValue.toString() + buttonContent);
            } else {
              if (secondOperand >= 0) {
                secondOperand = secondOperand * 10 + +buttonContent;
              } else {
                secondOperand = secondOperand * 10 - +buttonContent;
              }
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
          removeAllBorders(operators);
          firstOperand = null;
          secondOperand = null;
          operator = null;
          isFirstOperand = true;
          displayValue = 0;
          break;

        case "Enter":
        case "=":
          removeAllBorders(operators);
          if (secondOperand === null) {
            // do nothing
          } else {
            displayValue = operate(firstOperand, secondOperand, operator);
            firstOperand = displayValue;
            isFirstOperandFloating = false;
            isSecondOperandFloating = false;
            secondOperand = null;
            operator = null;
            isFirstOperand = null;
          }
          break;

        case "/":
        case "*":
        case "-":
        case "+":
          removeAllBorders(operators);
          button.classList.add("clicked-operator");
          if (
            secondOperand === null ||
            isFirstOperand === null ||
            isFirstOperand
          ) {
            isFirstOperand = false;
          } else {
            firstOperand = operate(firstOperand, secondOperand, operator);
            isFirstOperand = false;
            displayValue = firstOperand;
            secondOperand = null;
            isFirstOperandFloating = false;
            isSecondOperandFloating = false;
          }
          operator = buttonContent;
          break;

        case ".":
          if (isFirstOperand === null) {
            firstOperand = 0;
            firstOperand = firstOperand + ".";
            isFirstOperandFloating = true;
            displayValue = firstOperand;
            isFirstOperand = true;
          } else if (isFirstOperand) {
            if (isFirstOperandFloating) {
              // do nothing
            } else {
              firstOperand = +firstOperand + ".";
              isFirstOperandFloating = true;
            }
            displayValue = firstOperand;
          } else {
            if (isSecondOperandFloating) {
              // do nothing
            } else {
              secondOperand = +secondOperand + ".";
              isSecondOperandFloating = true;
            }
            displayValue = secondOperand;
          }
          break;
        case "<--":
          if (isFirstOperand === null) {
            displayValue = 0;
          } else if (isFirstOperand || secondOperand === null) {
            if (firstOperand.toString().length > 1) {
              firstOperand = firstOperand.toString().slice(0, -1);
            } else {
              firstOperand = 0;
            }
            isFirstOperandFloating = firstOperand.toString().includes(".");
            displayValue = firstOperand;
          } else {
            if (secondOperand.toString().length > 1) {
              secondOperand = secondOperand.toString().slice(0, -1);
            } else {
              secondOperand = 0;
            }
            isSecondOperandFloating = secondOperand.toString().includes(".");
            displayValue = secondOperand;
          }
          break;
      }
      if (displayValue === null) {
        display.textContent = 0;
      } else {
        display.textContent = displayValue;
      }
    })
  );
}
displayResultMouse();

function displayResultKeyboard() {
  const display = document.querySelector("#display");
  display.textContent = displayValue;
  const body = document.querySelector("body");
  const operators = document.querySelectorAll(".operator");
  const buttons = document.querySelectorAll("button");

  body.addEventListener("keydown", (event) => {
    const keyPressed = event.key;
    console.log(keyPressed);
    switch (keyPressed) {
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
          firstOperand = firstOperand * 10 + +keyPressed;
          displayValue = firstOperand;
          isFirstOperand = true;
        } else if (isFirstOperand) {
          if (isFirstOperandFloating) {
            firstOperand = +(displayValue.toString() + keyPressed);
          } else {
            if (firstOperand >= 0) {
              firstOperand = firstOperand * 10 + +keyPressed;
            } else {
              firstOperand = firstOperand * 10 - +keyPressed;
            }
          }
          displayValue = firstOperand;
        } else {
          if (isSecondOperandFloating) {
            secondOperand = +(displayValue.toString() + keyPressed);
          } else {
            if (secondOperand >= 0) {
              secondOperand = secondOperand * 10 + +keyPressed;
            } else {
              secondOperand = secondOperand * 10 - +keyPressed;
            }
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
        removeAllBorders(operators);
        firstOperand = null;
        secondOperand = null;
        operator = null;
        isFirstOperand = true;
        displayValue = 0;
        break;

      case "Enter":
      case "=":
        removeAllBorders(operators);
        if (secondOperand === null) {
          // do nothing
        } else {
          displayValue = operate(firstOperand, secondOperand, operator);
          firstOperand = displayValue;
          isFirstOperandFloating = false;
          isSecondOperandFloating = false;
          secondOperand = null;
          operator = null;
          isFirstOperand = null;
        }
        break;

      case "/":
      case "*":
      case "-":
      case "+":
        removeAllBorders(operators);
        const button = Array.from(buttons).reduce(
          (acc, curr) => (acc = curr.textContent === keyPressed ? curr : acc)
        );
        button.classList.add("clicked-operator");
        if (secondOperand === null) {
          isFirstOperand = false;
        } else if (isFirstOperand === null || isFirstOperand) {
          isFirstOperand = false;
        } else {
          firstOperand = operate(firstOperand, secondOperand, operator);
          isFirstOperand = false;
          displayValue = firstOperand;
          secondOperand = null;
          isFirstOperandFloating = false;
          isSecondOperandFloating = false;
        }
        operator = keyPressed;
        break;

      case ".":
        if (isFirstOperand === null) {
          firstOperand = 0;
          firstOperand = firstOperand + ".";
          isFirstOperandFloating = true;
          displayValue = firstOperand;
          isFirstOperand = true;
        } else if (isFirstOperand) {
          if (isFirstOperandFloating) {
            // do nothing
          } else {
            firstOperand = +firstOperand + ".";
            isFirstOperandFloating = true;
          }
          displayValue = firstOperand;
        } else {
          if (isSecondOperandFloating) {
            // do nothing
          } else {
            secondOperand = +secondOperand + ".";
            isSecondOperandFloating = true;
          }
          displayValue = secondOperand;
        }
        break;
      case "Backspace":
        if (isFirstOperand === null) {
          displayValue = 0;
        } else if (isFirstOperand || secondOperand === null) {
          if (firstOperand.toString().length > 1) {
            firstOperand = firstOperand.toString().slice(0, -1);
          } else {
            firstOperand = 0;
          }
          isFirstOperandFloating = firstOperand.toString().includes(".");
          displayValue = firstOperand;
        } else {
          if (secondOperand.toString().length > 1) {
            secondOperand = secondOperand.toString().slice(0, -1);
          } else {
            secondOperand = 0;
          }
          isSecondOperandFloating = secondOperand.toString().includes(".");
          displayValue = secondOperand;
        }
        break;
    }
    if (displayValue === null) {
      display.textContent = 0;
    } else {
      display.textContent = displayValue;
    }
  });
}

displayResultKeyboard();

function removeAllBorders(operators) {
  operators.forEach((element) => element.classList.remove("clicked-operator"));
}
