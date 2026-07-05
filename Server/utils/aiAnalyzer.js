/**
 * AI Content Analysis Engine
 * 
 * Modular analysis utility that analyzes text content using either Gemini AI REST API
 * or a local rule-based keyword mapping fallback if the API is offline/not configured.
 */

/**
 * Safe JSON parser that cleans up markdown code blocks or extra text enclosing the JSON
 * @param {string} text - Raw model response
 * @returns {object} Parsed JSON object
 */
const safeJsonParse = (text) => {
    let cleanText = text.trim();
    
    // Check if the text starts with markdown code block formatting
    if (cleanText.startsWith("```")) {
        const matchStart = cleanText.match(/^```(?:json)?\s*/i);
        if (matchStart) {
            cleanText = cleanText.slice(matchStart[0].length);
        }
        
        // Remove trailing ```
        if (cleanText.endsWith("```")) {
            cleanText = cleanText.slice(0, -3).trim();
        }
    }
    
    // Try to parse cleanText
    try {
        return JSON.parse(cleanText);
    } catch (e) {
        // If it still fails, try to extract first '{' and last '}'
        const firstBrace = cleanText.indexOf('{');
        const lastBrace = cleanText.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
            const possibleJson = cleanText.substring(firstBrace, lastBrace + 1);
            try {
                return JSON.parse(possibleJson);
            } catch (innerError) {
                throw new Error(`JSON parsing failed: ${e.message}. Extract attempt failed: ${innerError.message}. CleanText: ${cleanText}`);
            }
        }
        throw new Error(`JSON parsing failed: ${e.message}. CleanText: ${cleanText}`);
    }
};

/**
 * Local Rule-Based Analyzer (Fallback Engine)
 * Runs completely locally with zero internet dependencies.
 * 
 * @param {string} postText - Social media post content text
 * @param {object} scores - Pre-calculated scores for context
 * @returns {object} Structured analysis results matching the AI schema
 */
