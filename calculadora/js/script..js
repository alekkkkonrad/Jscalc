const previousOperationText = document.querySelector('#previous-operation')
const currentOperationText = document.querySelector('#current-operation')
const result = document.querySelector("#result");
const buttons = document.querySelectorAll('#buttons-container button')

class Calculator{
    constructor(previousOperationText, currentOperationText, result) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.result = result
        this.currentOperation = ""
    }

    updateScreen(operationValue = null, operation = null, current = null, previous = null){
        if(operationValue === null){
            this.currentOperationText.innerText += this.currentOperation
        }
        else{
            if(previous === 0 ){
                operationValue = current;
            }
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            result.innerHTML = this.previousOperationText.innerHTML.slice(0, -1)
            this.currentOperationText.innerText = ""
        }
    }

    addDigit(digit){
        if(digit === '.' && this.currentOperationText.innerText.includes('.')){
            return
        }
        this.currentOperation = digit
        currentOperationText.classList.remove('hide')
        result.classList.remove('show')
        this.updateScreen()
    }

    processOperation(operation){
        if(this.currentOperationText.innerText === "" && operation !== "C"){
            if(this.previousOperationText.innerText !== ""){
                this.changeOperation(operation)
            }
            return
        }

        let operationValue
        const previous = +this.previousOperationText.innerText.split(" ")[0]
        const current = +this.currentOperationText.innerText

        switch(operation){
            case "+":
                operationValue = previous + current;
                calc.updateScreen(operationValue, operation, current, previous)
                break;
            case "-":
                operationValue = previous - current;
                calc.updateScreen(operationValue, operation, current, previous)
                break;
            case "/":
                operationValue = previous / current;
                calc.updateScreen(operationValue, operation, current, previous)
                break;
            case "*":
                operationValue = previous * current;
                calc.updateScreen(operationValue, operation, current, previous)
                break;  
             case "DEL":
                calc.processDelOperator()
                break;
             case "CE":
                calc.processCleanCurrentOperation()
                break;
             case "C":
                calc.processCleanOperation()
                break;
             case "=":
                 calc.processResult()
                break;
            default:
                return;
        }

    }

    changeOperation(operation){
        const mathOperation = ["*","/","+","-"]

        if(!mathOperation.includes(operation)){
            return
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation

    }

    processDelOperator(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
        
    }
    processCleanCurrentOperation(){
        this.currentOperationText.innerText = ""
    }
    processCleanOperation(){
        result.innerText = ""
        this.previousOperationText.innerText = ""
        this.currentOperationText.innerText = ""
    }
    processResult(){
        currentOperationText.classList.add('hide')
        result.classList.add('show')
        const operation = previousOperationText.innerText.split(" ")[1];
        this.processOperation(operation)
    }
}
    const calc = new Calculator(previousOperationText, currentOperationText)

buttons.forEach((btn) =>{
    btn.addEventListener("click", (e) =>{
        const value = e.target.innerText
        if(+value >= 0 || value === '.'){
            calc.addDigit(value)
        }
        else{
            calc.processOperation(value)
        }
    })
})