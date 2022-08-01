const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const questions = require('mario-chatbot/questions');

var httpServer = http.createServer(function(request, response) {
    if(request.url === '/') {
        fs.readFile('./index.html', function(err, data) {
            if(err) {
                response.writeHead(404, {'Content-Type': 'text/html'});
                response.write('404 Not Found');
            } else {
                response.write(data);
            }
            response.end();
        });
    }
}).listen(8080);

var wss = new WebSocket.Server({server: httpServer});

wss.on('connection', function(ws) {
    var questionIndex = 0;
    var score = 0;
    ws.send('Welcome to the Quiz!');
    ws.send("Question:" + questions.questionlist[0].question);
    ws.on('message', function(message) {
        if(message.toString() === questions.questionlist[questionIndex].answer) {
            score++;
        }
        questionIndex++;
        if(questionIndex < questions.questionlist.length) {
            ws.send("Question:" + questions.questionlist[questionIndex].question);
        } else {
            ws.send("You got " + score + " out of " + questions.questionlist.length + " questions correct!");
        }
    });
});