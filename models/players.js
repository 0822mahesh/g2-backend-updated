const express = require("express");
const mongoose = require("mongoose");
const m = require("mongoose-type-email");

const PlayerSchema = new mongoose.Schema({
  // tId: {
  //   type: String,
  //   required: true,
  // },
  playerFirstName: {
    type: String,
    required: true,
  },
  playerLastName: {
    type: String,
    required: true,
  },
  playeremail: {
    type: String,
    required: true,
  },
  playerphoneNumber: {
    type: Number,
    required: true,
  },
  tournament: { type: mongoose.Schema.Types.ObjectId, ref: "Tornaments" },
});

module.exports = mongoose.model("Players", PlayerSchema);
