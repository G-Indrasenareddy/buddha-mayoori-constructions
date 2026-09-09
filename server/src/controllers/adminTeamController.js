import { TeamMember } from '../models/TeamMember.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getAdminTeam = asyncHandler(async (req, res) => {
  const team = await TeamMember.find().sort({ displayOrder: 1 }).lean();
  res.status(200).json({
    success: true,
    count: team.length,
    data: team,
  });
});

export const createTeamMember = asyncHandler(async (req, res, next) => {
  const { name, role, location, avatar, status, confirmationNote, isPendingName, displayOrder, isPublished } = req.body;

  const memberId = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  const member = await TeamMember.create({
    memberId,
    name,
    role,
    location,
    avatar,
    status: status || 'CONFIRMED_FROM_PROVIDED_MATERIAL',
    confirmationNote,
    isPendingName: isPendingName || false,
    displayOrder: displayOrder || 0,
    isPublished: isPublished !== undefined ? isPublished : true,
  });

  res.status(201).json({
    success: true,
    data: member,
  });
});

export const updateTeamMember = asyncHandler(async (req, res, next) => {
  let member = await TeamMember.findById(req.params.id);

  if (!member) {
    return next(new AppError(`Team member not found with id: ${req.params.id}`, 404));
  }

  member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: member,
  });
});

export const deleteTeamMember = asyncHandler(async (req, res, next) => {
  const member = await TeamMember.findById(req.params.id);

  if (!member) {
    return next(new AppError(`Team member not found with id: ${req.params.id}`, 404));
  }

  await member.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Team member deleted successfully',
  });
});
