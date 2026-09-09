import { validationResult } from 'express-validator';
import { AppError } from '../utils/AppError.js';

export const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const details = errors.array().map((err) => ({
      field: err.path || err.param,
      message: err.msg,
    }));

    const error = new AppError('Validation Error', 400);
    error.details = details;
    return next(error);
  };
};
