const express = require("express");
const router = express.Router();
const {
  getPendingItems,
  approveItem,
  rejectItem,
  deleteItem,
  getAdminDashboard
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/isAdmin");

router.use(protect, isAdmin); // Admin guard for all routes below

router.get("/items/pending", getPendingItems);
router.patch("/items/:id/approve", approveItem);
router.patch("/items/:id/reject", rejectItem);
router.delete("/items/:id", deleteItem);
router.get("/dashboard", getAdminDashboard);

module.exports = router;
