import { Project } from '../models/Project.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getAdminProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().sort({ displayOrder: 1, createdAt: -1 }).lean();
  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
});

export const createProject = asyncHandler(async (req, res, next) => {
  const { title, category, location, shortDescription, fullDescription, coverImage, isPublished, featured, displayOrder } = req.body;

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  const existingSlug = await Project.findOne({ slug });
  if (existingSlug) {
    return next(new AppError(`A project with the slug '${slug}' already exists.`, 409));
  }

  const project = await Project.create({
    title,
    slug,
    category,
    location,
    shortDescription,
    fullDescription,
    coverImage,
    isPublished: isPublished !== undefined ? isPublished : true,
    featured: featured !== undefined ? featured : false,
    displayOrder: displayOrder || 0,
  });

  res.status(201).json({
    success: true,
    data: project,
  });
});

export const updateProject = asyncHandler(async (req, res, next) => {
  let project = await Project.findById(req.params.id);

  if (!project) {
    return next(new AppError(`Project not found with id: ${req.params.id}`, 404));
  }

  if (req.body.title && req.body.title !== project.title) {
    req.body.slug = req.body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }

  project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: project,
  });
});

export const deleteProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return next(new AppError(`Project not found with id: ${req.params.id}`, 404));
  }

  await project.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Project deleted successfully',
  });
});
