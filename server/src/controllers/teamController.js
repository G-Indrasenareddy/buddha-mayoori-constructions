import { TeamMember } from '../models/TeamMember.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getTeamMembers = asyncHandler(async (req, res) => {
  const team = await TeamMember.find({ isPublished: true })
    .sort({ displayOrder: 1, createdAt: 1 })
    .lean();

  res.status(200).json({
    success: true,
    count: team.length,
    data: team,
  });
});
