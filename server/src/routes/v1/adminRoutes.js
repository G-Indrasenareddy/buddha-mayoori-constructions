import express from 'express';
import { protect } from '../../middlewares/authMiddleware.js';
import { requireRole } from '../../middlewares/roleMiddleware.js';
import { getDashboardSummary } from '../../controllers/adminDashboardController.js';
import {
  getAdminProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../../controllers/adminProjectController.js';
import {
  getAdminServices,
  updateService,
} from '../../controllers/adminServiceController.js';
import {
  getAdminTeam,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from '../../controllers/adminTeamController.js';
import {
  getAdminEnquiries,
  getAdminEnquiryById,
  updateEnquiryStatus,
} from '../../controllers/adminEnquiryController.js';

const router = express.Router();

// Apply auth protection & role check to all admin routes
router.use(protect);
router.use(requireRole('admin', 'superadmin'));

// Dashboard summary
router.get('/dashboard/summary', getDashboardSummary);

// Projects CRUD
router.get('/projects', getAdminProjects);
router.post('/projects', createProject);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);

// Canonical Services
router.get('/services', getAdminServices);
router.put('/services/:id', updateService);

// Team Roster CRUD
router.get('/team', getAdminTeam);
router.post('/team', createTeamMember);
router.put('/team/:id', updateTeamMember);
router.delete('/team/:id', deleteTeamMember);

// Enquiries Management
router.get('/enquiries', getAdminEnquiries);
router.get('/enquiries/:id', getAdminEnquiryById);
router.patch('/enquiries/:id/status', updateEnquiryStatus);

export default router;
