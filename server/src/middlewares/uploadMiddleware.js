import multer from 'multer';
import { AppError } from '../utils/AppError.js';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError('Invalid file type. Only JPG, PNG, and WebP images are allowed.', 400), false);
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter,
});

// Magic Number File Signature Validator Middleware
export const validateImageSignatures = (req, res, next) => {
  const files = req.files || (req.file ? [req.file] : []);
  if (!files || files.length === 0) {
    return next();
  }

  for (const file of files) {
    const buffer = file.buffer;
    if (!buffer || buffer.length < 4) {
      return next(new AppError('Uploaded file is empty or corrupted.', 400));
    }

    const hex = buffer.toString('hex', 0, 4).toUpperCase();
    const isJpeg = hex.startsWith('FFD8FF');
    const isPng = hex === '89504E47';
    const isWebp = hex === '52494646'; // RIFF header for WebP

    if (!isJpeg && !isPng && !isWebp) {
      return next(new AppError('Invalid file signature. File content does not match allowed image formats.', 400));
    }
  }

  next();
};
