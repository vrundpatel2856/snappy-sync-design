const Item = require("../models/Item");
const User = require("../models/User");
const Swap = require("../models/Swap");

exports.getPendingItems = async (req, res) => {
  const items = await Item.find({ status: "Pending" }).populate("uploader", "name");
  res.json(items);
};

exports.approveItem = async (req, res) => {
  const item = await Item.findByIdAndUpdate(
    req.params.id,
    { status: "Available" },
    { new: true }
  );
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json({ message: "Item approved", item });
};

exports.rejectItem = async (req, res) => {
  const item = await Item.findByIdAndUpdate(
    req.params.id,
    { status: "Rejected" },
    { new: true }
  );
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json({ message: "Item rejected", item });
};

exports.deleteItem = async (req, res) => {
  const item = await Item.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json({ message: "Item deleted by admin" });
};

exports.getAdminDashboard = async (req, res) => {
  const userCount = await User.countDocuments();
  const totalItems = await Item.countDocuments();
  const pendingItems = await Item.countDocuments({ status: "Pending" });
  const approvedItems = await Item.countDocuments({ status: "Available" });
  const swapCount = await Swap.countDocuments();
  const completedSwaps = await Swap.countDocuments({ status: "Completed" });
  const pendingSwaps = await Swap.countDocuments({ status: "Pending" });

  res.json({
    users: userCount,
    items: {
      total: totalItems,
      pending: pendingItems,
      approved: approvedItems
    },
    swaps: {
      total: swapCount,
      pending: pendingSwaps,
      completed: completedSwaps
    }
  });
};
