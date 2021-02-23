const quizModel = require('../models/QuizModel');
const request = require('request');
const URL = 'https://opentdb.com/api.php?amount=10&type=multiple';
const options = {
  method: 'GET',
  url: URL,
  json: true
};

module.exports = {
  result: (req, res) => {
    request(options, (err, response, body) => {
      const datas = quizModel.createQuiz(body)
      res.header('Content-Type', 'application/json; charset=utf-8');
      res.json(datas);
    })
  }
}
