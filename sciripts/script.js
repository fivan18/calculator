function refreshDisplayIn(){
    document.querySelector("#display-in")
        .innerText = calculator.displayIn;
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

    while(
        arrStr[arrStr.length - 1] === "" ||
        /^[\+\*\-\/\.]$/.test(arrStr[arrStr.length - 1])
    ) {
        arrStr.pop();
    }

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

const calculator = {
    displayIn: "",
    displayOur: ""
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



//module.exports = getStrAsArr