const express = require("express");
const router = express.Router();
const { profile } = require("../controllers");

router.get("/", profile.getProfile);
router.post("/", profile.editProfile);
router.post("/image", profile.editImage);
module.exports = router;
