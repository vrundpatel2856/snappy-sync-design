const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  type: String,
  size: String,
  condition: String,
  tags: [String],
  images: [String],
  status: { type: String, enum: ["Available", "Swapped", "Pending"], default: "Available" },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Item", itemSchema);
