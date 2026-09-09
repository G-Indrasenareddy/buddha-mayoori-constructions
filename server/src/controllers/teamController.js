import { TeamMember } from '../models/TeamMember.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Approved 10 Team Roster Entries fallback data
const TEAM_ROSTER_FALLBACK = [
  { memberId: "jayakumar-ramachandran", name: "Jayakumar Ramachandran (Kochukuttan)", role: "Proprietor / Civil Engineer / Managing Director / Director", location: "Koodal, Pathanamthitta, Kerala", status: "CONFIRMED_FROM_PROVIDED_MATERIAL" },
  { memberId: "sarath-jayakumar", name: "Sarath Jayakumar (Ph.D Scholar)", role: "Landscape Designer / Project Manager", location: "Koodal, Pathanamthitta, Kerala", status: "CONFIRMED_FROM_PROVIDED_MATERIAL" },
  { memberId: "indrasena-reddy", name: "Indrasena Reddy", role: "Brand / Media Manager", location: "Andhra Pradesh", status: "CONFIRMED_FROM_PROVIDED_MATERIAL" },
  { memberId: "anoop", name: "Anoop", role: "Brand / Media Manager", location: "Kerala", status: "CONFIRMED_FROM_PROVIDED_MATERIAL" },
  { memberId: "rasika-sarje-ashok", name: "Rasika Sarje Ashok", role: "Landscaping Consultant", location: "Maharashtra", status: "CONFIRMED_FROM_PROVIDED_MATERIAL" },
  { memberId: "smriti-pathania", name: "Smriti Pathania", role: "Landscaping Consultant", location: "Himachal Pradesh", status: "CONFIRMED_FROM_PROVIDED_MATERIAL" },
  { memberId: "mahesh", name: "Mahesh", role: "Supervisor", status: "CONFIRMED_FROM_PROVIDED_MATERIAL" },
  { memberId: "bhagan", name: "Bhagan", role: "Head — Painting & Finishing Department", status: "CONFIRMED_FROM_PROVIDED_MATERIAL" },
  { memberId: "roy", name: "Roy (Roy Electricals)", role: "Head — Plumbing & Sanitary Department", status: "CONFIRMED_FROM_PROVIDED_MATERIAL" },
  { memberId: "head-electrical", name: "Head — Electrical Department", role: "Electrical Department", status: "REQUIRES_BUSINESS_CONFIRMATION", confirmationNote: "Name to be confirmed", isPendingName: true }
];

export const getTeamMembers = asyncHandler(async (req, res) => {
  let team = [];
  try {
    team = await TeamMember.find({ isPublished: true }).sort({ displayOrder: 1, createdAt: 1 }).lean();
  } catch (err) {
    // Graceful fallback if DB is empty or disconnected
  }

  if (!team || team.length === 0) {
    team = TEAM_ROSTER_FALLBACK;
  }

  res.status(200).json({
    success: true,
    count: team.length,
    data: team,
  });
});
