'use strict';

var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var router = express.Router();

var staticFiles = express.static(path.join(__dirname, '../../client/build'));
app.use(staticFiles);

router.get('/cities', function (req, res) {
  var cities = [{ name: 'New York City', population: 8175133 }, { name: 'Los Angeles', population: 3792621 }, { name: 'Chicago', population: 2695598 }];
  res.json(cities);
});

app.use(router);

// any routes not picked up by the server api will be handled by the react router
app.use('/*', staticFiles);

app.set('port', process.env.PORT || 3001);
app.listen(app.get('port'), function () {
  console.log('Listening on ' + app.get('port'));
});