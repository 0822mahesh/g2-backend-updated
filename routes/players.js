const express = require("express");
const Players = require("../models/players.js");
const router = express.Router();

router.get("/", async (req, res) => {
  // Player.find({})
  //   .then((players) => {
  //     res.send(players);
  //   })
  //   .catch((err) => {
  //     res.status(404).send({ message: err.message });
  //   });{
  await Players.find({}, (err, players) => {
    if (err) {
      console.log(err);
    } else {
      res.send(players);
      console.log(players);
    }
  });
});
module.exports = router;
