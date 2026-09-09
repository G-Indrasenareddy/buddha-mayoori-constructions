import express from 'express';
import { body } from 'express-validator';
import { createEnquiry } from '../../controllers/enquiryController.js';
import { validate } from '../../middlewares/validate.js';
import { enquiryRateLimiter } from '../../middlewares/rateLimiter.js';

const router = express.Router();

const enquiryValidationRules = [
  body('type')
    .isIn(['CONTACT_INQUIRY', 'ESTIMATE_REQUEST'])
    .withMessage('Enquiry type must be CONTACT_INQUIRY or ESTIMATE_REQUEST'),
  body('fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Full name must be between 2 and 100 characters'),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[0-9+\s-]{10,15}$/)
    .withMessage('Please provide a valid phone number (10 to 15 digits)'),
  body('email')
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
];

router.post('/', enquiryRateLimiter, validate(enquiryValidationRules), createEnquiry);

export default router;
