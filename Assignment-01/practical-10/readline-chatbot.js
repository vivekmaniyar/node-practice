const questions = require('./questions');
const rl = require('readline');

const rlInterface = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});

var score = 0;
var questionIndex = 0;
function askQuestion(question) {
    rlInterface.question(question, (answer) => {
        if (answer === questions.questionlist[questionIndex].answer) {
            console.log('Correct!');
            score++;
        } else {
            console.log('Incorrect!');
        }
        questionIndex++;
        if (questionIndex < questions.questionlist.length) {
            askQuestion(questions.questionlist[questionIndex].question);
        } else {
            rlInterface.close();
            console.log(`You got ${score} out of ${questions.questionlist.length} correct!`);
        }
    });
}

console.log('Welcome to the quiz!');
askQuestion(questions.questionlist[questionIndex].question);