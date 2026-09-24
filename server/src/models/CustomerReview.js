import mongoose from 'mongoose';

const customerReviewSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Customer location is required'],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, 'Star rating is required'],
      min: [1, 'Rating must be at least 1 star'],
      max: [5, 'Rating cannot exceed 5 stars'],
      default: 5,
    },
    reviewText: {
      type: String,
      required: [true, 'Review text is required'],
      maxlength: [1000, 'Review text cannot exceed 1000 characters'],
      trim: true,
    },
    customerPhoto: {
      publicId: { type: String, default: '' },
      url: { type: String, default: '' },
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

customerReviewSchema.index({ isPublished: -1, displayOrder: 1, createdAt: -1 });

export const CustomerReview = mongoose.model('CustomerReview', customerReviewSchema);
