const express = require("express");
const router = express.Router();
const {
  getUserById,
  createUser,
  updateUserById,
  getIdByUsername,
  login,
} = require("../../controllers/user.controller");

router.post("/register", createUser);
router.get("/:id", [getUserById]);
router.post("/update", [updateUserById]);
router.post("/login", [login]);
router.get("/id/:username", [getIdByUsername]);

module.exports = router;
