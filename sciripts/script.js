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

calculator.displayIn = "89+";
refreshDisplayIn();