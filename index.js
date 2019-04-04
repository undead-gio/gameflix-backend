var express = require('express');
const fs = require('fs');
var cors = require('cors');
var app = express();
const port = 8080;

let categories = JSON.parse(fs.readFileSync('./data/categories.json'));
let games = JSON.parse(fs.readFileSync('./data/games.json'));

app.use(cors())

app.get('/', function (req, res) {
  res.send('Benvenuto hai la possibilità di fare cose');
});

app.get('/categories', function (req, res) {
  res.send(categories);
});

app.get('/games', function (req, res) {

  let category = req.query.category;
  if(category){
    res.send(games.filter(function(game) {
        return game.genres && game.genres.find(function(n) {
          return n == category;
        });
    }));
  }
  else {
    res.send(games);
  }

  console.log(req);
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});
