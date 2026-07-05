/**
 * Database Connection Utility
 * Configures and establishes connection to MongoDB using Mongoose.
 */

const mongoose = require("mongoose");

/**
 * Establishes connection to MongoDB and sets up listeners for connection lifecycle events.
 */
const connectDB = async () => {
    try {
        const mongoUrl = process.env.MONGO_URL;
        
        if (!mongoUrl) {
            console.error("ERROR: MONGO_URL environment variable is not defined.");
            process.exit(1);
        }

        // Establish the Mongoose connection
        const conn = await mongoose.connect(mongoUrl);

        console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);

        // Handle connection events for operational resilience
        mongoose.connection.on("error", (err) => {
            console.error(`MongoDB connection error: ${err}`);
        });

        mongoose.connection.on("disconnected", () => {
            console.warn("MongoDB connection disconnected. Attempting to reconnect...");
        });

        // Graceful termination handling
        process.on("SIGINT", async () => {
            await mongoose.connection.close();
            console.log("MongoDB connection closed through app termination.");
            process.exit(0);
        });

    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        // Exit process with failure in production/startup
        process.exit(1);
    }
};

module.exports = connectDB;