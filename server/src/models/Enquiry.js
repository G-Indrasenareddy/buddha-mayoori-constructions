import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, 'Enquiry type is required'],
      enum: ['CONTACT_INQUIRY', 'ESTIMATE_REQUEST'],
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Full name must be at least 2 characters'],
      maxlength: [100, 'Full name cannot exceed 100 characters'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    serviceRequested: {
      type: String,
      trim: true,
    },
    projectType: {
      type: String,
      enum: ['Residential', 'Commercial', 'Renovation', 'Interior', 'Other'],
    },
    location: {
      type: String,
      trim: true,
    },
    estimatedBudget: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [10, 'Message must be at least 10 characters'],
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
    },
    status: {
      type: String,
      enum: ['NEW', 'CONTACTED', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED'],
      default: 'NEW',
    },
    clientIp: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

enquirySchema.index({ type: 1, status: 1, createdAt: -1 });

export const Enquiry = mongoose.model('Enquiry', enquirySchema);
