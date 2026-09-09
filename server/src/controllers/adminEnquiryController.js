import { Enquiry } from '../models/Enquiry.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getAdminEnquiries = asyncHandler(async (req, res) => {
  const query = {};
  if (req.query.status) {
    query.status = req.query.status;
  }
  if (req.query.type) {
    query.type = req.query.type;
  }

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const startIndex = (page - 1) * limit;

  const total = await Enquiry.countDocuments(query);
  const enquiries = await Enquiry.find(query)
    .sort({ createdAt: -1 })
    .skip(startIndex)
    .limit(limit)
    .lean();

  res.status(200).json({
    success: true,
    count: enquiries.length,
    total,
    pagination: {
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    },
    data: enquiries,
  });
});

export const getAdminEnquiryById = asyncHandler(async (req, res, next) => {
  const enquiry = await Enquiry.findById(req.params.id).lean();

  if (!enquiry) {
    return next(new AppError(`Enquiry record not found with id: ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: enquiry,
  });
});

export const updateEnquiryStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;
  const validStatuses = ['NEW', 'CONTACTED', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED'];

  if (!status || !validStatuses.includes(status)) {
    return next(new AppError(`Invalid status. Allowed values: ${validStatuses.join(', ')}`, 400));
  }

  const enquiry = await Enquiry.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );

  if (!enquiry) {
    return next(new AppError(`Enquiry record not found with id: ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: enquiry,
  });
});
