const express = require("express");
const router = express.Router();

router.use("/users", require("./users/routes.config"));
router.use("/movies", require("./movies/routes.config"));
router.use("/theatres", require("./theatres/routes.config"));

module.exports = router;
