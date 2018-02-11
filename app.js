const express = require('express');
const pg = require('pg');
const dbConfig = require('./db-config.json');

const dbUser = dbConfig["user"]
const dbPassword = dbConfig["password"]
const dbHost = dbConfig["host"]
const dbPort = dbConfig["port"]
const dbName = dbConfig["database"]

const conString = 'postgres://' +
                  dbUser + ":" +
                  dbPassword + "@" +
                  dbHost + ":" +
                  dbPort + "/" +
                  dbName;

const client = new pg.Client(conString);
client.connect();

const app = express();

app.get('/', function (req, res) {
  res.send('Hello Viktorija!');
});

app.get('/locations/:id', function(req, res) {
  res.json(
    {
      "id": req.params.id,
      "locations": [
        {
          "timestamp": 1,
          "lat": 1,
          "long": 1
        },
        {
          "timestamp": 2,
          "lat": 1,
          "long": 1
        }
      ]
    })
})

app.listen(8080, function () {
  console.log('Port reportapp listening on port 8080!');
});
