const express = require("express");
const router = express.Router();
const { card, deleteCard, postCard } = require("../controllers");
const profileUpload = require("../middleware/multerS3");
const localProfileUpload = require("../middleware/multer");

/* GET POST card listing. */
router.get("/", card);
router.get("/delete/:id", deleteCard);

// local version : client 에서 보낸 이미지는 /server/public/uploads 에 들어갑니다.
router.put("/post", localProfileUpload.single("img"), postCard);

// S3 version : client 에서 보낸 이미지는 S3 에 들어갑니다.
// router.put("/image", profileUpload.single("img"), postCard);
// router.post("/post", postCard);

module.exports = router;
