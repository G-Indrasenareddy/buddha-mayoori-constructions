import { CustomerReview } from '../models/CustomerReview.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import cloudinary from '../config/cloudinary.js';

// Stream file upload buffer to Cloudinary
const processPhotoUpload = async (file, folder = 'bmc_reviews') => {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error('Cloudinary environment configuration is missing.');
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          publicId: result.public_id,
          url: result.secure_url,
        });
      }
    );
    uploadStream.end(file.buffer);
  });
};

// Upload customer photo to Cloudinary
export const uploadReviewPhoto = asyncHandler(async (req, res, next) => {
  const file = req.file || (req.files && req.files[0]);
  if (!file) {
    return next(new AppError('Please select a customer photo file to upload.', 400));
  }

  try {
    const uploadedMedia = await processPhotoUpload(file, 'bmc_reviews');
    res.status(200).json({
      success: true,
      data: uploadedMedia,
    });
  } catch (err) {
    return next(new AppError(`Customer photo upload failed: ${err.message}`, 502));
  }
});

// Get all reviews for admin
export const getAdminReviews = asyncHandler(async (req, res) => {
  const reviews = await CustomerReview.find().sort({ displayOrder: 1, createdAt: -1 }).lean();
  res.status(200).json({
    success: true,
    count: reviews.length,
    data: reviews,
  });
});

// Create customer review
export const createCustomerReview = asyncHandler(async (req, res, next) => {
  const { customerName, location, rating, reviewText, customerPhoto, isPublished, displayOrder } = req.body;

  if (!customerName || !location || !reviewText) {
    return next(new AppError('customerName, location, and reviewText are required.', 400));
  }

  const review = await CustomerReview.create({
    customerName,
    location,
    rating: rating ? Number(rating) : 5,
    reviewText,
    customerPhoto: typeof customerPhoto === 'string' ? { publicId: '', url: customerPhoto } : customerPhoto || { publicId: '', url: '' },
    isPublished: isPublished !== undefined ? isPublished : true,
    displayOrder: displayOrder || 0,
  });

  res.status(201).json({
    success: true,
    data: review,
  });
});

// Update customer review
export const updateCustomerReview = asyncHandler(async (req, res, next) => {
  let review = await CustomerReview.findById(req.params.id);

  if (!review) {
    return next(new AppError(`Customer review not found with id: ${req.params.id}`, 404));
  }

  if (typeof req.body.customerPhoto === 'string') {
    req.body.customerPhoto = { publicId: '', url: req.body.customerPhoto };
  }

  if (req.body.rating) {
    req.body.rating = Number(req.body.rating);
  }

  review = await CustomerReview.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: review,
  });
});

// Delete customer review (and cleanup Cloudinary asset if publicId exists)
export const deleteCustomerReview = asyncHandler(async (req, res, next) => {
  const review = await CustomerReview.findById(req.params.id);

  if (!review) {
    return next(new AppError(`Customer review not found with id: ${req.params.id}`, 404));
  }

  const publicIdToDestroy = review.customerPhoto?.publicId;

  await review.deleteOne();

  if (publicIdToDestroy && process.env.CLOUDINARY_CLOUD_NAME) {
    try {
      await cloudinary.uploader.destroy(publicIdToDestroy);
    } catch (err) {
      console.warn(`Failed to destroy Cloudinary customer photo ${publicIdToDestroy}:`, err.message);
    }
  }

  res.status(200).json({
    success: true,
    message: 'Customer review deleted successfully',
  });
});

// Reorder customer reviews
export const reorderCustomerReviews = asyncHandler(async (req, res, next) => {
  const { orderedIds } = req.body;

  if (!Array.isArray(orderedIds)) {
    return next(new AppError('orderedIds must be an array of review IDs.', 400));
  }

  const updatePromises = orderedIds.map((id, idx) =>
    CustomerReview.findByIdAndUpdate(id, { displayOrder: idx })
  );

  await Promise.all(updatePromises);

  const reviews = await CustomerReview.find().sort({ displayOrder: 1 }).lean();

  res.status(200).json({
    success: true,
    count: reviews.length,
    data: reviews,
  });
});
