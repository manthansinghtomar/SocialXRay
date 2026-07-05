/**
 * User Model Schema
 * Defines the User entity structure, mongoose validation rules, pre-save hooks for password hashing,
 * and helper instance methods.
 */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, "Full name is required"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "Email address is required"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email address"
            ]
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters long"],
            select: false // Do not return password by default in queries
        },
        role: {
            type: String,
            enum: {
                values: ["user", "admin"],
                message: "Role must be either user or admin"
            },
            default: "user"
        }
    },
    {
        timestamps: true // Automatically adds createdAt and updatedAt fields
    }
);

/**
 * Pre-save middleware hook: Hashes the user password using bcrypt before saving.
 * Only hashes the password if it has been modified or is new.
 */
UserSchema.pre("save", async function() {
    if (!this.isModified("password")) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

/**
 * Instance Method: Compares a plaintext password with the user's hashed password.
 * @param {string} enteredPassword - plaintext password to verify
 * @returns {Promise<boolean>} Match result
 */
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

/**
 * Instance Method: Generates a JWT signature for the user instance.
 * Expiry is configured for 7 days as requested.
 * @returns {string} Signed JWT Token string
 */
UserSchema.methods.getSignedJwtToken = function() {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is missing from the environment configuration");
    }
    return jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

module.exports = mongoose.model("User", UserSchema);
