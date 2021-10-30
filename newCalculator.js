// class declaration
class Calculator {
  constructor(currentOperand, nextOperand, operation) {
    this.currentOperand = currentOperand;
    this.nextOperand = nextOperand;
    this.operation = operation;
    this.allClear();
  }

  // old way
  // will only check the user input combinations AFTER submit event.
  // checks if the inputs has null, empty, alphabet characters, and the proper INFIX notation of equations.
  sanitiseInput(combinations) {
    const basicCalculatorRegex =
      /^([-√]?)([(]*?)([-√]?)(\d+([%])?|\d+(?:[.])(?:\d+)([%])?)([)]*?)(?:([-+*\/])([-+√]?)([(]*?)((?:[-+√])?\d+([%])?|\d+(?:[.])(?:\d+)([%])?)([)]*?))+$|([-+√]?)(\d+([%√])?)/g;
    const textRegex = /[a-zA-Z]/gi;

    // check input is null
    if (combinations === "") {
      throw {
        name: "Input Error",
        level: "",
        message: "input is empty or null. check your input.",
        htmlMessage: "",
        toString: () => {
          return console.log(this.name + ": " + this.message);
        },
      };
    } else {
      //check if the input has alpha numeric characters
      if (textRegex.test(combinations)) {
        throw {
          name: "Input Error",
          level: "",
          message:
            "input has alphanumeric characters and therefore cannot be parsed. check your input.",
          htmlMessage: "",
          toString: () => {
            return console.log(this.name + ": " + this.message);
          },
        };
      } else {
        // tests the given input COMBINATIONS to the regular expression named basicCalculatorRegex.
        if (basicCalculatorRegex.test(combinations)) {
          // return combinations.match(basicCalculatorRegex);
          return combinations;
        } else {
          throw {
            name: "input error",
            level: "",
            message:
              "input format invalid. Please follow PEMDAS expression in an INFIX FORMAT.",
            htmlMessage: "",
            toString: () => {
              return console.log(this.name + ": " + this.message);
            },
          };
        }
      }
    }
  }

  // new way:
  // check every character that the user inputs BEFORE the submit.
  // THIS IS STILL AN IDEA SO I WILL WORK ON IT LATER AFTER IM DONE WITH ALL OF THE BASIC FEATURES.

  // this checks which are the operators and the operands
  separateOperatorToOperand(expressions) {
    let referencePoint;
    let operationArray = [];
    // important: this converts my string EXPRESSIONS into an ARRAY with one charater per element
    let convertedCharacterStringArray = expressions.split("");

    // traverse the array and check where is the operator
    for (let i = 0; i < convertedCharacterStringArray.length; i++) {
      // // parse the value of the element convertedCharacterStringArray of the position i and see if the result will be an NaN or not
      // if (isNaN(parseFloat(convertedCharacterStringArray[i]))) {
      //   this.operation = convertedCharacterStringArray[i];
      //   referencePoint = i;
      // }
      // // if the reference point is less than the counter i
      // if (referencePoint < i) {
      //   this.nextOperand = convertedCharacterStringArray.slice(
      //     referencePoint + 1,
      //     convertedCharacterStringArray.length
      //   );
      // } else {
      //   this.currentOperand = convertedCharacterStringArray.slice(
      //     0,
      //     referencePoint
      //   );
      // }

      if(isNaN(parseFloat(convertedCharacterStringArray[i])) || convertedCharacterStringArray[0] !== '-'){
        operationArray[i] = convertedCharacterStringArray[i];
      }
    }

    console.log()
  }

  concatinateNumbers() {
    this.currentOperand = parseFloat(this.currentOperand.join(""));
    this.nextOperand = parseFloat(this.nextOperand.join(""));
  }

  appendNumber(character) {
    const inputTextbox = document.getElementById("calculatorInput");
    inputTextbox.value = inputTextbox.value + character;
  }

  compute() {
    if (this.operation === "+") {
      return this.currentOperand + this.nextOperand;
    } else if (this.operation === "-") {
      return this.currentOperand - this.nextOperand;
    } else if (this.operation === "/") {
      return this.currentOperand / this.nextOperand;
    } else if (this.operation === "*") {
      return this.currentOperand * this.nextOperand;
    }
  }

  updateDisplay() {
    let display = document.getElementById("calculatorOutput");
    display.value =
      this.currentOperand.toString() +
      this.operation.toString() +
      this.nextOperand.toString() +
      "                                     =   " +
      this.compute();
  }

  allClear() {
    this.currentOperand = "";
    this.nextOperand = "";
    this.operation = undefined;
    document.getElementById("calculatorInput").value = "";
    console.log("all cleared");
  }
  clear() {
    document.getElementById("calculatorInput").value = "";
  }

  undo() {}
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Loaded");

  const numberButtons = document.querySelectorAll("[data-number]");
  const operationButtons = document.querySelectorAll("[data-operation]");
  const equalsButton = document.querySelector("[data-equals]");
  const undoButton = document.querySelector("[data-undo]");
  const allClearButton = document.querySelector("[data-allClear]");
  const otherButtons = document.querySelectorAll("[data-miscellaneous]");
  const inputTextBox = document.getElementById("calculatorInput");

  const calculator = new Calculator();

  numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
      calculator.appendNumber(button.textContent);
    });
  });
  operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      calculator.appendNumber(button.textContent);
    });
  });
  otherButtons.forEach((button) => {
    button.addEventListener("click", () => {
      calculator.appendNumber(button.textContent);
    });
  });

  document.querySelector("form").addEventListener("submit", (e) => {
    let matchResult = calculator.sanitiseInput(inputTextBox.value);
    calculator.separateOperatorToOperand(matchResult);
    calculator.concatinateNumbers();
    calculator.updateDisplay();
    calculator.clear();
    e.preventDefault();
  });

  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      let matchResult = calculator.sanitiseInput(inputTextBox.value);
      calculator.separateOperatorToOperand(matchResult);
      calculator.concatinateNumbers();
      calculator.updateDisplay();
      calculator.clear();
      e.preventDefault();
    }
  });

  allClearButton.addEventListener("click", (e) => {
    calculator.allClear();
  });
  undoButton.addEventListener("click", (e) => {
    calculator.undo();
  });

  // document.getElementById('calculatorInput').addEventListener("input", (e)=>{
  //   calculator.inputChecker(e.target.value);
  //   // console.log(e.target.value);
  // });
});
