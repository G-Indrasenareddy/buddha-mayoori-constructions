import { Project } from '../models/Project.js';
import { HomepageSlider } from '../models/HomepageSlider.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import cloudinary from '../config/cloudinary.js';

// Helper to stream upload buffer to Cloudinary
const processMediaUpload = async (file, folder = 'bmc_projects') => {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error('Cloudinary environment configuration is missing. Please configure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in server/.env.');
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          publicId: result.public_id,
          url: result.secure_url,
        });
      }
    );
    uploadStream.end(file.buffer);
  });
};

// Helper to get or initialize the singleton HomepageSlider document
const getOrCreateSliderDoc = async () => {
  let slider = await HomepageSlider.findOne({ key: 'GLOBAL_HOMEPAGE_SLIDER' });
  if (!slider) {
    slider = await HomepageSlider.create({ key: 'GLOBAL_HOMEPAGE_SLIDER', items: [] });
  }
  return slider;
};

export const getAdminProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().sort({ displayOrder: 1, createdAt: -1 }).lean();
  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
});

// Upload media endpoint for cover or gallery photos
export const uploadProjectMedia = asyncHandler(async (req, res, next) => {
  const files = req.files || (req.file ? [req.file] : []);
  if (!files || files.length === 0) {
    return next(new AppError('Please select at least one image file to upload.', 400));
  }

  if (files.length > 10) {
    return next(new AppError('Maximum 10 images allowed per upload batch.', 400));
  }

  try {
    const uploadPromises = files.map((file) => processMediaUpload(file));
    const uploadedMedia = await Promise.all(uploadPromises);

    res.status(200).json({
      success: true,
      count: uploadedMedia.length,
      data: uploadedMedia,
    });
  } catch (err) {
    return next(new AppError(`Storage upload failed: ${err.message}`, 502));
  }
});

// Ownership-Verified Media Deletion Endpoint
export const deleteProjectMedia = asyncHandler(async (req, res, next) => {
  const { id, mediaId } = req.params;

  const project = await Project.findById(id);
  if (!project) {
    return next(new AppError(`Project record not found with id: ${id}`, 404));
  }

  // Check gallery subdocument ownership
  let targetMedia = project.galleryImages.id(mediaId);
  let isCoverMedia = false;

  if (!targetMedia) {
    // Check if mediaId matches coverImage ID or 'cover'
    if (mediaId === 'cover' || (project.coverImage && project.coverImage._id && project.coverImage._id.toString() === mediaId)) {
      targetMedia = project.coverImage;
      isCoverMedia = true;
    }
  }

  if (!targetMedia) {
    return next(new AppError('Media item not found in this project record.', 404));
  }

  const verifiedPublicId = targetMedia.publicId;

  // Step 1: Update Database First
  if (isCoverMedia) {
    project.coverImage = { publicId: '', url: '/assets/project-placeholder.jpg' };
  } else {
    project.galleryImages.pull({ _id: mediaId });
  }

  await project.save();

  // Step 2: Remove from HomepageSlider if selected
  const slider = await HomepageSlider.findOne({ key: 'GLOBAL_HOMEPAGE_SLIDER' });
  if (slider) {
    const initialLen = slider.items.length;
    slider.items = slider.items.filter((item) => item.mediaId !== mediaId);
    if (slider.items.length !== initialLen) {
      slider.items.forEach((item, idx) => {
        item.displayOrder = idx;
      });
      await slider.save();
    }
  }

  // Step 3: Delete from Cloudinary Second (Best effort)
  if (verifiedPublicId && process.env.CLOUDINARY_CLOUD_NAME) {
    try {
      await cloudinary.uploader.destroy(verifiedPublicId);
    } catch (err) {
      console.warn(`Failed to destroy Cloudinary asset ${verifiedPublicId}:`, err.message);
    }
  }

  res.status(200).json({
    success: true,
    message: 'Media deleted successfully',
  });
});

