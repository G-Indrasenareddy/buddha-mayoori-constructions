import { Service } from '../models/Service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';

export const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find({ isPublished: true })
    .sort({ displayOrder: 1, createdAt: 1 })
    .lean();

  res.status(200).json({
    success: true,
    count: services.length,
    data: services,
  });
});

export const getServiceBySlug = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;
  const service = await Service.findOne({ slug, isPublished: true }).lean();

  if (!service) {
    return next(new AppError(`Service not found with slug: ${slug}`, 404));
  }

  res.status(200).json({
    success: true,
    data: service,
  });
});
