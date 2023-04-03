const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/v1", require("./app/routers"));

module.exports = app;
