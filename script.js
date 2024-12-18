const ERROR_MESSAGE = "MATH ERROR";

function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    if(b==0){
        return ERROR_MESSAGE;
    }
    return a/b;
}

function percentage(a,b){
    return a*b/100;
}

function operate(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);

    switch(operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '×': return multiply(a, b);
        case '÷': return divide(a, b);
        case '%': return percentage(a, b);
        default: return ERROR_MESSAGE;
    }
}

let currentOperand1;
let currentOperand2;
let currentOperator;

const display = document.querySelector(".display");

const operators = document.querySelectorAll(".operator");
operators.forEach(operator => operator.addEventListener('click', e=>{
    if(currentOperand2!=null){
        let result = operate(currentOperand1, currentOperand2, currentOperator);
        if(result != ERROR_MESSAGE){
            currentOperand1 = result;
            currentOperator = e.target.textContent;
            currentOperand2 = null;
            display.textContent = currentOperand1 + currentOperator;
        }
        else{
            reset();
            display.textContent = ERROR_MESSAGE;
        }
    }
    else if(currentOperand1!=null){
        currentOperator = e.target.textContent;
        display.textContent = currentOperand1+ currentOperator;
    }
    else if(currentOperand1==null){
        currentOperand1 = 0;
        currentOperator = e.target.textContent;
        display.textContent = currentOperand1 + currentOperator;
    }
}));

const operands = document.querySelectorAll(".operand");
operands.forEach(operand => operand.addEventListener('click', e=>{
    if(currentOperator==null){
        if(currentOperand1==null) currentOperand1 = e.target.textContent;
        else currentOperand1 += e.target.textContent;
        display.textContent = currentOperand1;
    }
    else{
        if(currentOperand2==null) currentOperand2 = e.target.textContent;
        else currentOperand2 += e.target.textContent;
        display.textContent = currentOperand1 + currentOperator + currentOperand2;
    }
}));

const equalBtn = document.querySelector(".equals");
equalBtn.addEventListener('click', e=>{
    if(currentOperand2!=null){
        let result = operate(currentOperand1, currentOperand2, currentOperator);
        currentOperand1 = result==ERROR_MESSAGE ? null : result;
        currentOperator=null;
        currentOperand2=null;
        display.textContent = result==ERROR_MESSAGE ? ERROR_MESSAGE : currentOperand1;
    }
    else if(currentOperand1!=null){
        currentOperator=null;
        display.textContent = currentOperand1;
    }
});

const delBtn = document.querySelector(".del");
delBtn.addEventListener('click', ()=>{
    if(display.textContent == ERROR_MESSAGE){
        reset();
    }
    if(display.textContent){
        if(currentOperand2 && currentOperand2.length>1 && !isOperator(display.textContent.at(-2))){
            display.textContent = display.textContent.trim().slice(0, -1);
            currentOperand2 = currentOperand2.slice(0,-1);
        }
        else if(isOperator(display.textContent.at(-2))){
            display.textContent = display.textContent.trim().slice(0, -1);
            currentOperand2 = null;
        }
        else if(isOperator(display.textContent.at(-1)) && currentOperator!=null){
            display.textContent = display.textContent.trim().slice(0, -1);
            currentOperator = null;
        }
        else if(currentOperand1 && currentOperand1.length>1){
            display.textContent = display.textContent.trim().slice(0, -1);
            currentOperand1 = currentOperand1.slice(0,-1);
        }
        else if(display.textContent.length==1){
            display.textContent = display.textContent.trim().slice(0, -1);
            currentOperand1 = null;
        }
    }
});

const clearBtn = document.querySelector(".clear");
clearBtn.addEventListener('click', reset);

function reset(){
    currentOperand1 = null;
    currentOperand2 = null;
    currentOperator = null;
    display.textContent = null;
};

function isOperator(op){
    switch(op) {
        case '+':
        case '-':
        case '×':
        case '÷':
        case '%': return true
        default: return false;
    }
}