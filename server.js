const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const quizController = require('./controllers/quizController');
const urlencodedParser = bodyParser.urlencoded({
  extended: true
});

app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api/json', urlencodedParser, quizController.result);

app.listen(3000, () => {
  console.log('My app listening on port 3000!');
});
