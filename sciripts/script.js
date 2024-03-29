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

function computeOperations(strAsArr, operation1, operation2){
    console.log(strAsArr);
    let index1 = strAsArr.indexOf(operation1);
    let index2 = strAsArr.indexOf(operation2);
    while(
        index1 !== -1 ||
        index2 !== -1
    ){
        console.log(index1);
        console.log(index2);
        const index = index1 < index2 
            ? index1 !== -1
                ? index1
                : index2
            : index2 !== -1
                ? index2
                : index1;
        const operation = index === index1 ? operation1 : operation2;
        const result = calculator[operation](strAsArr[index - 1], strAsArr[index + 1]);
        strAsArr.splice(index - 1, 3, result);

        console.log(strAsArr);
        index1 = strAsArr.indexOf(operation1);
        index2 = strAsArr.indexOf(operation2);
    }
}

function computeResult(strAsArr){
    strAsArr = strAsArr.map((val) => !/^[\+\*\-\/]$/.test(val) ? Number(val) : val);

    computeOperations(strAsArr, "/", "*");
    computeOperations(strAsArr, "+", "-");

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
            if(
                calculator.displayOut !== "" &&
                calculator.displayOut !== "Can't divide by zero" 
            ){
                if(/^[\/\*\-\+]$/.test(event.target.innerText)){
                    calculator.displayIn = calculator.displayOut +
                        event.target.innerText;
                } else {
                    calculator.displayIn = event.target.innerText;  
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

            calculator.displayOut = "";
            refreshDisplayOut();
        });
    });

document.querySelector("#b-backspace")
    .addEventListener("click", (event) => {
        if(calculator.displayIn !== ""){
            calculator.displayIn = calculator.displayIn.length >= 2
                ? calculator.displayIn.slice(0, calculator.displayIn.length - 1)
                : "";
            refreshDisplayIn();

            calculator.displayOut = "";
            refreshDisplayOut();
        }
    });

document.querySelector("#b-equal")
    .addEventListener("click", (event) => {
        const strAsArr = getStrAsArr(calculator.displayIn);
        if(strAsArr.length === 0) {
            calculator.displayOut = "";
        } else if(strAsArr.length === 1){
            calculator.displayOut = strAsArr[0];
        } else if(strAsArr.length > 1){
            if(validateDivisionByZero(strAsArr)){
                calculator.displayOut = "Can't divide by zero";
            } else {
                calculator.displayOut = (Math.round(computeResult(strAsArr) * 1000) / 1000)
                    .toString();
            }
        }
        refreshDisplayOut();
    });

//module.exports = getStrAsArr
