/**
 * Analysis Routes
 * 
 * Maps Social Media Analysis engine URLs to their controller handlers.
 * All analysis routes are private and protected with the JWT protect middleware.
 */

const express = require("express");
const router = express.Router();

// Import controllers
const {
    analyzePost,
    getAnalysisHistory,
    getAnalysisById,
    deleteAnalysis
} = require("../controllers/analysisController");

// Import authentication protection middleware
const { protect } = require("../middleware/auth");

// Apply protection to all routes in this router
router.use(protect);

// Routing paths
router.post("/analyze", analyzePost);
router.get("/history", getAnalysisHistory);
router.get("/:id", getAnalysisById);
router.delete("/:id", deleteAnalysis);

module.exports = router;
