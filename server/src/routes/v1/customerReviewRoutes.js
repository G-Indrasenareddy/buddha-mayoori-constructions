import express from 'express';
import { getPublicReviews } from '../../controllers/customerReviewController.js';

const router = express.Router();

router.get('/', getPublicReviews);

export default router;
