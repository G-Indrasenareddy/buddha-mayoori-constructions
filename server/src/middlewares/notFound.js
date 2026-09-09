import { AppError } from '../utils/AppError.js';

export const notFound = (req, res, next) => {
  next(new AppError(`Resource not found - ${req.originalUrl}`, 404));
};
