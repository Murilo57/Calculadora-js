const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText; //Sera exibido na tela
    this.currentOperationText = currentOperationText; //Sera exibido na tela
    this.currentOperation = ""; //Usuario ira digitar
    }
    //add digit da tela da calculadora
    addDigit(digit) {     
        //Valida se ja existe um ponto, se houver não deixar utilizar outro
        if(digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

    //Todas as operações da calculadora
    processOperation(operation) {
        //Pega valor atual e anterior
        let operationValue;
        const previous = +this.previousOperationText.innerText;
        const current = +this.currentOperationText.innerText;

        switch(operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            default:
                return;
        }
    }

    //Mudando os valores na tela da calculadora
    updateScreen(
        operationValue = null, 
        operation = null, 
        current = null, 
        previous = null
    ) {
        console.log(operationValue,operation,current,previous)

        if(operationValue === null) {
        this.currentOperationText.innerText += this.currentOperation;
        } else {
           //Checa se o valor é zero, se for apenas adicionar o valor atual
           if(previous === 0) {
            operationValue = current;
           } 
        }
    }

}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {

        const value = e.target.innerText;

        if(+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});