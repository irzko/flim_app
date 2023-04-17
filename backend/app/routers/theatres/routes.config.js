const express = require("express");
const router = express.Router();
const {
  getTheatres,
  getTheatreById,
  getTheatreByDate,
} = require("../../controllers/theatre.controller");

router.get("/", getTheatres);
router.get("/:id", getTheatreById);
router.post("/get/", getTheatreByDate);

module.exports = router;
