exports.uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.json({
    message: "Image uploaded successfully",
    url: req.file.path,          // Cloudinary public URL
    public_id: req.file.filename // Cloudinary public ID
  });
};
