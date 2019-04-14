// 1) Application is contained within a function constructor
function game () {

}

// generate random number 1 between 1 and 100
function generateNum1(min = 1, max = 100) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
}

// choose random operator from an array
function generateOperator() {
 	var operator = ['+','-','*','/'];
    var op = operator[Math.floor(Math.random() * operator.length)]
    return op;
}

// generate random number 2 between 1 and 100
function generateNum2(min = 1, max = 100 ) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
}

// Binding the number elements and operator element
const num1 = document.querySelector('#num1');
const operator = document.querySelector('#operator');
const num2 = document.querySelector('#num2');

var number1, number2;

// 10) A prototype method for generating random equations and populating it to the interface
game.prototype.generateEquation = function() {

	num1.textContent = generateNum1(1, 100);
	num2.textContent = generateNum2(1,100);
	operator.textContent = generateOperator();

	number1 = Number(num1.textContent);
	number2 = Number(num2.textContent);

	// userStorage.setItem('user', JSON.stringify(obj));
}

window.onload = function() {
	game.prototype.generateEquation();
}

// 2) A prototype method for adding
game.prototype.add = function() {
	return number1 + number2;
}

// 3) A prototype method for subtracting
game.prototype.subtract = function() {
	return number1 - number2;
}

// 4) A prototype method for dividing
game.prototype.divide = function() {
	return number1 / number2;
}

// 5) A prototype method for multiplying
game.prototype.multiply = function() {
	return number1 * number2;
}

// Bind the user answer element
var userAnswer = document.querySelector('#calInput');
/*
userAnswer.oninput = function() {
	userStorage.setItem('user', JSON.stringify(obj));
}*/

// 6a) Event binding: button to evaluate
const submit = document.querySelector('#submit');

submit.onclick = function() {
	game.prototype.evaluateEquation();
	game.prototype.winOrLose();
	userAnswer.textContent = " ";
	console.log("submit is TRIGGERED");
}

// 6b) Event binding: button to skip
const skip = document.querySelector('#skip');

skip.onclick = function() {
	game.prototype.generateEquation();
	userAnswer.textContent = " ";
	message.textContent = "";
}

// 6c) Event binding: button to reset
const reset = document.querySelector('#reset');

reset.onclick = function(){

	generateNum1();
	generateNum2();
	generateOperator();

	num1.textContent = generateNum1(1, 100);
	num2.textContent = generateNum2(1,100);
	operator.textContent = generateOperator();

	userAnswer.textContent = " ";
	message.textContent = "";

	score.textContent = 0;

	localStorage.clear();
}

// 7) A prototype method that evaluates the equation
	// Compare the correct answer and user's answer
var answer;
game.prototype.evaluateEquation = function() {

	if(operator.textContent === '+'){
		answer = game.prototype.add();
		console.log("add is TRIGGERED");
	}
	else if(operator.textContent === '-') {
		answer = game.prototype.subtract();
		console.log("subtract is TRIGGERED");
	}
	else if(operator.textContent === '*') {
		answer = game.prototype.multiply();
		console.log("multiply is TRIGGERED");
	}
	else if(operator.textContent === '/') {
		answer = game.prototype.divide();
		console.log("divide is TRIGGERED");
	}
}

// 8) & 9) A prototype method that executes when the user wins or loses a question
	// Bind the score element and message element
var score = document.querySelector('#scorevalue');
score.value = 0;
const message = document.querySelector('#message');
	// Win or Lose
game.prototype.winOrLose = function() {

	if (userAnswer.value == answer) {
		score.value = Number(score.value) + 1;
		score.textContent = new String(score.value);
		message.textContent = "Yes you got this!";
	} else {
		score.value = Number(score.value) - 1;
		score.textContent = new String(score.value);
		message.textContent = "Try again!";
	}
	console.log("winOrLose is TRIGGERED");
}

// 11) Store the user's current equation, score, and answer to the user's sesson in local storage
var userStorage = window.localStorage;
	// user's value structure
var obj = {
  equation: number1 + operator + number2,
  score: score.value,
  answer: userAnswer.value
};

userStorage.setItem('user', JSON.stringify(obj));