const express = require("express");
const router = express.Router();
const {
  requestSwap,
  redeemItem,
  getMySwaps,
  updateSwapStatus
} = require("../controllers/swapController");

const { protect } = require("../middleware/authMiddleware");

router.post("/request", protect, requestSwap);
router.post("/redeem", protect, redeemItem);
router.get("/", protect, getMySwaps);
router.patch("/:id/status", protect, updateSwapStatus);

module.exports = router;

