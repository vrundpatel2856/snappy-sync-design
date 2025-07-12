const User = require("../models/User");
const Item = require("../models/Item");
const Swap = require("../models/Swap");

exports.getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    const items = await Item.find({ uploader: req.user._id });
    const swaps = await Swap.find({ $or: [{ requester: req.user._id }, { owner: req.user._id }] });
    
    res.json({
      ...user.toObject(),
      items,
      swaps
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to load dashboard", error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, bio, avatar } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.user._id,
      { name, bio, avatar },
      { new: true }
    ).select("-password");
    res.json({ message: "Profile updated", user: updated });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

exports.getPublicUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("name avatar");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err.message });
  }
};
