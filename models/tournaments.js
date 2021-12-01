const express = require("express");

const mongoose = require("mongoose");

const TournamentsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tdate: {
    type: Date,
    required: true,
  },
  rldate: {
    type: Date,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  hostName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Tornaments", TournamentsSchema);
