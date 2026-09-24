import { Project } from '../models/Project.js';
import { HomepageSlider } from '../models/HomepageSlider.js';
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

  const total = await Project.countDocuments(query);
  const projects = await Project.find(query)
    .sort({ featured: -1, displayOrder: 1, createdAt: -1 })
    .skip(startIndex)
    .limit(limit)
    .lean();

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
  const project = await Project.findOne({ slug, isPublished: true }).lean();

  if (!project) {
    return next(new AppError(`Project not found with slug: ${slug}`, 404));
  }

  res.status(200).json({
    success: true,
    data: project,
  });
});

// Public Homepage Slider Endpoint: returns ONLY explicitly selected media from published projects
export const getPublicHomepageSlider = asyncHandler(async (req, res) => {
  const slider = await HomepageSlider.findOne({ key: 'GLOBAL_HOMEPAGE_SLIDER' })
    .populate({
      path: 'items.project',
      select: 'title category location slug isPublished coverImage galleryImages',
    })
    .lean();

  if (!slider || !Array.isArray(slider.items) || slider.items.length === 0) {
    return res.status(200).json({
      success: true,
      count: 0,
      data: [],
    });
  }

  const publicSlides = [];
  slider.items.forEach((item) => {
    const project = item.project;
    // MUST BE A PUBLISHED PROJECT
    if (!project || !project.isPublished) return;

    let targetMedia = null;
    if (item.mediaType === 'cover' && project.coverImage && project.coverImage.url) {
      targetMedia = {
        url: project.coverImage.url,
        publicId: project.coverImage.publicId || '',
        caption: '',
      };
    } else if (item.mediaType === 'gallery' && Array.isArray(project.galleryImages)) {
      const gImg = project.galleryImages.find((g) => g._id.toString() === item.mediaId);
      if (gImg && gImg.url) {
        targetMedia = {
          url: gImg.url,
          publicId: gImg.publicId || '',
          caption: gImg.caption || '',
        };
      }
    }

    if (targetMedia && targetMedia.url) {
      publicSlides.push({
        id: item.mediaId,
        url: targetMedia.url,
        caption: targetMedia.caption,
        projectTitle: project.title,
        projectCategory: project.category,
        projectLocation: project.location,
        projectSlug: project.slug,
        displayOrder: item.displayOrder !== undefined ? item.displayOrder : 0,
      });
    }
  });

  // Sort strictly by administrator-defined displayOrder
  publicSlides.sort((a, b) => a.displayOrder - b.displayOrder);

  // Enforce maximum 6 on response
  const finalSlides = publicSlides.slice(0, 6);

  res.status(200).json({
    success: true,
    count: finalSlides.length,
    data: finalSlides,
  });
});
