const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");

const router = express.Router();

// Route to user registration
router.post("/register", registerUser);

// Route to user login
router.post("/login", loginUser);

module.exports = router;