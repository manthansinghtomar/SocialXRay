/**
 * Dashboard Controllers
 * 
 * Aggregates statistics and metrics specifically for the authenticated user's records.
 * Uses high-performance MongoDB Aggregation pipelines.
 */

const mongoose = require("mongoose");
const asyncHandler = require("../middleware/asyncHandler");
const Analysis = require("../models/Analysis");

/**
 * @desc    Get dashboard overview statistics for the authenticated user
 * @route   GET /api/dashboard/overview
 * @access  Private (Protected)
 */
exports.getOverview = asyncHandler(async (req, res, next) => {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    // Single aggregation query running parallel sub-pipelines using $facet
    const stats = await Analysis.aggregate([
        { $match: { createdBy: userId } },
        {
            $facet: {
                basicStats: [
                    {
                        $group: {
                            _id: null,
                            totalAnalyses: { $sum: 1 },
                            averageEngagement: { $avg: "$engagementScore" },
                            averageVirality: { $avg: "$viralityScore" },
                            averageRecommendation: { $avg: "$recommendationScore" },
                            averageRisk: { $avg: "$riskScore" },
                            highestRecommendationScore: { $max: "$recommendationScore" },
                            lowestRecommendationScore: { $min: "$recommendationScore" },
                            highRiskPosts: {
                                $sum: { $cond: [{ $gte: ["$riskScore", 50] }, 1, 0] }
                            },
                            safePosts: {
                                $sum: { $cond: [{ $lt: ["$riskScore", 50] }, 1, 0] }
                            }
                        }
                    }
                ],
                platformStats: [
                    { $group: { _id: "$platform", count: { $sum: 1 } } },
                    { $sort: { count: -1 } },
                    { $limit: 1 }
                ],
                categoryStats: [
                    { $group: { _id: "$category", count: { $sum: 1 } } },
                    { $sort: { count: -1 } },
                    { $limit: 1 }
                ]
            }
        }
    ]);

    // Extract basic statistics and top-ranking attributes
    const basic = stats[0].basicStats[0] || {};
    const platform = stats[0].platformStats[0] || {};
    const category = stats[0].categoryStats[0] || {};

    res.status(200).json({
        success: true,
        data: {
            totalAnalyses: basic.totalAnalyses || 0,
            totalPostsAnalyzed: basic.totalAnalyses || 0,
            averageEngagement: basic.averageEngagement ? Math.round(basic.averageEngagement) : 0,
            averageVirality: basic.averageVirality ? Math.round(basic.averageVirality) : 0,
            averageRecommendation: basic.averageRecommendation ? Math.round(basic.averageRecommendation) : 0,
            averageRisk: basic.averageRisk ? Math.round(basic.averageRisk) : 0,
            highestRecommendationScore: basic.highestRecommendationScore || 0,
            lowestRecommendationScore: basic.lowestRecommendationScore || 0,
            highRiskPosts: basic.highRiskPosts || 0,
            safePosts: basic.safePosts || 0,
            mostUsedPlatform: platform._id || "N/A",
            mostAnalyzedCategory: category._id || "N/A"
        }
    });
});

/**
 * @desc    Get platform-wise analysis count for the authenticated user
 * @route   GET /api/dashboard/platform-stats
 * @access  Private (Protected)
 */
exports.getPlatformStats = asyncHandler(async (req, res, next) => {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const stats = await Analysis.aggregate([
        { $match: { createdBy: userId } },
        { $group: { _id: "$platform", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $project: { platform: "$_id", count: 1, _id: 0 } }
    ]);

    res.status(200).json({
        success: true,
        data: stats
    });
});

/**
 * @desc    Get category-wise analysis count for the authenticated user
 * @route   GET /api/dashboard/category-stats
 * @access  Private (Protected)
 */
exports.getCategoryStats = asyncHandler(async (req, res, next) => {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const stats = await Analysis.aggregate([
        { $match: { createdBy: userId } },
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $project: { category: "$_id", count: 1, _id: 0 } }
    ]);

    res.status(200).json({
        success: true,
        data: stats
    });
});

/**
 * @desc    Get sentiment distribution count for the authenticated user
 * @route   GET /api/dashboard/sentiment-stats
 * @access  Private (Protected)
 */
exports.getSentimentStats = asyncHandler(async (req, res, next) => {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const stats = await Analysis.aggregate([
        { $match: { createdBy: userId } },
        { $group: { _id: "$sentiment", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $project: { sentiment: "$_id", count: 1, _id: 0 } }
    ]);

    res.status(200).json({
        success: true,
        data: stats
    });
});

/**
 * @desc    Get latest 5 analyses created by the user, newest first
 * @route   GET /api/dashboard/recent
 * @access  Private (Protected)
 */
exports.getRecentAnalyses = asyncHandler(async (req, res, next) => {
    const recent = await Analysis.find({ createdBy: req.user.id })
        .sort({ createdAt: -1 })
        .limit(5);

    res.status(200).json({
        success: true,
        data: recent || []
    });
});
