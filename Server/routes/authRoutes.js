/**
 * Authentication Routes
 * 
 * Maps authentication URLs to their respective controller handlers.
 * Utilizes protection middlewares to secure sensitive endpoints.
 */

const express = require("express");
const router = express.Router();

// Import controllers
const { registerUser, loginUser, getMe } = require("../controllers/authController");

// Import token verification middleware
const { protect } = require("../middleware/auth");

// Public endpoints
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected endpoints
router.get("/me", protect, getMe);

module.exports = router;
