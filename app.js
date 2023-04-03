const express = require("express");
const cors = require("cors");
const app = express();
const connection = require("./app/utils/mysql.util");

app.use(cors());
app.use(express.json());

module.exports = app;
