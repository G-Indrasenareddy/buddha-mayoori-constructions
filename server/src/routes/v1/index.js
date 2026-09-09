import express from 'express';
import healthRoutes from './healthRoutes.js';
import serviceRoutes from './serviceRoutes.js';
import teamRoutes from './teamRoutes.js';
import projectRoutes from './projectRoutes.js';
import enquiryRoutes from './enquiryRoutes.js';

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/services', serviceRoutes);
router.use('/team', teamRoutes);
router.use('/projects', projectRoutes);
router.use('/enquiries', enquiryRoutes);

export default router;
