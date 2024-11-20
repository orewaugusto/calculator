let firstOperand = null;
let secondOperand = null;
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
  roundedResult = Math.round(result*10e9)/10e9; // Fix the number of decimal places;
  currentScreen.textContent = roundedResult;
  firstOperand = roundedResult;
  secondOperand = null;
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
  // Cuidar do caso onde se insere dois operadores consecutivos, o segundo vindo após o negativo.
  if (operator == '-' && firstOperand === null){
    currentScreen.textContent = operator;
    shouldReset = false;
    return;
  }
  if(!operation){
    operation = operator;
    firstOperand = parseFloat(currentScreen.textContent);
    shouldReset = true;
  }
  else{
    if (shouldReset) return; // Avoid the insertion of an operator if an operand is expected;
    secondOperand = parseFloat(currentScreen.textContent);
    operate(firstOperand, secondOperand, operation);
    operation = operator;
  }

  previousScreen.textContent = firstOperand + operation;
}

function inputEqual(){
  console.log("caiu aqui kkk");
  if (shouldReset || !operation) return; // Avoid calling an operation with a missing operand or operator ; 
  else if (firstOperand !== null){
    secondOperand = parseFloat(currentScreen.textContent);
    previousScreen.textContent = firstOperand + operation + secondOperand + "=";
    operate(firstOperand, secondOperand, operation);
    operation = null;
  }
}

function inputDot(){
  if(currentScreen.textContent.includes(".")) return; // Avoid the insertion of a second dot if the value already has one;
  if(shouldReset){
    currentScreen.textContent = "0.";
    shouldReset = false;
  }
  else currentScreen.textContent += ".";
}

function clearAll(){
  previousScreen.textContent = "[ ]";
  currentScreen.textContent = "0";
  firstOperand = null;
  secondOperand = null;
  operation = null;
  shouldReset = true;
}

function eraseDigit(){
  if(!firstOperand && shouldReset) return;
  if(shouldReset && operation){
    operation = null;
    previousScreen.textContent.slice(0, -1);
  }
  else {
    currentScreen.textContent.slice(0, -1);
  }

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

equalBtn.addEventListener("click", () => inputEqual());

const dotBtn = document.querySelector(".dot");
dotBtn.addEventListener("click", () => inputDot());

const ACBtn = document.querySelector(".AC");
ACBtn.addEventListener("click", () => clearAll());

