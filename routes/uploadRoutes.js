const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../utils/cloudinary");
const upload = multer({ storage });
const { uploadImage } = require("../controllers/uploadController");
const { protect } = require("../middleware/authMiddleware");

router.post("/image", protect, upload.single("image"), uploadImage);

module.exports = router;
