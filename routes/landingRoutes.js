const express = require("express");
const router = express.Router();
const { getLandingData } = require("../controllers/landingController");

router.get("/", getLandingData);

module.exports = router;
