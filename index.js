var express = require('express');
const fs = require('fs');
var cors = require('cors');
var app = express();
const port = 8081;
var _ = require('lodash');
let categories = JSON.parse(fs.readFileSync('./data/categories.json'));
let games = JSON.parse(fs.readFileSync('./data/games.json'));

let categories_id_with_games = _.uniq(_.flatten(_.map(games, 'genres')));
let categories_with_games = _.filter(categories, function (category) {
  return _.includes(categories_id_with_games, category.id);
})
categories_with_games.forEach(function (category) {
  category.count = games.filter(function (game) {
    return _.includes(game.genres, category.id);
  }).length;
})

app.use(cors())

app.get('/', function (req, res) {
  res.send('Benvenuto hai la possibilità di fare cose');
});

app.get('/categories', function (req, res) {
  res.send(categories_with_games);
});

app.get('/games', function (req, res) {

  let category = req.query.category;
  if (category) {
    res.send(games.filter(function (game) {
      return game.genres && game.genres.find(function (n) {
        return n == category;
      });
    }));
  }
  else {
    res.send(games);
  }

});

app.listen(port, function () {
  console.log('App listening on port ' + port + '!');
});
