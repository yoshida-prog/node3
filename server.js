const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');
//const async = require('async');
const URL = 'https://opentdb.com/api.php?amount=10';

app.set('view engine', 'ejs');

const urlencodedParser = bodyParser.urlencoded({
    extended: true
});
app.use(bodyParser.json());

const options = {
  method: 'GET',
  url: URL,
  headers: {
    'Content-type': 'application/json'
  },
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

app.get('/', urlencodedParser, (req, res) => {
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
    quizArray = JSON.stringify(quizArray);
    res.render('index', {quizArray});
  });
});

app.listen(3000, () => {
  console.log('My app listening on port 3000!');
});
