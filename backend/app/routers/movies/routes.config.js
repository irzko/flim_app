const express = require("express");
const router = express.Router();

const {
  getMovies,
  getMovieById,
  findMovieByName,
} = require("../../controllers/movie.controller");

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.get("/find/:title", findMovieByName);

module.exports = router;
