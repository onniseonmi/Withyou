const express = require('express');
const router = express.Router();
const { profile } = require('../controllers');
const { profileUpload } = require('../routes/multer');
const { User } = require('../models');
const auth = require('../middelware/auth');
router.get('/', profile.getProfile);
router.post('/', profile.editProfile);
// router.post('/image', profile.editImage);

router.put('/image', profileUpload.single('img'), async (req, res, err) => {
  if (err) {
    console.log('err.message');
  }
  console.log('image!!!');
  console.log(req);
  const authHeader = await auth(req);

  if (!authHeader) {
    return res
      .status(400)
      .send({ data: null, message: 'invalid access token' });
  }
  const profileUrl = await req.file.location; // 이미지 URL 정보가 담긴 곳
  await User.update(
    { image: profileUrl },
    { where: { email: authHeader.email } }
  );
  const userInfo = await User.findOne({ where: { email: authHeader.email } });
  return res.send({
    image: userInfo.image,
    message: '프로필 사진이 등록되었습니다.',
  });
}); // S3에 이미지 업로드 라우터

module.exports = router;
