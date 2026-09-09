import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema(
  {
    memberId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Team member name is required'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
      default: '/assets/team-placeholder.jpg',
    },
    status: {
      type: String,
      enum: ['CONFIRMED_FROM_PROVIDED_MATERIAL', 'REQUIRES_BUSINESS_CONFIRMATION'],
      default: 'CONFIRMED_FROM_PROVIDED_MATERIAL',
    },
    confirmationNote: {
      type: String,
    },
    isPendingName: {
      type: Boolean,
      default: false,
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

export const TeamMember = mongoose.model('TeamMember', teamMemberSchema);