const localRuleBasedAnalyzer = (postText, scores) => {
    const textLower = postText.toLowerCase();

    // 1. Sentiment analysis based on keyword matching
    let sentiment = "Neutral";
    const positiveWords = ["love", "great", "awesome", "good", "amazing", "beautiful", "happy", "best", "excellent", "success", "innovative"];
    const negativeWords = ["hate", "bad", "worst", "terrible", "scam", "cheat", "danger", "fake", "fail", "poor", "risk", "hate", "angry"];
    
    let posCount = 0;
    let negCount = 0;
    positiveWords.forEach((word) => { if (textLower.includes(word)) posCount++; });
    negativeWords.forEach((word) => { if (textLower.includes(word)) negCount++; });

    if (posCount > negCount) {
        sentiment = "Positive";
    } else if (negCount > posCount) {
        sentiment = "Negative";
    }

    // 2. Category classification based on keyword matching
    let category = "General";
    const categoryKeywords = {
        News: ["news", "headline", "breaking", "report", "update", "announce", "newspaper"],
        Entertainment: ["movie", "song", "music", "joke", "funny", "show", "game", "gaming", "celebrity", "fun"],
        Sports: ["sports", "game", "match", "win", "player", "cricket", "football", "fitness", "athletics"],
        Politics: ["politics", "election", "vote", "government", "policy", "minister", "senate", "debate"],
        Education: ["learn", "teach", "school", "course", "study", "class", "tutorial", "science", "math", "history"],
        Technology: ["tech", "ai", "coding", "software", "code", "app", "developer", "computer", "gadget", "mern", "web"],
        Business: ["business", "startup", "finance", "money", "invest", "stock", "market", "revenue", "sales"],
        Health: ["health", "diet", "doctor", "workout", "disease", "mental", "fit", "medical", "wellness"]
    };

    for (const [cat, words] of Object.entries(categoryKeywords)) {
        if (words.some((word) => textLower.includes(word))) {
            category = cat;
            break;
        }
    }

    // 3. Recommendation potential reasoning
    let recommendationReason = "";
    const recScore = scores.recommendationScore || 0;
    if (recScore >= 70) {
        recommendationReason = `Excellent virality potential. Strong initial engagement patterns (virality score: ${scores.viralityScore}) will signal platform recommendation algorithms to push this content to explore feeds.`;
    } else if (recScore >= 40) {
        recommendationReason = `Average distribution outlook. Moderate comments and likes ratios suggest this post will perform well among active followers but have limited exploration feed reach.`;
    } else {
        recommendationReason = `Low recommendation likelihood. Low initial viewer engagement signals algorithms to limit feed propagation, reducing recommendation visibility.`;
    }

    // 4. Summary generation
    const words = postText.split(/\s+/);
    const excerpt = words.slice(0, 10).join(" ") + (words.length > 10 ? "..." : "");
    const aiSummary = `Post classified under ${category} discussing social media content. Summary: "${excerpt}"`;

    // 5. Keyword extraction
    const cleanWords = words
        .map((w) => w.replace(/[^a-zA-Z]/g, "")) // keep only alphabets
        .filter((w) => w.length > 4); // filter short words
    const detectedKeywords = [...new Set(cleanWords)].slice(0, 5); // take up to 5 unique words

    // 6. Risk explanation
    let riskExplanation = "";
    const rScore = scores.riskScore || 10;
    if (rScore >= 50) {
        riskExplanation = `High risk level (${rScore}/100). Post contains flagged promotional keywords (e.g. clickbait or scam warning indicators) which are heavily filtered by platform policies.`;
    } else if (rScore >= 20) {
        riskExplanation = `Moderate risk level (${rScore}/100). Content utilizes heavy marketing call-to-actions, posing a mild threat of algorithm downranking.`;
    } else {
        riskExplanation = `Low risk level (${rScore}/100). Post complies with search standards and does not trigger any standard policy or clickbait flags.`;
    }

    // 7. Sourcing new metrics
    const transparencyScore = Math.max(0, 105 - rScore);
    const reachPrediction = recScore >= 70 ? "High" : (recScore >= 40 ? "Medium" : "Low");

    const contentStrengths = [
        "Clear vocabulary selection and contextual structure.",
        "Strong formatting style consistent with category themes.",
        "Solid alignment with standard community distribution metrics."
    ];

    const contentWeaknesses = [
        "Limited explicit call-to-action indicators in content body.",
        "Minimal visual anchor cues or contextual tags.",
        "Potential vulnerability to algorithm propagation filters."
    ];

    const improvementSuggestions = [
        "Add 1-2 platform specific search hashtags.",
        "Include a direct question to prompt user discussion.",
        "Integrate dynamic interaction hooks (e.g. comment callout)."
    ];

    return {
        sentiment,
        category,
        recommendationReason,
        aiSummary,
        detectedKeywords: detectedKeywords.length > 0 ? detectedKeywords : ["General"],
        riskExplanation,
        transparencyScore,
        reachPrediction,
        contentStrengths,
        contentWeaknesses,
        improvementSuggestions,
        analysisSource: "Rule-Based AI"
    };
};

/**
 * Gemini AI Analyzer Adapter
 * Calls Google Gemini REST API.
 * 
 * @param {string} postText - Text to analyze
 * @param {object} scores - Pre-calculated scores
 * @returns {Promise<object>} Structured analysis results
 */
