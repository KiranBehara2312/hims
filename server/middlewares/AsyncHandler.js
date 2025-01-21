const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next); // Wraps the async function and forwards any errors to the next middleware
};

module.exports = asyncHandler;
