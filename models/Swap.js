const mongoose = require("mongoose");

const swapSchema = new mongoose.Schema({
  type: { type: String, enum: ["swap", "redeem"], required: true },
  requester: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // for swap/redeem
  offeredItem: { type: mongoose.Schema.Types.ObjectId, ref: "Item" }, // only for swap
  requestedItem: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
  redeemedItem: { type: mongoose.Schema.Types.ObjectId, ref: "Item" }, // for redeem
  status: { type: String, enum: ["Pending", "Accepted", "Rejected", "Cancelled", "Completed"], default: "Pending" },
  pointsUsed: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Swap", swapSchema);