const geminiAnalyzerAdapter = async (postText, scores) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("Missing GEMINI_API_KEY in environment configuration.");
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const prompt = `
You are a social media algorithm auditing consultant. Analyze the following post content text and evaluate its metrics.
Output a JSON response that complies EXACTLY with the schema below. Do not include markdown formatting or tags like \`\`\`json in the response. Return raw JSON text only.

Required Schema:
{
  "sentiment": "Positive" | "Negative" | "Neutral",
  "category": "News" | "Entertainment" | "Sports" | "Politics" | "Education" | "Technology" | "Business" | "Health" | "General",
  "recommendationReason": "string (1-2 sentences explaining recommendation potential based on recommendationScore: ${scores.recommendationScore} and viralityScore: ${scores.viralityScore})",
  "aiSummary": "string (1 sentence summary of the post)",
  "detectedKeywords": ["string", "string", ... (3 to 5 key terms extracted from the text)],
  "riskExplanation": "string (1 sentence explaining why this post received a riskScore of ${scores.riskScore} out of 100)",
  "transparencyScore": number (0 to 100 based on content clarity and lack of hidden manipulation or clickbait),
  "reachPrediction": "Low" | "Medium" | "High",
  "contentStrengths": ["string", "string", "string" (exactly 3 bullet points highlighting positive aspects)],
  "contentWeaknesses": ["string", "string", "string" (exactly 3 bullet points highlighting areas of improvement or policy risks)],
  "improvementSuggestions": ["string", "string", "string" (exactly 3 actionable recommendations to improve performance)]
}

Post Content to Analyze:
"${postText}"
`;

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{
                parts: [{ text: prompt }]
            }],
            generationConfig: {
                responseMimeType: "application/json"
            }
        })
    });

    if (!response.ok) {
        throw new Error(`API responded with status code: ${response.status}`);
    }

    const json = await response.json();
    
    // Log the complete Gemini API response before parsing
    console.log("[AI Analyzer] Raw Gemini API Response JSON:", JSON.stringify(json, null, 2));

    const responseText = json.candidates[0].content.parts[0].text;
    console.log("[AI Analyzer] Raw responseText extracted:", responseText);

    const parsed = safeJsonParse(responseText);
    console.log("[AI Analyzer] Parsed JSON Successfully:", JSON.stringify(parsed, null, 2));

    return {
        sentiment: parsed.sentiment || "Neutral",
        category: parsed.category || "General",
        recommendationReason: parsed.recommendationReason || "Standard feed distribution expected.",
        aiSummary: parsed.aiSummary || postText.slice(0, 100),
        detectedKeywords: Array.isArray(parsed.detectedKeywords) ? parsed.detectedKeywords : ["General"],
        riskExplanation: parsed.riskExplanation || "Evaluated content parameters for compliance.",
        transparencyScore: typeof parsed.transparencyScore === 'number' ? parsed.transparencyScore : 75,
        reachPrediction: ["Low", "Medium", "High"].includes(parsed.reachPrediction) ? parsed.reachPrediction : "Medium",
        contentStrengths: Array.isArray(parsed.contentStrengths) && parsed.contentStrengths.length === 3 ? parsed.contentStrengths : ["Clear theme alignment", "Direct audience messaging", "Natural vocabulary flow"],
        contentWeaknesses: Array.isArray(parsed.contentWeaknesses) && parsed.contentWeaknesses.length === 3 ? parsed.contentWeaknesses : ["Limited engagement hooks", "Minimal keyword depth", "Unoptimized hashtags placement"],
        improvementSuggestions: Array.isArray(parsed.improvementSuggestions) && parsed.improvementSuggestions.length === 3 ? parsed.improvementSuggestions : ["Include a direct question", "Add context-appropriate tags", "Enhance emotional vocabulary cues"],
        analysisSource: "Gemini AI"
    };
};

/**
 * Orchestrator: Runs Gemini analysis if configured, silently falling back to the 
 * rule-based local analyzer if the API fails or is not configured.
 * 
 * @param {string} postText - The text content to analyze
 * @param {object} scores - Calculated metrics
 * @returns {Promise<object>} Unified analysis output
 */
const analyzePostContent = async (postText, scores) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.warn("[AI Analyzer] Warning: GEMINI_API_KEY is missing in environment. Automatically falling back to local Rule-Based AI.");
        const fallbackResult = localRuleBasedAnalyzer(postText, scores);
        console.log(`[AI Analyzer] Analysis source used: ${fallbackResult.analysisSource}`);
        return fallbackResult;
    }

    // Attempt with retry-once policy
    let attempts = 0;
    while (attempts < 2) {
        try {
            attempts++;
            const result = await geminiAnalyzerAdapter(postText, scores);
            console.log(`[AI Analyzer] Analysis source used: ${result.analysisSource} (Attempt ${attempts} successful)`);
            return result;
        } catch (error) {
            console.warn(`[AI Analyzer] Gemini API failed on attempt ${attempts}. Error Details: ${error.stack || error.message}`);
            if (attempts === 1) {
                console.log("[AI Analyzer] Retrying Gemini API call once...");
            }
        }
    }

    console.warn("[AI Analyzer] Gemini API calls failed after retry. Automatically falling back to local Rule-Based AI.");
    const fallbackResult = localRuleBasedAnalyzer(postText, scores);
    console.log(`[AI Analyzer] Analysis source used: ${fallbackResult.analysisSource}`);
    return fallbackResult;
};

module.exports = {
    analyzePostContent
};
