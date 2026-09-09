import { Project } from '../models/Project.js';
import { Service } from '../models/Service.js';
import { TeamMember } from '../models/TeamMember.js';
import { Enquiry } from '../models/Enquiry.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getDashboardSummary = asyncHandler(async (req, res) => {
  const [
    totalProjects,
    totalServices,
    totalTeamMembers,
    totalEnquiries,
    newEnquiriesCount,
    contactedCount,
    inProgressCount,
    completedCount,
    archivedCount,
    recentEnquiries,
  ] = await Promise.all([
    Project.countDocuments(),
    Service.countDocuments(),
    TeamMember.countDocuments(),
    Enquiry.countDocuments(),
    Enquiry.countDocuments({ status: 'NEW' }),
    Enquiry.countDocuments({ status: 'CONTACTED' }),
    Enquiry.countDocuments({ status: 'IN_PROGRESS' }),
    Enquiry.countDocuments({ status: 'COMPLETED' }),
    Enquiry.countDocuments({ status: 'ARCHIVED' }),
    Enquiry.find()
      .select('type fullName phone serviceRequested status createdAt')
      .sort({ createdAt: -1 })
      .limit(5)
      .lean(),
  ]);

  res.status(200).json({
    success: true,
    data: {
      metrics: {
        totalProjects,
        totalServices,
        totalTeamMembers,
        totalEnquiries,
      },
      enquiryStatusCounts: {
        NEW: newEnquiriesCount,
        CONTACTED: contactedCount,
        IN_PROGRESS: inProgressCount,
        COMPLETED: completedCount,
        ARCHIVED: archivedCount,
      },
      recentEnquiries,
    },
  });
});
