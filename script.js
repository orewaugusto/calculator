let firstOperator = null;
let secondOperator = null;
let operation = null;
let shouldReset = true;

const previousScreen = document.querySelector(".previous");
const currentScreen = document.querySelector(".current");

function operate(a, b, op){
  let result;
  switch (op){
    case '+': 
      result = a + b;
      break;
    case '-': 
      result = a - b;
      break;
  }
  currentScreen.textContent = result;
  firstOperator = result;
  secondOperator = null;
  shouldReset = true;
}

function inputNumber(num){
  if(shouldReset){
    currentScreen.textContent = num;
    shouldReset = false;
  }
  else {
    currentScreen.textContent += num;
  }
}

function inputOperator(operator){
  if(!operation){
    operation = operator;
    firstOperator = parseFloat(currentScreen.textContent);
    shouldReset = true;
  }
  else{
    secondOperator = parseFloat(currentScreen.textContent);
    operate(firstOperator, secondOperator, operation);
    operation = operator;
  }
}

function inputEqual(){
  secondOperator = parseFloat(currentScreen.textContent);
  operate(firstOperator, secondOperator, operation);
  operation = null;
}

const b1 = document.querySelector(".one");
const b2 = document.querySelector(".two");

const addBtn = document.querySelector(".plus");
const subBtn = document.querySelector(".minus");
const equalBtn = document.querySelector(".equal");

b1.addEventListener("click", () => inputNumber(1));
b2.addEventListener("click", () => inputNumber(2));

addBtn.addEventListener("click", () => inputOperator("+"));
subBtn.addEventListener("click", () => inputOperator("-"));

