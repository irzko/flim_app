const express = require("express");
const router = express.Router();
const {
  getSeats,
  getSeatsByBookingId,
} = require("../../controllers/seats.controller");

router.get("/:theatreId", getSeats);
router.get("/booking/:bookingId", getSeatsByBookingId);

module.exports = router;
