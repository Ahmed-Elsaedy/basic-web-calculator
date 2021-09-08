const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-clear]");
const currentOperandTextElement = document.querySelector(
    "[data-current-operand"
);
const previousOperandTextElement = document.querySelector(
    "[data-previous-operand]"
);
const periodButton = document.querySelector("[data-period");
const activeOperationTextElement = document.querySelector(
    "[data-active-operation]"
);

class Calculator {
    constructor(
        previousOperandTextElement,
        currentOperandTextElement,
        activeOperationTextElement
    ) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.activeOperationTextElement = activeOperationTextElement;
        this.clear();
    }

    clear() {
        this.previousOperand = "";
        this.currentOperand = "";
        this.activeOperation = "";
    }

    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1);
    }

    appendNumber(number) {
        this.currentOperand = this.currentOperand + number;
    }

    appendPeriod() {
        if (this.currentOperand.includes(".")) return;
        this.currentOperand = this.currentOperand + ".";
    }

    activateOperation(operation) {
        if (
            this.previousOperand !== "" &&
            this.activeOperation !== "" &&
            this.currentOperand !== ""
        )
            this.calculate();

        this.activeOperation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    calculate() {
        let computation;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(previous) || isNaN(current) || this.activeOperation === "")
            return;

        switch (this.activeOperation) {
            case "+":
                computation = previous + current;
                break;
            case "-":
                computation = previous - current;
                break;
            case "÷":
                computation = previous / current;
                break;
            case "*":
                computation = previous * current;
                break;
            default:
                break;
        }
        this.currentOperand = computation;
        this.activeOperation = "";
        this.previousOperand = "";
    }

    formatNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        let integerDisplay;
        if (isNaN(integerDigits)) integerDisplay = "";
        else {
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0,
            });
        }
        if (decimalDigits != null) return `${integerDisplay}.${decimalDigits}`;
        else return integerDisplay;
    }

    updateDisplay() {
        this.previousOperandTextElement.innerText = this.formatNumber(
            this.previousOperand
        );
        this.activeOperationTextElement.innerText = this.activeOperation;
        this.currentOperandTextElement.innerText = this.formatNumber(
            this.currentOperand
        );
    }
}

const calc = new Calculator(
    previousOperandTextElement,
    currentOperandTextElement,
    activeOperationTextElement
);

numberButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        calc.appendNumber(button.innerText);
        calc.updateDisplay();
    });
});

periodButton.addEventListener("click", (event) => {
    calc.appendPeriod();
    calc.updateDisplay();
});

operationButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        calc.activateOperation(button.innerText);
        calc.updateDisplay();
    });
});

equalsButton.addEventListener("click", (event) => {
    calc.calculate();
    calc.updateDisplay();
});

clearButton.addEventListener("click", (event) => {
    calc.clear();
    calc.updateDisplay();
});

deleteButton.addEventListener("click", (event) => {
    calc.delete();
    calc.updateDisplay();
});