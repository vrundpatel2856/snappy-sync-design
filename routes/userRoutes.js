const express = require("express");
const router = express.Router();
const { getDashboard, updateProfile, getPublicUser } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.get("/dashboard", protect, getDashboard);
router.put("/update", protect, updateProfile);
router.get("/:id", getPublicUser);

module.exports = router;
