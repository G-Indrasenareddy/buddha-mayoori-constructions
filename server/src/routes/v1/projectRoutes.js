import express from 'express';
import { getProjects, getProjectBySlug, getPublicHomepageSlider } from '../../controllers/projectController.js';

const router = express.Router();

router.get('/', getProjects);
router.get('/homepage-slider', getPublicHomepageSlider);
router.get('/:slug', getProjectBySlug);

export default router;
