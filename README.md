Follow the instructions below to set up the API locally.

You need to set up a database in Postgres for our API to communicate with.

## Setting up database and tables in Postgres

Connect to postgres and run the following commands to create the necessary database and tables.

    CREATE DATABASE "re-port";

    \connect re-port

    CREATE TABLE VESSEL(
      id SERIAL PRIMARY KEY,
      name varchar(100),
      flag varchar(3));

    CREATE TABLE vessel_location(
      vessel_id int NOT NULL REFERENCES vessel(id),
      timestamp timestamp NOT NULL,
      latitude double precision not null check(latitude>=-90 and latitude<=90) NOT NULL,
      longitude double precision not null check(longitude>=-180 and longitude<=180) NOT NULL
      );

To insert dummy data, you can do something like this:

    INSERT INTO vessel(name, flag) VALUES("ship1", "CAN");

    INSERT INTO vessel_location(vessel_id, timestamp, latitude, longitude)
    VALUES(1, to_timestamp(‘10-02-2018 15:36:38’, ‘dd-mm-yyyy hh24:mi:ss’), 56.2769, -59.4498), (1, to_timestamp(‘10-02-2018 15:44:38’, ‘dd-mm-yyyy hh24:mi:ss’), 56.2678, -59.4298);

## Database config file
In order to connect to postgres through the API (i.e. to generate a connection string inside app.js), create a file called `db-config.json`in the root directory (i.e. in fishyhacky) formatted as below:

    {
        "user": <postgres username>,
        "password": <postgres password>,
        "host": <postgres host>,
        "port": <postgres port>,
        "database": "re-port"
    }

The default port that postgres is running on is 5432. So this file might look like:

    {
        "user": blaise,
        "password": password,
        "host": localhost,
        "port": 5432,
        "database": "re-port"
    }

## Running the server and connecting to the API

Before running the server, install the necessary packages using the following command

    $ npm install

Then to run the server, use the following command

    $ node app.js

You now have a server listening on port 8080. The API endpoints are exposed on this port. There are two endpoints to hit: `POST /locations` and `GET /locations/{id}`.

`GET /locations/{id}` responds with a JSON object formatted like this

    { "id": <id>,
      "locations": [
        {"timestamp": <mm-dd-yyyy hh:mm:ss>,
        "latitude": <latitude>,
        "longitude": <longitude>},
        .
        .
        .
      ] }

`id` is the our own identifier of the vessel (this is different from official vessel id).
`locations` is an array of location objects.
`latitude` and `longitude` are the location of the ship at time `timestamp`.

To try out this endpoint, hit `localhost:8080/locations/1` on your browser to get the information for vessel with id 1. You should get a json object as a response.

`POST /locations` accepts a POST request with an `application/json` body. This endpoint saves the location data that you send it to the database. The format for the json body is the same as the format that the `GET` endpoint responds with.

For example if you want to send location data for vessel 1, you could write the following JSON body:

    { "id": 1,
      "locations": [
      {"timestamp": '02-10-2018 13:00:00',
      "latitude": 56.2769,
      "longitude": -59.4498},
      {"timestamp": '02-10-2018 13:15:00',
      "latitude": 56.2899,
      "longitude": -59.4798}
      ]}

To hit the `POST` endpoint, you can use Postman. Pick `POST` as the method; enter `localhost:8080/locations` in the url bar; click `Body`, select `raw`, select `JSON (application/json)` from the dropdown, and copy the JSON above into the body. This endpoint should respond with `{ "status": "ok"}` if everything went smoothly, or `{"status": "error"}` if something went wrong.
