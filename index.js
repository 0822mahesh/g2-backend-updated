const express = require("express");

const userRoutes = require("./routes/users.js");
const tournamentsRoutes = require("./routes/tournaments.js");
playersRoutes = require("./routes/players.js");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db connected"))
  .catch((err) => {
    console.log(err);
  });
const app = express();
app.use(cors());

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/tournaments", tournamentsRoutes);
app.use("/api/players", playersRoutes);

app.listen(PORT, () => console.log("server running on " + `${PORT}`));
