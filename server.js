const mongoose = require("mongoose");
const express = require("express");
const db = require("./configs/config").db;

const app = express();
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

  app.listen(5000, ()=> console.log("Server Started..."))