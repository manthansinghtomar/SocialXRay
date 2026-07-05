/**
 * Authentication Middleware
 * 
 * Protects routes by validating JWT tokens passed in the Authorization header.
 * Attaches the authenticated user object to the request.
 */

const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const { ErrorResponse } = require("./errorHandler");
const User = require("../models/User");

/**
 * Middleware to protect routes: Requires valid JWT token in Authorization header.
 */
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check for Authorization header starting with Bearer
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        // Extract token: "Bearer <token>" -> "<token>"
        token = req.headers.authorization.split(" ")[1];
    }

    // Make sure token exists
    if (!token) {
        return next(
            new ErrorResponse("Not authorized to access this route. Missing token.", 401)
        );
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user from DB (excluding password) and attach to request
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return next(
                new ErrorResponse("Not authorized. User no longer exists.", 401)
            );
        }

        req.user = user;
        next();
    } catch (err) {
        return next(
            new ErrorResponse("Not authorized. Invalid or expired token.", 401)
        );
    }
});

/**
 * Middleware to authorize specific user roles.
 * @param {...string} roles - Permitted user roles
 */
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(
                new ErrorResponse(
                    `Role '${req.user ? req.user.role : "none"}' is not authorized to access this resource`,
                    403
                )
            );
        }
        next();
    };
};

module.exports = {
    protect,
    authorize
};