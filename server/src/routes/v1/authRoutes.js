import express from 'express';
import { body } from 'express-validator';
import { login, getMe } from '../../controllers/authController.js';
import { protect } from '../../middlewares/authMiddleware.js';
import { validate } from '../../middlewares/validate.js';
import { loginRateLimiter } from '../../middlewares/rateLimiter.js';

const router = express.Router();

const loginValidation = [
  body('email').trim().notEmpty().withMessage('Email or username is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

router.post('/login', loginRateLimiter, validate(loginValidation), login);
router.get('/me', protect, getMe);

export default router;
