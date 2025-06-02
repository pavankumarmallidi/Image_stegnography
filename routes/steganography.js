const express = require('express');
const multer = require('multer');
const path = require('path');
const steganographyController = require('../controllers/steganographyController');

const router = express.Router();

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        // Check file type
        const allowedTypes = /jpeg|jpg|png/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only PNG, JPG, and JPEG files are allowed!'));
        }
    }
});

// Routes
router.post('/encode', upload.single('image'), steganographyController.encodeMessage);
router.post('/decode', upload.single('image'), steganographyController.decodeMessage);

module.exports = router; 