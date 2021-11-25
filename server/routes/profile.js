const express = require("express");
const router = express.Router();
const { profile } = require("../controllers");
const { profileUpload } = require("../middelware/multerS3");
const localProfileUpload = require("../middelware/multer");
const upload = require("../controllers/profile/upload");
const uploadS3 = require("../controllers/profile/uploadS3");
const { User } = require("../models");
router.get("/", profile.getProfile);
router.post("/", profile.editProfile);
router.put("/image", localProfileUpload.single("img"), upload); // S3에 이미지 업로드 라우터

module.exports = router;
