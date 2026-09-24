import express from 'express';
import { body } from 'express-validator';
import { protect } from '../../middlewares/authMiddleware.js';
import { requireRole } from '../../middlewares/roleMiddleware.js';
import { validate } from '../../middlewares/validate.js';
import { upload, validateImageSignatures } from '../../middlewares/uploadMiddleware.js';
import { getDashboardSummary } from '../../controllers/adminDashboardController.js';
import {
  getAdminProjects,
  createProject,
  updateProject,
  deleteProject,
  uploadProjectMedia,
  deleteProjectMedia,
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

// Validation Rules
const projectCreateValidation = [
  body('title').trim().notEmpty().withMessage('Project title is required'),
  body('category')
    .isIn([
      'Residential Construction',
      'Commercial Construction',
      'House Renovation',
      'Interior Design',
      'Structural Design',
    ])
    .withMessage('Invalid project category'),
  body('location').trim().notEmpty().withMessage('Project location is required'),
  body('status')
    .isIn(['ONGOING', 'COMPLETED'])
    .withMessage('Project status must be ONGOING or COMPLETED'),
  body('shortDescription')
    .trim()
    .notEmpty()
    .withMessage('Short description is required')
    .isLength({ max: 300 })
    .withMessage('Short description cannot exceed 300 characters'),
];

const projectUpdateValidation = [
  body('title').optional().trim().notEmpty().withMessage('Project title cannot be empty'),
  body('category')
    .optional()
    .isIn([
      'Residential Construction',
      'Commercial Construction',
      'House Renovation',
      'Interior Design',
      'Structural Design',
    ])
    .withMessage('Invalid project category'),
  body('status')
    .optional()
    .isIn(['ONGOING', 'COMPLETED'])
    .withMessage('Project status must be ONGOING or COMPLETED'),
  body('shortDescription')
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage('Short description cannot exceed 300 characters'),
];

const teamCreateValidation = [
  body('name').trim().notEmpty().withMessage('Team member name is required'),
  body('role').trim().notEmpty().withMessage('Role is required'),
];

const teamUpdateValidation = [
  body('name').optional().trim().notEmpty().withMessage('Team member name cannot be empty'),
  body('role').optional().trim().notEmpty().withMessage('Role cannot be empty'),
];

const serviceUpdateValidation = [
  body('shortDesc').optional().trim().notEmpty().withMessage('Short description cannot be empty'),
];

const enquiryStatusUpdateValidation = [
  body('status')
    .trim()
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['NEW', 'CONTACTED', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED'])
    .withMessage('Invalid status. Allowed values: NEW, CONTACTED, IN_PROGRESS, COMPLETED, ARCHIVED'),
];

// Dashboard summary
router.get('/dashboard/summary', getDashboardSummary);

// Projects CRUD & Media Management
router.get('/projects', getAdminProjects);
router.post('/projects/upload', upload.array('files', 10), validateImageSignatures, uploadProjectMedia);
router.delete('/projects/:id/media/:mediaId', deleteProjectMedia);
router.post('/projects', validate(projectCreateValidation), createProject);
router.put('/projects/:id', validate(projectUpdateValidation), updateProject);
router.delete('/projects/:id', deleteProject);

// Canonical Services
router.get('/services', getAdminServices);
router.put('/services/:id', validate(serviceUpdateValidation), updateService);

// Team Roster CRUD
router.get('/team', getAdminTeam);
router.post('/team', validate(teamCreateValidation), createTeamMember);
router.put('/team/:id', validate(teamUpdateValidation), updateTeamMember);
router.delete('/team/:id', deleteTeamMember);

// Enquiries Management
router.get('/enquiries', getAdminEnquiries);
router.get('/enquiries/:id', getAdminEnquiryById);
router.patch('/enquiries/:id/status', validate(enquiryStatusUpdateValidation), updateEnquiryStatus);

export default router;
