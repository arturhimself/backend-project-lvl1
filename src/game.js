import { getAnswer } from './cli.js';

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const newQuestion = (number) => getAnswer(`Question: ${number} `);

const validateAnswer = (text) => text === 'yes' || text === 'no';

const isEven = (number) => number % 2 === 0;

const errorHandler = (error, name) => {
	const {
		type,
		answer,
		correct,
	} = error;
	switch (type) {
		case 'answerError':
			console.log(`'${answer}' is wrong answer ;(. \nLet's try again, ${name}!`);
			break;
		case 'evenError':
			console.log(`'${answer}' is wrong answer ;(. Correct answer was '${correct}'.\nLet's try again, ${name}!`);
			break;
		default:
			console.log(`wrong answer ;(.\nLet's try again, ${name}!`);
			break;
	}
};

const process = () => {
	const error = {};
	for (let i = 0; i < 3; i += 1) {
		const number = getRandomNumber(0, 100);
		const answer = newQuestion(number);
		if (!validateAnswer(answer)) {
			error.type = 'answerError';
			error.answer = answer;
			break;
		}
		if (isEven(number) && answer !== 'yes') {
			error.type = 'evenError';
			error.answer = answer;
			error.correct = 'yes';
			break;
		}
		if (!isEven(number) && answer !== 'no') {
			error.type = 'evenError';
			error.answer = answer;
			error.correct = 'no';
			break;
		}
		console.log('Correct!');
	}
	return error;
};

const startGame = () => {
	const name = getAnswer('May I have your name? ');
	console.log(`Hello, ${name}!`);
	console.log('Answer "yes" if the number is even, otherwise answer "no".');
	const processError = process();
	if (Object.keys(processError).length) {
		return errorHandler(processError, name);
	}
	console.log(`Congratulations, ${name}!`);
	return true;
};

export { startGame };
