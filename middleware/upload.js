const path = require('path');
const multer = require('multer');

// Define storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Save file with its original name
  }
});

// Configure file upload restrictions and validation
const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    const allowedMimeTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Only PDF, JPEG, and PNG files are supported.'));
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB file size limit
  }
});


module.exports = upload;