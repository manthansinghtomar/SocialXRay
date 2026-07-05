/**
 * Async Error Handler Wrapper
 * 
 * Eliminates the need for repetitive try-catch blocks in route handlers.
 * Resolves the asynchronous function and forwards any caught error to the 
 * next express error handling middleware in the pipeline.
 * 
 * @param {Function} fn - Async middleware or route handler function
 * @returns {Function} Express middleware function
 */
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
