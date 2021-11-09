const express = require("express");
const router = express.Router();
const {
  signin,
  signup,
  signout,
  deleteAccount,
  callback,
  kakao,
  naver,
} = require("../controllers");
// const auth = require('../middelware/auth');

/* GET users listing. */
router.post("/signin", signin);
router.post("/signup", signup);
router.get("/signout", signout);
router.get("/delete", deleteAccount);
router.post("/callback", callback);
router.get("/kakao", kakao);
router.get("/naver", naver);
module.exports = router;
