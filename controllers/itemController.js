const Item = require("../models/Item");

exports.createItem = async (req, res) => {
  try {
    const newItem = await Item.create({ ...req.body, uploader: req.user._id });
    res.status(201).json({ message: "Item listed successfully", item: newItem });
  } catch (err) {
    res.status(500).json({ message: "Failed to list item", error: err.message });
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const query = { ...req.query, status: "Available" };
    const items = await Item.find(query).populate("uploader", "name avatar");
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch items" });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate("uploader", "name avatar");
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch item" });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    if (item.uploader.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to update this item" });
    }
    const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Item updated", item: updated });
  } catch (err) {
    res.status(500).json({ message: "Failed to update item" });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    if (item.uploader.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this item" });
    }
    await item.remove();
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete item" });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    if (item.uploader.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to update status" });
    }
    item.status = req.body.status || item.status;
    await item.save();
    res.json({ message: "Status updated", item });
  } catch (err) {
    res.status(500).json({ message: "Failed to update status" });
  }
};
