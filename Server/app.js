/**
 * SocialXRay – AI Powered Social Media Algorithm Analysis & Transparency Platform
 * Backend Server Entry Point (app.js)
 * 
 * Configures Express application, security headers, middlewares, database connections,
 * and centralized error handling.
 */

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

// Load Environment Variables from .env file
dotenv.config();

// Import DB connection config & custom middleware
const connectDB = require("./config/connectDB");
const { errorHandler, ErrorResponse } = require("./middleware/errorHandler");
const webRouter = require("./routes/web");
const authRouter = require("./routes/authRoutes");
const analysisRouter = require("./routes/analysisRoutes");
const dashboardRouter = require("./routes/dashboardRoutes");

// Initialize the Express application
const app = express();

// Connect to MongoDB Database
connectDB();

// ==========================================
// MIDDLEWARE CONFIGURATION
// ==========================================

// 1. Security Headers: Help secure Express apps by setting various HTTP headers
app.use(helmet());

// 2. CORS: Enable Cross-Origin Resource Sharing with credentials support for frontend client
const allowedOrigins = [
    "http://localhost:5173",
    "https://socialxray.netlify.app"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

// 3. Logger: Morgan HTTP request logger (enabled only in development environment)
if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
    app.use(morgan("dev"));
    console.log("Morgan HTTP request logging enabled in development mode");
}

// 4. Body Parsers: Parse incoming request bodies in middleware before handlers
app.use(express.json()); // Parses application/json
app.use(express.urlencoded({ extended: true })); // Parses application/x-www-form-urlencoded

// 5. Cookie Parser: Parse Cookie header and populate req.cookies
app.use(cookieParser());

// ==========================================
// ROUTE DEFINITIONS
// ==========================================

// Base Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "SocialXRay API backend is operational",
        timestamp: new Date()
    });
});

// API Routing
app.use("/api", webRouter);
app.use("/api/auth", authRouter);
app.use("/api/analysis", analysisRouter);
app.use("/api/dashboard", dashboardRouter);

// ==========================================
// ERROR HANDLING
// ==========================================

// Catch-all: Route not found (404) fallback middleware
app.use((req, res, next) => {
    next(new ErrorResponse(`The requested resource could not be found: ${req.originalUrl}`, 404));
});

// Centralized error handling middleware (must be attached last)
app.use(errorHandler);

// ==========================================
// START SERVER
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
});