export const createProject = asyncHandler(async (req, res, next) => {
  const {
    title,
    category,
    location,
    status,
    shortDescription,
    fullDescription,
    completionYear,
    coverImage,
    galleryImages,
    isPublished,
    featured,
    displayOrder,
  } = req.body;

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
    status: status || 'COMPLETED',
    shortDescription,
    fullDescription,
    completionYear: completionYear ? parseInt(completionYear, 10) : undefined,
    coverImage: typeof coverImage === 'string' ? { publicId: '', url: coverImage } : coverImage,
    galleryImages: Array.isArray(galleryImages)
      ? galleryImages.map((img) => (typeof img === 'string' ? { publicId: '', url: img } : img))
      : [],
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

  if (typeof req.body.coverImage === 'string') {
    req.body.coverImage = { publicId: '', url: req.body.coverImage };
  }

  if (Array.isArray(req.body.galleryImages)) {
    req.body.galleryImages = req.body.galleryImages.map((img) =>
      typeof img === 'string' ? { publicId: '', url: img } : img
    );
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

  // Extract publicIds for Cloudinary bulk destroy
  const publicIdsToDestroy = [];
  if (project.coverImage && project.coverImage.publicId) {
    publicIdsToDestroy.push(project.coverImage.publicId);
  }
  if (Array.isArray(project.galleryImages)) {
    project.galleryImages.forEach((img) => {
      if (img.publicId) publicIdsToDestroy.push(img.publicId);
    });
  }

  // Delete project from Mongoose first
  await project.deleteOne();

  // Cascade cleanup from HomepageSlider
  const slider = await HomepageSlider.findOne({ key: 'GLOBAL_HOMEPAGE_SLIDER' });
  if (slider) {
    const initialLen = slider.items.length;
    slider.items = slider.items.filter((item) => item.project.toString() !== req.params.id);
    if (slider.items.length !== initialLen) {
      slider.items.forEach((item, idx) => {
        item.displayOrder = idx;
      });
      await slider.save();
    }
  }

  // Destroy Cloudinary assets second (best effort)
  if (publicIdsToDestroy.length > 0 && process.env.CLOUDINARY_CLOUD_NAME) {
    Promise.all(publicIdsToDestroy.map((pid) => cloudinary.uploader.destroy(pid))).catch((err) =>
      console.warn('Failed bulk destruction of Cloudinary assets:', err.message)
    );
  }

  res.status(200).json({
    success: true,
    message: 'Project and associated media deleted successfully',
  });
});

// ==========================================
// HOMEPAGE SLIDER ADMIN CONTROLLERS
// ==========================================

export const getAdminHomepageSlider = asyncHandler(async (req, res) => {
  const slider = await getOrCreateSliderDoc();
  await slider.populate({
    path: 'items.project',
    select: 'title category location slug isPublished coverImage galleryImages',
  });

  const resolvedItems = [];
  slider.items.forEach((item) => {
    const project = item.project;
    if (!project) return;

    let targetMedia = null;
    if (item.mediaType === 'cover' && project.coverImage && project.coverImage.url) {
      targetMedia = {
        url: project.coverImage.url,
        publicId: project.coverImage.publicId || '',
        caption: '',
      };
    } else if (item.mediaType === 'gallery' && Array.isArray(project.galleryImages)) {
      const gImg = project.galleryImages.find((g) => g._id.toString() === item.mediaId);
      if (gImg) {
        targetMedia = {
          url: gImg.url,
          publicId: gImg.publicId || '',
          caption: gImg.caption || '',
        };
      }
    }

    if (targetMedia && targetMedia.url) {
      resolvedItems.push({
        _id: item._id,
        mediaId: item.mediaId,
        mediaType: item.mediaType,
        displayOrder: item.displayOrder,
        url: targetMedia.url,
        publicId: targetMedia.publicId,
        caption: targetMedia.caption,
        project: {
          _id: project._id,
          title: project.title,
          category: project.category,
          location: project.location,
          slug: project.slug,
          isPublished: project.isPublished,
        },
      });
    }
  });

  resolvedItems.sort((a, b) => a.displayOrder - b.displayOrder);

  res.status(200).json({
    success: true,
    count: resolvedItems.length,
    maxLimit: 6,
    data: resolvedItems,
  });
});

export const selectHomepageMedia = asyncHandler(async (req, res, next) => {
  const { projectId, mediaId, mediaType } = req.body;

  if (!projectId || !mediaId || !mediaType) {
    return next(new AppError('projectId, mediaId, and mediaType are required.', 400));
  }

  if (!['cover', 'gallery'].includes(mediaType)) {
    return next(new AppError('mediaType must be cover or gallery.', 400));
  }

  const project = await Project.findById(projectId);
  if (!project) {
    return next(new AppError(`Project not found with id: ${projectId}`, 404));
  }

  if (!project.isPublished) {
    return next(new AppError('Only media from published projects can be selected for the public homepage slider.', 400));
  }

  let validMedia = false;
  if (mediaType === 'cover') {
    if (project.coverImage && project.coverImage.url && project.coverImage.url.trim() !== '') {
      validMedia = true;
    }
  } else if (mediaType === 'gallery') {
    const gImg = project.galleryImages.id(mediaId);
    if (gImg && gImg.url && gImg.url.trim() !== '') {
      validMedia = true;
    }
  }

  if (!validMedia) {
    return next(new AppError('Selected media item does not exist in this project record.', 404));
  }

  const slider = await getOrCreateSliderDoc();

  // Check duplicate
  const existingIndex = slider.items.findIndex(
    (item) => item.project.toString() === projectId && item.mediaId === mediaId
  );
  if (existingIndex !== -1) {
    return next(new AppError('This photo is already selected for the homepage slider.', 400));
  }

  // GLOBAL LIMIT OF 6 ENFORCEMENT
  if (slider.items.length >= 6) {
    return next(
      new AppError('Homepage slider already has 6 photos selected. Deselect a photo before selecting another.', 400)
    );
  }

  slider.items.push({
    project: projectId,
    mediaId,
    mediaType,
    displayOrder: slider.items.length,
  });

  await slider.save();

  return getAdminHomepageSlider(req, res, next);
});

export const deselectHomepageMedia = asyncHandler(async (req, res, next) => {
  const { mediaId } = req.params;

  const slider = await getOrCreateSliderDoc();
  slider.items = slider.items.filter((item) => item.mediaId !== mediaId && item._id.toString() !== mediaId);

  slider.items.forEach((item, idx) => {
    item.displayOrder = idx;
  });

  await slider.save();

  return getAdminHomepageSlider(req, res, next);
});

export const reorderHomepageSlider = asyncHandler(async (req, res, next) => {
  const { orderedMediaIds } = req.body;

  if (!Array.isArray(orderedMediaIds)) {
    return next(new AppError('orderedMediaIds must be an array of media IDs.', 400));
  }

  const slider = await getOrCreateSliderDoc();

  const itemMap = new Map();
  slider.items.forEach((item) => {
    itemMap.set(item.mediaId, item);
    itemMap.set(item._id.toString(), item);
  });

  const newItems = [];
  const processedKeys = new Set();

  orderedMediaIds.forEach((id, idx) => {
    const found = itemMap.get(id);
    if (found && !processedKeys.has(found.mediaId)) {
      found.displayOrder = idx;
      newItems.push(found);
      processedKeys.add(found.mediaId);
    }
  });

  slider.items.forEach((item) => {
    if (!processedKeys.has(item.mediaId)) {
      item.displayOrder = newItems.length;
      newItems.push(item);
    }
  });

  slider.items = newItems;
  await slider.save();

  return getAdminHomepageSlider(req, res, next);
});
