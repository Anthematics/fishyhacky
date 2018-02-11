const express = require('express');
const pg = require('pg');
const dbConfig = require('./db-config.json');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


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



app.get('/', (req, res) => {
  res.send('Hello Viktorija!');
});

app.get('/locations/:id', (req, res) => {
  const queryString = 'SELECT vessel_id, timestamp, latitude, longitude ' +
                'FROM vessel_location ' +
                'WHERE vessel_id = $1';
  const values = [req.params.id];

    client.query(queryString, values, (err, result) => {
    rows = result.rows;
    locations = [];
    for (var i = 0; i < rows.length; i++) {
      locations.push({
        timestamp: rows[i]["timestamp"],
        latitude: rows[i]["latitude"],
        longitude: rows[i]["longitude"]
      })
    }

    res.json({"id": req.params.id, "locations": locations});

  })
})

app.post('/locations',function(req,res){
   const id = req.body.id;
   const locations = req.body.locations;

   console.log(id);
   console.log(locations);


   for (var i = 0; i < locations.length; i++) {
    const queryString = 'INSERT into vessel_location (vessel_id, timestamp, latitude, longitude) VALUES($1, $2, $3, $4)'
    const values = [id, locations[i].timestamp, locations[i].latitude, locations[i].longitude];

      client.query( queryString, values,

          function(err, result) {
              if (err) {
                  console.log(err);
              }

          });
    }
});

app.listen(8080, function () {
  console.log('Port reportapp listening on port 8080!');
});
