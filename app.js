const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
require("dotenv").config();

app.use(cors());
app.use(express.json());
// app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static("public"));
app.use("/api/v1", require("./app/routers"));

module.exports = app;
