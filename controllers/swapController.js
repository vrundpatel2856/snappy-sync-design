const Swap = require("../models/Swap");
const Item = require("../models/Item");
const User = require("../models/User");

exports.requestSwap = async (req, res) => {
  const { offeredItemId, requestedItemId } = req.body;

  const requestedItem = await Item.findById(requestedItemId);
  if (!requestedItem || requestedItem.status !== "Available") {
    return res.status(400).json({ message: "Requested item not available" });
  }

  const swap = await Swap.create({
    type: "swap",
    requester: req.user._id,
    owner: requestedItem.uploader,
    offeredItem: offeredItemId,
    requestedItem: requestedItemId,
  });

  res.status(201).json({ message: "Swap request sent", swap });
};

exports.redeemItem = async (req, res) => {
  const { itemId } = req.body;
  const item = await Item.findById(itemId);
  const pointsRequired = 50; // define logic or dynamic based on item

  if (!item || item.status !== "Available")
    return res.status(400).json({ message: "Item not available" });

  if (req.user.points < pointsRequired)
    return res.status(400).json({ message: "Not enough points" });

  req.user.points -= pointsRequired;
  item.status = "Swapped";
  await req.user.save();
  await item.save();

  const swap = await Swap.create({
    type: "redeem",
    requester: req.user._id,
    owner: item.uploader,
    redeemedItem: item._id,
    status: "Completed",
    pointsUsed: pointsRequired
  });

  res.status(201).json({ message: "Item redeemed via points", swap });
};

exports.getMySwaps = async (req, res) => {
  const swaps = await Swap.find({ requester: req.user._id })
    .populate("offeredItem requestedItem redeemedItem", "title")
    .sort("-createdAt");

  res.json(swaps);
};

exports.updateSwapStatus = async (req, res) => {
  const swap = await Swap.findById(req.params.id);
  if (!swap) return res.status(404).json({ message: "Swap not found" });

  const isOwner = swap.owner?.toString() === req.user._id.toString();
  const isRequester = swap.requester?.toString() === req.user._id.toString();

  if (!isOwner && !isRequester) {
    return res.status(403).json({ message: "Not authorized" });
  }

  swap.status = req.body.status;
  await swap.save();

  if (req.body.status === "Accepted") {
    const requestedItem = await Item.findById(swap.requestedItem);
    requestedItem.status = "Swapped";
    await requestedItem.save();
  }

  res.json({ message: "Swap status updated", swap });
};
