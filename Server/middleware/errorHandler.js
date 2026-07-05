/**
 * Centralized Error Handling Middleware
 * 
 * Intercepts all operational and programming errors.
 * Formats them into a standardized JSON response and hides implementation/stack trace details in production.
 */

/**
 * Custom Error Class for API responses
 */
class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

/**
 * Express error handler middleware function
 */
const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Log the error stack for the developer in development mode
    if (process.env.NODE_ENV !== "production") {
        console.error(err.stack);
    }

    // 1. Mongoose Bad ObjectId (Cast Error)
    if (err.name === "CastError") {
        const message = `Resource not found with id of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    // 2. Mongoose Duplicate Key Error (MongoDB Code 11000)
    if (err.code === 11000) {
        const message = "Duplicate field value entered. Please use a unique value.";
        error = new ErrorResponse(message, 400);
    }

    // 3. Mongoose Validation Error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((val) => val.message).join(", ");
        error = new ErrorResponse(message, 400);
    }

    // 4. JSON Web Token Invalid Signature Error
    if (err.name === "JsonWebTokenError") {
        const message = "Not authorized to access this route. Invalid token.";
        error = new ErrorResponse(message, 401);
    }

    // 5. JSON Web Token Expired Error
    if (err.name === "TokenExpiredError") {
        const message = "Session expired. Please log in again.";
        error = new ErrorResponse(message, 401);
    }

    // Extract response status and message
    const statusCode = error.statusCode || 500;
    const responseMessage = error.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        error: responseMessage,
        // Include stack trace only in non-production environments
        stack: process.env.NODE_ENV === "production" ? undefined : err.stack
    });
};

module.exports = {
    errorHandler,
    ErrorResponse
};
