/**
 * Score Calculation Utilities
 * 
 * Reusable pure functions to calculate metrics for social media analysis.
 * All calculations are rounded to the nearest whole number and clamped strictly between 0 and 100.
 */

/**
 * Clamps a score between 0 and 100 and rounds to the nearest integer.
 * @param {number} value - The input score value
 * @returns {number} The rounded and clamped score (0 - 100)
 */
const clampScore = (value) => {
    if (typeof value !== "number" || isNaN(value)) return 0;
    return Math.min(100, Math.max(0, Math.round(value)));
};

/**
 * Calculates Engagement Score based on likes, comments, and shares, weighted against total views.
 * Formula: ((likes * 2) + (comments * 3) + (shares * 5)) / max(views, 1) * 100
 */
const calculateEngagementScore = (likes = 0, comments = 0, shares = 0, views = 0) => {
    const rawLikes = Number(likes) || 0;
    const rawComments = Number(comments) || 0;
    const rawShares = Number(shares) || 0;
    const rawViews = Number(views) || 0;

    const totalWeightedEngagements = (rawLikes * 2) + (rawComments * 3) + (rawShares * 5);
    const divisor = Math.max(rawViews, 1);
    
    const engagementScore = (totalWeightedEngagements / divisor) * 100;
    return clampScore(engagementScore);
};

/**
 * Calculates Virality Score based on the share volume and overall engagement.
 * Shares are a major leading indicator of virality.
 * Formula: (shares * 1.5) + (engagementScore * 0.4)
 */
const calculateViralityScore = (shares = 0, engagementScore = 0) => {
    const rawShares = Number(shares) || 0;
    const rawEngagement = Number(engagementScore) || 0;

    // Direct shares scale the score, supported by the engagement rate
    const viralityScore = (rawShares * 1.5) + (rawEngagement * 0.4);
    return clampScore(viralityScore);
};

/**
 * Calculates Recommendation Score, representing how likely the algorithm is to push the content.
 * Derived from high engagement and high virality.
 * Formula: (engagementScore * 0.6) + (viralityScore * 0.4)
 */
const calculateRecommendationScore = (engagementScore = 0, viralityScore = 0) => {
    const rawEngagement = Number(engagementScore) || 0;
    const rawVirality = Number(viralityScore) || 0;

    const recommendationScore = (rawEngagement * 0.6) + (rawVirality * 0.4);
    return clampScore(recommendationScore);
};

/**
 * Calculates Risk Score (e.g. content policy flag risk, clickbait index).
 * Performs a simple keyword check for demo/hackathon purposes.
 * Returns a base score of 10 (low risk) which increases if risky keywords are present.
 */
const calculateRiskScore = (postText = "") => {
    if (typeof postText !== "string") return 10;

    const textLower = postText.toLowerCase();
    
    // High-risk keywords for algorithm filtering (spam, clickbait, policy violations)
    const riskKeywords = [
        "scam", "cheat", "giveaway", "free money", "hack", "click here", 
        "subscribe now", "buy this", "win cash", "guaranteed", "fake"
    ];

    let penalty = 0;
    riskKeywords.forEach((word) => {
        if (textLower.includes(word)) {
            penalty += 15; // 15 points per matching keyword
        }
    });

    const baseRisk = 10; // Baseline low risk
    return clampScore(baseRisk + penalty);
};

module.exports = {
    calculateEngagementScore,
    calculateViralityScore,
    calculateRecommendationScore,
    calculateRiskScore
};
