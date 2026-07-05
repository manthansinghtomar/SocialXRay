/**
 * Analysis Controllers
 * 
 * Contains HTTP endpoint handlers for post analysis workflows:
 * - Analyze Post (calculates scores and saves document)
 * - Get Analysis History (paginated/sorted for the logged-in user)
 * - Get Single Analysis (by ID, verified ownership)
 * - Delete Analysis (by ID, verified ownership)
 */

const asyncHandler = require("../middleware/asyncHandler");
const { ErrorResponse } = require("../middleware/errorHandler");
const Analysis = require("../models/Analysis");
const {
    calculateEngagementScore,
    calculateViralityScore,
    calculateRecommendationScore,
    calculateRiskScore
} = require("../utils/calculateScore");
const { analyzePostContent } = require("../utils/aiAnalyzer");

/**
 * @desc    Analyze a social media post and save result
 * @route   POST /api/analysis/analyze
 * @access  Private (Protected)
 */
exports.analyzePost = asyncHandler(async (req, res, next) => {
    const { platform, postText, likes, comments, shares, views, category } = req.body;

    // 1. Validate required fields
    if (!platform || !postText) {
        return next(
            new ErrorResponse("Please provide both platform and postText fields", 400)
        );
    }

    // Convert inputs to numbers or fallback to defaults
    const numLikes = Number(likes) || 0;
    const numComments = Number(comments) || 0;
    const numShares = Number(shares) || 0;
    const numViews = Number(views) || 0;

    // 2. Calculate scores using rule-based scoring utilities
    const engagementScore = calculateEngagementScore(numLikes, numComments, numShares, numViews);
    const viralityScore = calculateViralityScore(numShares, engagementScore);
    const recommendationScore = calculateRecommendationScore(engagementScore, viralityScore);
    const riskScore = calculateRiskScore(postText);

    // 2.5 Call the AI Content Analyzer
    const aiAnalysis = await analyzePostContent(postText, {
        engagementScore,
        viralityScore,
        recommendationScore,
        riskScore
    });

    // 3. Create the analysis entry in database
    const analysis = await Analysis.create({
        platform,
        postText,
        likes: numLikes,
        comments: numComments,
        shares: numShares,
        views: numViews,
        category: aiAnalysis.category || category || "General",
        sentiment: aiAnalysis.sentiment || "Pending",
        engagementScore,
        viralityScore,
        recommendationScore,
        riskScore,
        recommendationReason: aiAnalysis.recommendationReason,
        aiSummary: aiAnalysis.aiSummary,
        riskExplanation: aiAnalysis.riskExplanation,
        detectedKeywords: aiAnalysis.detectedKeywords,
        analysisSource: aiAnalysis.analysisSource,
        createdBy: req.user.id
    });

    res.status(201).json({
        success: true,
        data: analysis
    });
});

/**
 * @desc    Get all analyses created by the logged-in user (newest first)
 * @route   GET /api/analysis/history
 * @access  Private (Protected)
 */
exports.getAnalysisHistory = asyncHandler(async (req, res, next) => {
    const history = await Analysis.find({ createdBy: req.user.id })
        .sort({ createdAt: -1 }); // Sort newest first

    res.status(200).json({
        success: true,
        count: history.length,
        data: history
    });
});

/**
 * @desc    Get a single analysis by ID (only if owned by the logged-in user)
 * @route   GET /api/analysis/:id
 * @access  Private (Protected)
 */
exports.getAnalysisById = asyncHandler(async (req, res, next) => {
    const analysis = await Analysis.findById(req.targetId || req.params.id);

    if (!analysis) {
        return next(
            new ErrorResponse(`Analysis not found with id of ${req.params.id}`, 404)
        );
    }

    // Verify ownership
    if (analysis.createdBy.toString() !== req.user.id) {
        return next(
            new ErrorResponse("Not authorized to access this analysis record", 403)
        );
    }

    res.status(200).json({
        success: true,
        data: analysis
    });
});

/**
 * @desc    Delete a single analysis by ID (only if owned by the logged-in user)
 * @route   DELETE /api/analysis/:id
 * @access  Private (Protected)
 */
exports.deleteAnalysis = asyncHandler(async (req, res, next) => {
    const analysis = await Analysis.findById(req.params.id);

    if (!analysis) {
        return next(
            new ErrorResponse(`Analysis not found with id of ${req.params.id}`, 404)
        );
    }

    // Verify ownership
    if (analysis.createdBy.toString() !== req.user.id) {
        return next(
            new ErrorResponse("Not authorized to delete this analysis record", 403)
        );
    }

    // Delete document using Mongoose deletion method
    await Analysis.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Analysis record deleted successfully"
    });
});
