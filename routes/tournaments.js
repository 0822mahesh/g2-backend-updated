const express = require("express");
const Tuser = require("../models/tuser.js");
const Tournaments = require("../models/tournaments.js");
const Player = require("../models/players.js");
const router = express.Router();
const CryptoJS = require("crypto-js");
const players = require("../models/players.js");
const { Mongoose } = require("mongoose");
//To Get All tournaments
router.get("/", (req, res) => {
  //res.send("tournamets data");

  Tournaments.find((err, tournaments) => {
    if (err) {
      res.status(404).json(err);
    } else {
      res.send(tournaments);
      console.log(tournaments);
    }
  }).sort({ tdate: -1 });
});
//To post tournament
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
//tournament detailed information
router.get("/:id", (req, res, next) => {
  let id = req.params.id;
  console.log(id);
  Tournaments.findById(id, (err, tournamentdetails) => {
    if (err) {
      console.log(err);
      res.status(404).json(err);
    } else {
      res.status(200).json(tournamentdetails);
    }
  });
});
//tournament update method
router.patch("/:id", async (req, res) => {
  let id = req.params.id;
  values = req.body;
  Tournaments.findByIdAndUpdate(id, values, (err) => {
    if (err) {
      console.log(err);
      res.status(404).json(err);
    } else {
      res.status(200).json({ messqge: "Tournament data updated" });
    }
  });
});

//tournament delete method
router.delete("/:id", (req, res) => {
  let id = req.params.id;
  Tournaments.findByIdAndDelete(id, (err) => {
    if (err) {
      console.log(err);
      res.status(404).json(err);
    } else {
      res.status(200).json({ message: "Deleted" });
    }
  });
});
//Player registration
router.post("/player", async (req, res) => {
  console.log("perams are" + JSON.stringify(req.params));
  try {
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
  } catch (error) {
    res.status(404).json(error);
  }
});
//registerd players to perticular tournament
router.get("/:id/players", async (req, res) => {
  let id = req.params.id;
  console.log(id);
  console.log(typeof id);
  await players
    .find({ tournament: id }, (err, players) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).json(players);
        console.log(players);
      }
    })
    .clone();
});

module.exports = router;
