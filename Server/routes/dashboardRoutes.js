/**
 * Dashboard Routes
 * 
 * Maps dashboard analytics endpoints to their controllers.
 * Scopes all endpoints under the auth protection middleware.
 */

const express = require("express");
const router = express.Router();

// Import controllers
const {
    getOverview,
    getPlatformStats,
    getCategoryStats,
    getSentimentStats,
    getRecentAnalyses
} = require("../controllers/dashboardController");

// Import authentication protection middleware
const { protect } = require("../middleware/auth");

// Secure all endpoints below this middleware call
router.use(protect);

// Routing paths
router.get("/overview", getOverview);
router.get("/platform-stats", getPlatformStats);
router.get("/category-stats", getCategoryStats);
router.get("/sentiment-stats", getSentimentStats);
router.get("/recent", getRecentAnalyses);

module.exports = router;
