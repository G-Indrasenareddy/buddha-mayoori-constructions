import { Service } from '../models/Service.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getAdminServices = asyncHandler(async (req, res) => {
  const services = await Service.find().sort({ displayOrder: 1 }).lean();
  res.status(200).json({
    success: true,
    count: services.length,
    data: services,
  });
});

export const updateService = asyncHandler(async (req, res, next) => {
  let service = await Service.findById(req.params.id);

  if (!service) {
    return next(new AppError(`Service not found with id: ${req.params.id}`, 404));
  }

  // Preserve canonical title and slug
  const allowedUpdates = {
    shortDesc: req.body.shortDesc,
    fullDesc: req.body.fullDesc,
    displayOrder: req.body.displayOrder,
    isPublished: req.body.isPublished,
  };

  service = await Service.findByIdAndUpdate(req.params.id, allowedUpdates, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: service,
  });
});
