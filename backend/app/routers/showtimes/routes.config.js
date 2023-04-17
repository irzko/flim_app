const express = require("express");
const router = express.Router();
const {
  getShowtimes,
  getFullShowtimes,
} = require("../../controllers/showtime.controller");

router.post("/", getShowtimes);
router.post("/full", getFullShowtimes);

module.exports = router;
