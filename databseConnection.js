const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

function dbConnection() {
  const DB_URL = process.env.MONGO_URI;
  //   console.log("DB_URL:", DB_URL);
  mongoose.connect(DB_URL, {
    // useNewUrlPareser: true,
    // useUnifiedTopology: true,
  });
}

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error"));

db.once("open", function () {
  console.log("DB connected");
});

module.exports = dbConnection;
