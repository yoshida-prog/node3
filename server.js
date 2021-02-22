const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');
const URL = 'https://opentdb.com/api.php?amount=10&type=multiple';
const urlencodedParser = bodyParser.urlencoded({
  extended: true
});
const options = {
  method: 'GET',
  url: URL,
  json: true
};

class Quiz {
  constructor(category, type, difficulty, question, correct_answer, incorrect_answers) {
    this.category = category;
    this.type = type;
    this.difficulty = difficulty;
    this.question = question;
    this.correct_answer = correct_answer;
    this.incorrect_answers = incorrect_answers;
  }
}

app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api/json', urlencodedParser, (req, res) => {
  request(options, (err, response, body) => {
    const quizDatas = body.results;
    let quizArray = [];
    for (let index in quizDatas) {
      let quiz = new Quiz(
        quizDatas[index].category,
        quizDatas[index].type,
        quizDatas[index].difficulty,
        quizDatas[index].question,
        quizDatas[index].correct_answer,
        quizDatas[index].incorrect_answers
      );
      quizArray.push(quiz);
    }
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.json(quizArray);
  });
});

app.listen(3000, () => {
  console.log('My app listening on port 3000!');
});
