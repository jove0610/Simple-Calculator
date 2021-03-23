// Select UI
const screenTextUI = document.querySelector('[data-screen-text]');
const numbersBtnUI = document.querySelectorAll('[data-numbers]');
const operatorsBtnUI = document.querySelectorAll('[data-operators]');
const signBtnUI = document.querySelector('[data-sign]');
const deleteBtnUI = document.querySelector('[data-delete]');
const clearBtnUI = document.querySelector('[data-clear]');
const equalsBtnUI = document.querySelector('[data-equals]');


// Variables
let previousOperand = '';
let currentOperand = '';
let operator = '';


// Add Event Listeners

numbersBtnUI.forEach(numberBTN => {
   numberBTN.addEventListener('click', () => {
      updateOperand(numberBTN.innerText);
      updateScreen(currentOperand);
   });
});

operatorsBtnUI.forEach(operatorBtn => {
   operatorBtn.addEventListener('click', () => {
      // Compute if the operand variables have values
      if (currentOperand !== '' && previousOperand !== '') {
         currentOperand = compute();
         if (previousOperand !== '') { // user did not divide by 0
            updateScreen(currentOperand);
            previousOperand = currentOperand;
            currentOperand = '';
            operator = operatorBtn.innerText;
         }
         return;
      }
      // If user clicked an operator but wants to change to another
      if (operator !== '') {
         operator = operatorBtn.innerText;
         return;
      }
      // Happens at start when the operators are first clicked before any numbers
      if (currentOperand === '') return;
      // Happens at beginning when no computation has been done yet
      if (currentOperand !== '') {
         previousOperand = currentOperand;
         currentOperand = ''; // So that user can input another operand
         operator = operatorBtn.innerText;
         return;
      }
   });
});

equalsBtnUI.addEventListener('click', () => {
   // Compute if the operand variables have values
   if (currentOperand !== '' && previousOperand !== '') {
      currentOperand = compute();
      if (previousOperand !== '') { // user did not divide by 0
         updateScreen(currentOperand);
         previousOperand = currentOperand;
         currentOperand = '';
         // operator = operatorBtn.innerText;
      }
      return;
   }
});

clearBtnUI.addEventListener('click', () => {
   previousOperand = '';
   currentOperand = '';
   operator = '';
   updateScreen(0);
});

signBtnUI.addEventListener('click', () => {
   if (currentOperand === '' && previousOperand !== '') {
      previousOperand = Number(previousOperand) * -1 + '';
      updateScreen(previousOperand);
      return;
   }
   currentOperand = Number(currentOperand) * -1 + '';
   updateScreen(currentOperand);
});



function updateOperand(number) {
   currentOperand += number;
}

function updateScreen(display) {
   screenTextUI.textContent = display;
}

function compute() {
   let computedValue = '';
   switch (operator) {
      case '+':
         computedValue = Number(previousOperand) + Number(currentOperand);
         break;
      case '-':
         computedValue = Number(previousOperand) - Number(currentOperand);
         break;
      case 'x':
         computedValue = Number(previousOperand) * Number(currentOperand);
         break;
      case '÷':
         if (currentOperand == 0) {
            previousOperand = '';
            currentOperand = '';
            operator = '';
            updateScreen('Cannot divide by 0');
            break;
         }
         computedValue = Number(previousOperand) / Number(currentOperand);
   }
   return computedValue;
}