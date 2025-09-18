const multer = require('multer');
const path = require('path');

// Configure disk storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // The 'uploads' folder must exist in your project's root directory.
    // If not, create it: mkdir uploads
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Generate a unique filename by appending a timestamp to the original filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Create the Multer upload instance
const uploadiconcategory = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // Set a 5MB file size limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only images (jpg, jpeg, png)
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only images (JPEG/PNG) are allowed!'));
  }
});

module.exports = uploadiconcategory;