import mongoose from 'mongoose';

const homepageSliderItemSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, 'Associated project reference is required'],
    },
    mediaId: {
      type: String,
      required: [true, 'Media ID reference is required'],
    },
    mediaType: {
      type: String,
      enum: ['cover', 'gallery'],
      required: [true, 'Media type must be cover or gallery'],
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  { _id: true, timestamps: true }
);

const homepageSliderSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: 'GLOBAL_HOMEPAGE_SLIDER',
      unique: true,
    },
    items: [homepageSliderItemSchema],
  },
  { timestamps: true }
);

export const HomepageSlider = mongoose.model('HomepageSlider', homepageSliderSchema);
