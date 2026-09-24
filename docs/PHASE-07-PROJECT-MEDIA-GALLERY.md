# Phase 07 Enhancement — Project Media & Photo Gallery Management

## Overview
This document describes the design and implementation of the Project Media & Photo Gallery Management system for **Buddha Mayoori Constructions**. It enables administration of construction project site photographs (ongoing site progress, structural stages, completed elevations) backed by Cloudinary cloud storage, magic-number MIME type validation, and ownership-verified media deletion.

---

## 1. Security & Storage Architecture

### Cloud Storage Integration
- **SDK**: `cloudinary` v2 Node.js SDK initialized using server environment variables (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`).
- **Memory Buffer Uploads**: Multer memory storage holds uploaded files in RAM temporarily before streaming to Cloudinary, ensuring no temporary files linger on server disks.
- **Magic-Number Validation**: `uploadMiddleware.js` inspects file binary headers (magic numbers) to guarantee uploaded files are genuine JPEGs (`FF D8 FF`), PNGs (`89 50 4E 47`), or WebP (`RIFF...WEBP`) images before processing.

### Ownership-Verified Deletion Endpoint
- **URL**: `DELETE /api/v1/admin/projects/:id/media/:mediaId`
- **Security Rule**: Arbitrary `publicId` values from client HTTP requests are **never trusted**.
- **Verification Flow**:
  1. Server locates the `Project` record by `:id` in MongoDB Atlas.
  2. Server verifies that `:mediaId` exists inside `project.galleryImages` subdocument array or matches `project.coverImage._id`.
  3. Upon ownership verification, the database record is updated first.
  4. The verified `publicId` associated with the target media is retrieved from database storage and supplied to `cloudinary.uploader.destroy()`.

---

## 2. Database Schema (Mongoose `Project.js`)

```javascript
const galleryItemSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, default: '' },
  caption: { type: String, default: '' },
  category: {
    type: String,
    enum: [
      'SITE_PREPARATION',
      'FOUNDATION',
      'STRUCTURAL_FRAME',
      'ROOFING_SLAB',
      'ELECTRICAL_PLUMBING',
      'FINISHING_PAINTING',
      'COMPLETED_ELEVATION',
      'GENERAL',
    ],
    default: 'GENERAL',
  },
  uploadedAt: { type: Date, default: Date.now },
});
```

### Main Fields
- `status`: String enum (`'ONGOING'` | `'COMPLETED'`), default `'COMPLETED'`.
- `completionYear`: Number (Optional, applicable only for `'COMPLETED'` projects).
- `coverImage`: Schema `{ url, publicId, caption }` (supports backward compatibility with string primitive URLs).
- `galleryImages`: Array of `galleryItemSchema` subdocuments.

---

## 3. API Routes & Endpoints

| Method | Route | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/v1/admin/projects/upload` | Multi-file image upload to Cloudinary | Admin JWT |
| `DELETE` | `/api/v1/admin/projects/:id/media/:mediaId` | Ownership-verified media removal | Admin JWT |
| `GET` | `/api/v1/projects` | Fetch published projects roster | Public |
| `GET` | `/api/v1/projects/:slug` | Fetch single published project record with gallery | Public |

---

## 4. Frontend Integration & Public UI

### Admin Dashboard (`AdminProjectsPage.jsx`)
- **Status Select**: Allows explicitly setting project status (`🏗️ ONGOING` vs `✓ COMPLETED`).
- **Cover Image Uploader**: Allows uploading a cover image or pasting a direct URL reference.
- **Gallery Uploader**: Multi-file uploader with phase category tagging (`Foundation`, `Structural Frame`, `Finishing`, etc.).
- **Thumbnail Management**: Preview gallery items with category tags and delete action (triggers backend ownership deletion).

### Public Projects Showcase (`ProjectsPage.jsx`)
- Displays `🏗️ ONGOING` or `✓ COMPLETED` status badge on project cards.
- Displays total photo count badge (`📷 X Photos`).
- Renders hero cover image preview.

### Public Project Detail (`ProjectDetailPage.jsx`)
- Displays full project status badge.
- Hides completion year for ongoing projects (`status === 'ONGOING'`).
- Displays responsive construction photo grid with phase category badges.
- Clicking any photo opens `ImageLightbox` modal.

### Interactive Lightbox (`ImageLightbox.jsx`)
- Full-screen high-resolution image viewing modal.
- Supports Next / Prev navigation, image counter (`X / Y`), phase category tag, and ESC/Arrow key controls.
