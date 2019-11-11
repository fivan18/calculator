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


