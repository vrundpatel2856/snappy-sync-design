const Item = require("../models/Item");
const User = require("../models/User");
const Swap = require("../models/Swap");

exports.getLandingData = async (req, res) => {
  try {
    const featuredItems = await Item.find({ status: "Available" })
      .sort({ createdAt: -1 }) // most recent
      .limit(6)
      .populate("uploader", "name avatar");

    const userCount = await User.countDocuments();
    const itemCount = await Item.countDocuments();
    const swapCount = await Swap.countDocuments();

    res.json({
      featuredItems,
      stats: {
        users: userCount,
        items: itemCount,
        swaps: swapCount
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to load landing page data" });
  }
};
