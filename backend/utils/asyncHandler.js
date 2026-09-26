/**
 * Wraps async route handlers.
 * Any thrown error or rejected promise is forwarded to Express error middleware.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;