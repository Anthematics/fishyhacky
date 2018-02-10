var express = require('express');
var pg = require('pg');
// var conString = "postgres://localhost:5432/report";
//
// var client = new pg.Client(conString);
// client.connect();

var app = express();
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.listen(8080, function () {
  console.log('Port reportapp listening on port 8080!');
});
