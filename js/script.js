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
        //Checagem se o valor de baixo é vazio
        if(this.currentOperationText.innerText === "" && operation !== "C"){
            //Mudança de operação
            if(this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);                    
            }
            return;
        }

        //Pega valor atual e anterior
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation,
                current, previous);
            break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation,
                current, previous);
            break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation,
                current, previous);
            break;
            case "DEL":
                this.processDelOperator();
            break;        
            case "CE":
                this.processClearCurrent();
            break;
            case "C":
                this.processClearAll();
            break;
            case "=":
                this.processEqualOperations();
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

           //Adicionado valor para cima do valor atual
           this.previousOperationText.innerText = `${operationValue} ${operation}`
           this.currentOperationText.innerText = "";
        }
    }

    //Muda operações matematicas
    changeOperation(operation) {
        const mathOperations = ["*", "/", "+", "-"]

        if(!mathOperations.includes(operation)) {
            return
        }
        //Tiro o ultimo operador e adiciono o novo qnd clicado
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0,-1) + operation;
    }

    //Deleta o ultimo digito
    processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    //Limpa o valor atual da operação
    processClearCurrent() {
        this.currentOperationText.innerText = ""
    }

    //Limpa toda a operação
    processClearAll() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    //Função do igual para exibir o final das operaçoes
    processEqualOperations() {
        const operation = previousOperationText.innerText.split(" ")[1];
        this.processOperation(operation)
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