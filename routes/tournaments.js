const express = require("express");
const Tuser = require("../models/tuser.js");
const Tournaments = require("../models/tournaments.js");
const Player = require("../models/players.js");
const router = express.Router();
const CryptoJS = require("crypto-js");
const players = require("../models/players.js");

router.get("/", (req, res) => {
  //res.send("tournamets data");

  Tournaments.find((err, tournaments) => {
    if (err) {
      return console.log(err);
    } else {
      res.send(tournaments);
      console.log(tournaments);
    }
  }).sort({ tdate: -1 });
});

router.post("/", (req, res) => {
  const newTournament = new Tournaments({
    name: req.body.name,
    tdate: req.body.tdate,
    rldate: req.body.rldate,
    place: req.body.place,
    hostName: req.body.hostName,
  });
  newTournament.save();
  res.status(201).json(req.body);
});

router.get("/:id", (req, res, next) => {
  let id = req.params.id;
  console.log(id);
  Tournaments.findById(id, (err, tournamentdetails) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(tournamentdetails);
    }
  });
});

router.post("/player", async (req, res) => {
  console.log("perams are" + JSON.stringify(req.params));
  const player = new Player({
    playerFirstName: req.body.playerFirstName,
    playerLastName: req.body.playerLastName,
    playeremail: req.body.playeremail,
    playerphoneNumber: req.body.playerphoneNumber,
    tournament: req.body.tournament,
  });
  const savedPlayer = await player.save();
  //res.send(savedPlayer);
  res.status(200).json(req.body);

  console.log(savedPlayer);
});

router.get("/player", async (req, res) => {
  // Player.find({})
  //   .then((players) => {
  //     res.send(players);
  //   })
  //   .catch((err) => {
  //     res.status(404).send({ message: err.message });
  //   });{
  await players.find(mongoose.Types.ObjectId(), (err, players) => {
    if (err) {
      console.log(err);
    } else {
      res.send(players);
      console.log(players);
    }
  });
});

module.exports = router;
