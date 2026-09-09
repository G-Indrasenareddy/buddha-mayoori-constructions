import { Project } from '../models/Project.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';

export const getProjects = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;

  const query = { isPublished: true };

  if (req.query.category) {
    query.category = req.query.category;
  }

  let projects = [];
  let total = 0;

  try {
    total = await Project.countDocuments(query);
    projects = await Project.find(query)
      .sort({ featured: -1, displayOrder: 1, createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .lean();
  } catch (err) {
    // If DB is empty, return empty list cleanly
  }

  res.status(200).json({
    success: true,
    count: projects.length,
    total,
    pagination: {
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    },
    data: projects,
  });
});

export const getProjectBySlug = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;
  let project = null;

  try {
    project = await Project.findOne({ slug, isPublished: true }).lean();
  } catch (err) {
    // Fallback error handling
  }

  if (!project) {
    return next(new AppError(`Project not found with slug: ${slug}`, 404));
  }

  res.status(200).json({
    success: true,
    data: project,
  });
});
