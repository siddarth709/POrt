const express = require('express');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const auth = require('../middleware/auth');

const router = express.Router();
const upload = multer({ storage, limits: { fileSize: 8 * 1024 * 1024 } }); // 8MB cap - free tier friendly

// POST /api/upload - PROTECTED. Dashboard uploads a single image, gets back a Cloudinary URL
// to store on whichever section/item it belongs to.
router.post('/', auth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  res.json({ url: req.file.path, publicId: req.file.filename });
});

module.exports = router;
