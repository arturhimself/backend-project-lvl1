import readlineSync from 'readline-sync';

const getName = () => readlineSync.question('May I have your name? ');

const getAnswer = (question) => readlineSync.question(question);

export { getAnswer, getName };
