function refreshDisplayIn(){
    document.querySelector("#display-in")
        .innerText = calculator.displayIn;
}

const calculator = {
    displayIn: "",
    displayOur: ""
};


Array.from(document.querySelectorAll("#numbers > button"))
    .filter((button) => button.innerText !== "." && button.innerText !== "=")
    .forEach((number) => {
        number.addEventListener("click", (event) => {
            calculator.displayIn += event.target.innerText;
            refreshDisplayIn();
        });
    });

document.querySelector("#b-dot")
    .addEventListener("click", (event) => {
        const arrDisplayIn = calculator.displayIn.split(/[\+\*\-\/]/);
        const lastItem = arrDisplayIn[arrDisplayIn.length - 1];
        if (
            calculator.displayIn === ""
            ){
            calculator.displayIn += ".";
        } else if(
            /[\+\*\-\/]/.test(calculator.displayIn[calculator.displayIn.length - 1])
            ) {
            calculator.displayIn += ".";
        } else if(
            /[0-9]/.test(lastItem[lastItem.length - 1]) &&
            !/\./g.test(lastItem)
        ){
            calculator.displayIn += ".";
        }
        refreshDisplayIn();
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

calculator.displayIn = "89+";
refreshDisplayIn();

console.log(
    "12".slice(0,1)
);