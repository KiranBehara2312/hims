// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err); // Optionally log the error
  const statusCode = err.statusCode || 500; // Default to 500 if no status code is set
  const message = err.message || "An internal server error occurred"; // Default error message

  res.status(statusCode).json({
    message: message,
    error: err.stack || err.message || err, // Optionally return stack trace for debugging (be cautious with production)
  });
};

module.exports = errorHandler;
