const express = require('express');
const pg = require('pg');
const dbConfig = require('./db-config.json');

const dbUser = dbConfig["user"]
const dbPassword = dbConfig["password"]
const dbHost = dbConfig["host"]
const dbPort = dbConfig["port"]
const dbName = dbConfig["database"]

const conString = 'postgres://'
                  + dbUser + ":"
                  + dbPassword + "@"
                  + dbHost + ":"
                  + dbPort + "/"
                  + dbName;

const client = new pg.Client(conString);
client.connect();

const app = express();

app.get('/', function (req, res) {
  res.send('Hello Viktorija!');
  client.query('INSERT INTO test(id) VALUES(4)');
});

app.get('/location', function(req, res) {
  res.send('Location');
})


app.listen(8080, function () {
  console.log('Port reportapp listening on port 8080!');
});
