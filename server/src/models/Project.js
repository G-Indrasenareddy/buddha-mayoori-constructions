import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Project slug is required'],
      unique: true,
      lowercase: true,
      index: true,
    },
    category: {
      type: String,
      required: [true, 'Project category is required'],
      enum: [
        'Residential Construction',
        'Commercial Construction',
        'House Renovation',
        'Interior Design',
        'Structural Design',
      ],
    },
    location: {
      type: String,
      required: [true, 'Project location is required'],
      trim: true,
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      maxlength: [300, 'Short description cannot exceed 300 characters'],
    },
    fullDescription: {
      type: String,
    },
    completionYear: {
      type: Number,
    },
    coverImage: {
      type: String,
      default: '/assets/project-placeholder.jpg',
    },
    galleryImages: [
      {
        type: String,
      },
    ],
    featured: {
      type: Boolean,
      default: false,
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

projectSchema.index({ featured: -1, isPublished: -1 });

export const Project = mongoose.model('Project', projectSchema);
