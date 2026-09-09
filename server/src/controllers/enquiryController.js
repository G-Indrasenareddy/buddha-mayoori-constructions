import { Enquiry } from '../models/Enquiry.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createEnquiry = asyncHandler(async (req, res) => {
  const {
    type,
    fullName,
    phone,
    email,
    serviceRequested,
    projectType,
    location,
    estimatedBudget,
    message,
  } = req.body;

  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';

  const enquiry = await Enquiry.create({
    type,
    fullName,
    phone,
    email,
    serviceRequested,
    projectType,
    location,
    estimatedBudget,
    message,
    clientIp,
  });

  res.status(201).json({
    success: true,
    message: 'Thank you! Your enquiry has been received successfully. Our team will contact you shortly.',
    data: {
      id: enquiry._id,
      type: enquiry.type,
      createdAt: enquiry.createdAt,
    },
  });
});
