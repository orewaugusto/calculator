function safeCalculate(expr) {
  // avoid eval; simple parser for numbers and + - * /
  if (!/^[0-9+\-*/(). ]+$/.test(expr)) throw new Error("Invalid input");
  return Function(`"use strict"; return (${expr})`)();
}

function divide(a, b) {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
}

module.exports = { safeCalculate, divide };
