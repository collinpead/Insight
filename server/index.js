// server/index.js

const express = require("express");

const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3001;

const app = express();

const db = require('./queries');

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get("/steam/10", db.getSteamTen)
app.get("/steam/100", db.getSteamHundred)

app.get("/twitch/10", db.getTwitchTen)
app.get("/twitch/100", db.getTwitchHundred)

app.get("/game/:gameName/:time", db.getGamePastWeek)
app.get("/twitch/:gameName/:time", db.getStreamPastWeek)

app.get("/games", db.getGameNames)

app.get("/api", (req, res) => {
  res.json({ info: "Node.js, Express, and Postgres API" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});