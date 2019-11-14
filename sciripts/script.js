function add(a, b){
    return a + b;
}

function substract(a, b){
    return a - b;
}

function divide(a, b){
    return a / b;
}
function multiply(a, b){
    return a * b;
}

function refreshDisplayIn(){
    document.querySelector("#display-in")
        .innerText = calculator.displayIn;
}
function refreshDisplayOut(){
    document.querySelector("#display-out")
        .innerText = calculator.displayOut;
}

function getStrAsArr(str){
    const numbers = str.split(/[\+\*\-\/]/);
    const operators = str.split(/\d+\.\d+|\d+\.|\.\d+|\d+/)
        .filter((val) => val !== "")   
        .join("")
        .split("");
    const arrStr = [numbers.shift()];
    while(numbers.length > 0){
        arrStr.push(operators.shift());
        arrStr.push(numbers.shift());
    }

    // We need to remove all the last items that are not numbers
    // like -.23+56*-.
    while(
        arrStr[arrStr.length - 1] === "" ||
        /^[\+\*\-\/\.]$/.test(arrStr[arrStr.length - 1])
    ) {
        arrStr.pop();
    }

    // This is becouse the signed numbers like -.56
    const returnArrStr = [];
    let i = 0;
    while(i < arrStr.length){
        if(arrStr[i] === ""){
            returnArrStr.push(arrStr[i+1] + arrStr[i+2]);
            i = i + 3;
        }else {
            returnArrStr.push(arrStr[i]);
            i++;
        }
    }
    return returnArrStr;
}

function validateDivisionByZero(strAsArr){
    let i = -1;
    while(
        (i = strAsArr.indexOf("/", i + 1)) != -1
    ) {
        if(Number(strAsArr[i + 1]) === 0){
            return true;
        }
    }
    return false;
}

function computeOperation(operation, strAsArr){
    let i;
    while(
        (i = strAsArr.indexOf(operation)) !== -1
    ){
        const result = calculator[operation](strAsArr[i - 1], strAsArr[i + 1]);
        strAsArr.splice(i - 1, 3, result);
    }
}

function computeResult(strAsArr){
    strAsArr = strAsArr.map((val) => !/^[\+\*\-\/]$/.test(val) ? Number(val) : val);

    computeOperation("/", strAsArr);
    computeOperation("*", strAsArr);
    computeOperation("+", strAsArr);
    computeOperation("-", strAsArr);

    return strAsArr[0];
}

const calculator = {
    displayIn: "",
    displayOut: "",
    "+": add,
    "-": substract,
    "/": divide,
    "*": multiply
};

const validations = {
    "1":{
        lastChar: [],
        lastItem: null
    },
    "2":{
        lastChar: [],
        lastItem: null
    },
    "3":{
        lastChar: [],
        lastItem: null
    },
    "4":{
        lastChar: [],
        lastItem: null
    },
    "5":{
        lastChar: [],
        lastItem: null
    },
    "6":{
        lastChar: [],
        lastItem: null
    },
    "7":{
        lastChar: [],
        lastItem: null
    },
    "8":{
        lastChar: [],
        lastItem: null
    },
    "9":{
        lastChar: [],
        lastItem: null
    },
    "0":{
        lastChar: [],
        lastItem: null
    },
    ".":{
        lastChar: [],
        lastItem: /^\d*\.\d*$/
    },
    "+":{
        lastChar: ["+", "-"],
        lastItem: /^\.$/
    },
    "-":{
        lastChar: ["+", "-"],
        lastItem: /^\.$/
    },
    "/":{
        lastChar: ["+", "-", "/", "*", undefined],
        lastItem: /^\.$/
    },
    "*":{
        lastChar: ["+", "-", "/", "*", undefined],
        lastItem: /^\.$/
    }   
};

Array.from(document.querySelectorAll("button"))
    .filter((button) => button.innerText !== "=" && button.innerText !== "backspace")
    .forEach((button) => {
        button.addEventListener("click", (event) => {
            if(calculator.displayOut !== ""){
                if(calculator.displayOut !== "Can't divide by zero"){
                    calculator.displayIn = calculator.displayOut +
                        event.target.innerText;
        
                    calculator.displayOut = "";
                    refreshDisplayOut();
                }
                else {
                    // This could be a mess 
                    return;
                }
            } else {
                const innerText = event.target.innerText;
                const lastChar = calculator.displayIn[calculator.displayIn.length - 1];
                const arrDisplayIn = calculator.displayIn.split(/[\+\*\-\/]/);
                const lastItem = arrDisplayIn[arrDisplayIn.length - 1];
                if(validations[innerText].lastChar.includes(lastChar)){
                    return;
                }
                if(validations[innerText].lastItem){
                    if(validations[innerText].lastItem.test(lastItem)) {
                        return;
                    }
                }
                calculator.displayIn += event.target.innerText;
            }
            refreshDisplayIn();
        });
    });

document.querySelector("#b-backspace")
    .addEventListener("click", (event) => {
        if(calculator.displayIn !== ""){
            calculator.displayIn = calculator.displayIn.length >= 2
                ? calculator.displayIn.slice(0, calculator.displayIn.length - 1)
                : "";
        }
        refreshDisplayIn();
    });

document.querySelector("#b-equal")
    .addEventListener("click", (event) => {
        const strAsArr = getStrAsArr(calculator.displayIn);
        if(calculator.displayOut !== ""){
            if(calculator.displayOut !== "Can't divide by zero"){
                calculator.displayIn = calculator.displayOut;
                refreshDisplayIn();
    
                calculator.displayOut = "";
            } else {
                // This could be a mess 
                return;
            }
        } else{
            if(strAsArr.length === 0) {
                calculator.displayOut = "";
            } else if(strAsArr.length === 1){
                calculator.displayOut = strAsArr[0];
            } else if(strAsArr.length > 1){
                if(validateDivisionByZero(strAsArr)){
                    calculator.displayOut = "Can't divide by zero";
                } else {
                    calculator.displayOut = computeResult(strAsArr).toString();
                }
            }
        }
        refreshDisplayOut();
    });

//module.exports = getStrAsArr