class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
        this.readyToReset = false;
    }

    clear(){
        this.currentOperand =''
        this.previousOperand =''
        this.operation =undefined
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    appendNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation){
        if (this.currentOperand === '') return
        if (this.previousOperand !=='') {
            this.compute()
        }
        this.operation = operation
        if (this.operation === 'xn') this.operation = '^'
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

    }
    changeSign(){
        this.currentOperand = 0 - this.currentOperand  
    }
    sqrtCompute(){
        const current = parseFloat(this.currentOperand)
        if (current<0 || isNaN(current)) return
        this.readyToReset = true;
        this.currentOperand = Math.sqrt(current) 
        this.operation = undefined
        this.previousOperand = ''
        this.currentOperandTextElement.innerText=this.currentOperand
        this.previousOperandTextElement.innerText=`\u221A ${current}`
    }

    findPercent(){
        this.currentOperand = this.currentOperand/100
    }

    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case "+": computation = prev + current
            break
            case "-": computation = prev - current
            break
            case "\u00D7": computation = prev*current
            break
            case "\u00F7": computation = prev/current
            break
            case "^": computation = Math.pow(prev, current)
            break
            default:
                return
        }
        this.readyToReset = true;
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
    

    updateDisplay(){
        this.currentOperandTextElement.innerText=this.currentOperand
        if (this.operation != null) {
        this.previousOperandTextElement.innerText=
         `${this.previousOperand} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText=''
        }
    }
}
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const percentButton = document.querySelector('[data-percent]')
const changeSignButton = document.querySelector('[data-changesign]')
const sqrtButton = document.querySelector('[data-sqrt]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener("click", () => {

        if(calculator.previousOperand === "" &&
        calculator.currentOperand !== "" &&
    calculator.readyToReset) {
            calculator.currentOperand = "";
            calculator.readyToReset = false;
        }
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
changeSignButton.addEventListener('click', button => {
    calculator.changeSign()
    calculator.updateDisplay()
})
percentButton.addEventListener('click', button => {
    calculator.findPercent()
    calculator.updateDisplay()
})
sqrtButton.addEventListener('click', button => {
    calculator.sqrtCompute()
})


