const previousOperationText = document.querySelector("#previous-operation")
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container button")

console.log(buttons)

class Calculator {
    constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText
    this.currentOperationText = currentOperationText
    this.currentOperationText = ""
    }
}

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {

        const value = e.target.innerText;

        if(+value >= 0 || value === ".") {
            console.log(value);
        } else {
            console.log("Op: " + value);
        }
    });
});