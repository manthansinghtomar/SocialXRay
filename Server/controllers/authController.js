/**
 * Authentication Controllers
 * 
 * Contains all business logic handlers for user authentication:
 * - Register User
 * - Login User
 * - Get Current Authenticated User Info (Get Me)
 */

const asyncHandler = require("../middleware/asyncHandler");
const { ErrorResponse } = require("../middleware/errorHandler");
const User = require("../models/User");

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
exports.registerUser = asyncHandler(async (req, res, next) => {
    const { fullName, email, password, role } = req.body;

    // Validate inputs
    if (!fullName || !email || !password) {
        return next(
            new ErrorResponse("Please provide full name, email, and password", 400)
        );
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return next(
            new ErrorResponse("User already exists with this email address", 400)
        );
    }

    // Create user in database (password will be hashed via Mongoose pre-save hook)
    const user = await User.create({
        fullName,
        email,
        password,
        role
    });

    // Generate token
    const token = user.getSignedJwtToken();

    res.status(201).json({
        success: true,
        token,
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt
        }
    });
});

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
        return next(
            new ErrorResponse("Please provide an email and password", 400)
        );
    }

    // Check for user (explicitly select password as it is hidden by default)
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(
            new ErrorResponse("Invalid email or password", 401)
        );
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return next(
            new ErrorResponse("Invalid email or password", 401)
        );
    }

    // Generate token
    const token = user.getSignedJwtToken();

    res.status(200).json({
        success: true,
        token,
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role
        }
    });
});

/**
 * @desc    Get current logged in user details
 * @route   GET /api/auth/me
 * @access  Private (Protected)
 */
exports.getMe = asyncHandler(async (req, res, next) => {
    // req.user has already been populated by the protect middleware
    res.status(200).json({
        success: true,
        user: req.user
    });
});
