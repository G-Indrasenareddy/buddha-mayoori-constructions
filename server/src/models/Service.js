import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    serviceId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Service slug is required'],
      unique: true,
      lowercase: true,
      index: true,
    },
    iconName: {
      type: String,
      required: [true, 'Icon name is required'],
    },
    shortDesc: {
      type: String,
      required: [true, 'Short description is required'],
    },
    fullDesc: {
      type: String,
    },
    status: {
      type: String,
      default: 'CONFIRMED_FROM_PROVIDED_MATERIAL',
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Service = mongoose.model('Service', serviceSchema);
