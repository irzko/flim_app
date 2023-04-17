const express = require("express");
const router = express.Router();

const {
  booking,
  getTicketByUserId,
  deleteTicket,
} = require("../../controllers/booking.controller");

router.post("/", booking);
router.get("/:userId", getTicketByUserId);
router.delete("/:bookingId", deleteTicket);

module.exports = router;
