import multer from 'multer';
import path from 'path';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

// Cloudinary configuration fallback
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const isCloudinaryConfigured = process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET;

let storage;

if (isCloudinaryConfigured) {
    storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: 'ministore_products',
            format: async (req, file) => 'png', // or use path.extname(file.originalname).substring(1)
            public_id: (req, file) => `${file.fieldname}-${Date.now()}`,
        },
    });
    console.log('Using Cloudinary for image storage');
} else {
    storage = multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
        }
    });
    console.log('Using Local Storage for image storage (No Cloudinary detected)');
}

const checkFileType = (file, cb) => {
    // Accept all common image MIME types
    const allowedMimeTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp',
        'image/gif',
        'image/avif',
        'image/heic',
        'image/heif',
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
        return cb(null, true);
    } else {
        const err = new Error('Images only! Accepted formats: JPG, PNG, WebP, GIF, AVIF.');
        err.status = 400;
        cb(err);
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => checkFileType(file, cb)
});

export default upload;
