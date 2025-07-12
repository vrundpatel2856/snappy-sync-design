const User = require("../models/User");
const Item = require("../models/Item");

exports.addToFavorites = async (req, res) => {
  const { itemId } = req.params;

  const user = await User.findById(req.user._id);

  if (user.favorites.includes(itemId)) {
    return res.status(400).json({ message: "Item already in favorites" });
  }

  user.favorites.push(itemId);
  await user.save();

  res.json({ message: "Item added to favorites" });
};

exports.removeFromFavorites = async (req, res) => {
  const { itemId } = req.params;

  await User.findByIdAndUpdate(req.user._id, {
    $pull: { favorites: itemId }
  });

  res.json({ message: "Item removed from favorites" });
};

exports.getFavorites = async (req, res) => {
  const user = await User.findById(req.user._id).populate("favorites");

  res.json(user.favorites);
};
