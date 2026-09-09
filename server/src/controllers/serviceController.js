import { Service } from '../models/Service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';

// Approved Canonical 9 Services fallback data
const CANONICAL_SERVICES_FALLBACK = [
  { serviceId: "structural-designing", title: "Structural Designing", slug: "structural-designing", iconName: "Ruler", shortDesc: "Professional structural design and engineering services for safe building construction.", status: "CONFIRMED_FROM_PROVIDED_MATERIAL" },
  { serviceId: "building-estimation", title: "Building Estimation", slug: "building-estimation", iconName: "Calculator", shortDesc: "Comprehensive building cost estimation and material budgeting services.", status: "CONFIRMED_FROM_PROVIDED_MATERIAL" },
  { serviceId: "building-construction-works", title: "Building Construction Works", slug: "building-construction-works", iconName: "Building2", shortDesc: "End-to-end building construction works for residential and commercial projects.", status: "CONFIRMED_FROM_PROVIDED_MATERIAL" },
  { serviceId: "building-planning", title: "Building Planning", slug: "building-planning", iconName: "FileText", shortDesc: "Architectural building planning and spatial layout services.", status: "CONFIRMED_FROM_PROVIDED_MATERIAL" },
  { serviceId: "house-renovation", title: "House Renovation", slug: "house-renovation", iconName: "Hammer", shortDesc: "Complete house renovation, structural modernization, and alteration works.", status: "CONFIRMED_FROM_PROVIDED_MATERIAL" },
  { serviceId: "interior-design", title: "Interior Design", slug: "interior-design", iconName: "Paintbrush", shortDesc: "Custom interior design and space aesthetics services.", status: "CONFIRMED_FROM_PROVIDED_MATERIAL" },
  { serviceId: "site-supervision", title: "Site Supervision", slug: "site-supervision", iconName: "ShieldCheck", shortDesc: "On-site construction supervision and technical quality oversight.", status: "CONFIRMED_FROM_PROVIDED_MATERIAL" },
  { serviceId: "plumbing-designing", title: "Plumbing Designing", slug: "plumbing-designing", iconName: "Wrench", shortDesc: "Plumbing system layout and sanitary design services.", status: "CONFIRMED_FROM_PROVIDED_MATERIAL" },
  { serviceId: "3d-elevation", title: "3D Elevation", slug: "3d-elevation", iconName: "Box", shortDesc: "Exterior 3D architectural elevation design and visual concepts.", status: "CONFIRMED_FROM_PROVIDED_MATERIAL" }
];

export const getServices = asyncHandler(async (req, res) => {
  let services = [];
  try {
    services = await Service.find({ isPublished: true }).sort({ displayOrder: 1, createdAt: 1 }).lean();
  } catch (err) {
    // If DB is disconnected, use approved canonical fallback
  }

  if (!services || services.length === 0) {
    services = CANONICAL_SERVICES_FALLBACK;
  }

  res.status(200).json({
    success: true,
    count: services.length,
    data: services,
  });
});

export const getServiceBySlug = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;
  let service = null;

  try {
    service = await Service.findOne({ slug, isPublished: true }).lean();
  } catch (err) {
    // Graceful fallback
  }

  if (!service) {
    service = CANONICAL_SERVICES_FALLBACK.find((s) => s.slug === slug);
  }

  if (!service) {
    return next(new AppError(`Service not found with slug: ${slug}`, 404));
  }

  res.status(200).json({
    success: true,
    data: service,
  });
});
