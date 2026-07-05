/**
 * Analysis Model Schema
 * 
 * Defines the structure for storing social media post analysis results.
 * Includes score metrics, post details, platform/category enums, and references to the User who created it.
 */

const mongoose = require("mongoose");

const AnalysisSchema = new mongoose.Schema(
    {
        platform: {
            type: String,
            required: [true, "Platform is required"],
            enum: {
                values: [
                    "Instagram",
                    "Facebook",
                    "YouTube",
                    "X",
                    "LinkedIn",
                    "TikTok",
                    "Reddit",
                    "Other"
                ],
                message: "{VALUE} is not a supported social media platform"
            }
        },
        postText: {
            type: String,
            required: [true, "Post text content is required"],
            trim: true
        },
        likes: {
            type: Number,
            default: 0,
            min: [0, "Likes cannot be negative"]
        },
        comments: {
            type: Number,
            default: 0,
            min: [0, "Comments cannot be negative"]
        },
        shares: {
            type: Number,
            default: 0,
            min: [0, "Shares cannot be negative"]
        },
        views: {
            type: Number,
            default: 0,
            min: [0, "Views cannot be negative"]
        },
        category: {
            type: String,
            enum: {
                values: [
                    "News",
                    "Entertainment",
                    "Sports",
                    "Politics",
                    "Education",
                    "Technology",
                    "Business",
                    "Health",
                    "General"
                ],
                message: "{VALUE} is not a supported category"
            },
            default: "General"
        },
        sentiment: {
            type: String,
            default: "Pending" // Will be populated in a later stage (e.g. "Positive", "Neutral", "Negative")
        },
        engagementScore: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },
        viralityScore: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },
        recommendationScore: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },
        riskScore: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },
        recommendationReason: {
            type: String
        },
        aiSummary: {
            type: String
        },
        riskExplanation: {
            type: String
        },
        detectedKeywords: {
            type: [String],
            default: []
        },
        analysisSource: {
            type: String,
            required: [true, "Analysis source is required"],
            enum: ["Gemini AI", "Rule-Based AI"]
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Analysis must be associated with a user"]
        }
    },
    {
        timestamps: true // Adds createdAt and updatedAt
    }
);

module.exports = mongoose.model("Analysis", AnalysisSchema);
