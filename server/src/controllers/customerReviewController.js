import { CustomerReview } from '../models/CustomerReview.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Get public published customer reviews sorted by displayOrder
export const getPublicReviews = asyncHandler(async (req, res) => {
  const reviews = await CustomerReview.find({ isPublished: true })
    .sort({ displayOrder: 1, createdAt: -1 })
    .lean();

  res.status(200).json({
    success: true,
    count: reviews.length,
    data: reviews,
  });
});
