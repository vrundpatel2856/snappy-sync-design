const express = require("express");
const router = express.Router();
const {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  updateStatus
} = require("../controllers/itemController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createItem);
router.get("/", getAllItems);
router.get("/:id", getItemById);
router.put("/:id", protect, updateItem);
router.delete("/:id", protect, deleteItem);
router.patch("/:id/status", protect, updateStatus);

module.exports = router;
