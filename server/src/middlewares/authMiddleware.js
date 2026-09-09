import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Unauthenticated. Access token is required.', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'buddha_mayoori_secure_jwt_secret_key_2026');
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new AppError('Unauthenticated. The user belonging to this token no longer exists.', 401));
    }

    if (!user.isActive) {
      return next(new AppError('Account disabled. Please contact system administrator.', 401));
    }

    req.user = user;
    next();
  } catch (err) {
    return next(new AppError('Unauthenticated. Invalid or expired token.', 401));
  }
});
