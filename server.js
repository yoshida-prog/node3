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
  json: true,
  url: URL
};

app.get('/', urlencodedParser, (req, res) => {
  request(options, (err, response, body) => {
    const results = body.results[0]
    const category = results.category;
    console.log(body.results[0]);
    res.render('index', {category});
  });
});

app.listen(3000, () => {
  console.log('My app listening on port 3000!');
});
