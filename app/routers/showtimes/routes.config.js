const express = require("express");
const router = express.Router();
const { getShowtimes } = require("../../controllers/showtime.controller");

router.post("/", getShowtimes);

module.exports = router;
