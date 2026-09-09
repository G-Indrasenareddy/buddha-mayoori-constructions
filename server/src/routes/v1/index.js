import express from 'express';
import healthRoutes from './healthRoutes.js';
import serviceRoutes from './serviceRoutes.js';
import teamRoutes from './teamRoutes.js';
import projectRoutes from './projectRoutes.js';
import enquiryRoutes from './enquiryRoutes.js';
import authRoutes from './authRoutes.js';
import adminRoutes from './adminRoutes.js';

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/services', serviceRoutes);
router.use('/team', teamRoutes);
router.use('/projects', projectRoutes);
router.use('/enquiries', enquiryRoutes);

// Auth & Admin routes
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);

export default router;
