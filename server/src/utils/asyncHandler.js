// Wrapper for Express Async Route Handlers to forward errors to central error middleware
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
