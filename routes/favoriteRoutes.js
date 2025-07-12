const express = require("express");
const router = express.Router();
const {
  addToFavorites,
  removeFromFavorites,
  getFavorites
} = require("../controllers/favoriteController");

const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.post("/:itemId", addToFavorites);
router.delete("/:itemId", removeFromFavorites);
router.get("/", getFavorites);

module.exports = router;
