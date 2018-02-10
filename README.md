App Listens on port 8080 for testing.

run node app.js
and it will start.

## Databse config file
In order to connect to postgres, create a file called `db-config.json` formatted as below:

  {
    "user": <postgres username>,
    "password": <postgres password>,
    "host": <postgres host>,
    "port": <postgres port>,
    "database": "re-port"
  }
