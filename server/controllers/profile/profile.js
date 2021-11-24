const { User } = require('../../models');
const { verify } = require('jsonwebtoken');
const auth = require('../../middelware/auth');

module.exports = {
  getProfile: async (req, res) => {
    const authHeader = await auth(req);
    if (!authHeader) {
      res.status(400).send({ data: null, message: 'invalid access token' });
    }
    const userInfo = await User.findOne({
      where: {
        email: authHeader.email,
      },
    });
    res.send({
      email: userInfo.email,
      username: userInfo.username,
      mobile: userInfo.mobile,
      image: userInfo.image,
    });
  },
  editProfile: async (req, res) => {
    const authHeader = await auth(req);
    if (!authHeader) {
      res.status(400).send({ data: null, message: 'invalid access token' });
    }
    await User.update(
      {
        username: req.body.username,
        mobile: req.body.mobile,
      },
      { where: { email: authHeader.email } }
    );
    const userInfo = await User.findOne({ where: { email: authHeader.email } });
    res.send({
      email: userInfo.email,
      username: userInfo.username,
      mobile: userInfo.mobile,
    });
  },
  editImage: async (req, res, err) => {
    if (err) {
      console.log('err.message');
    }

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
  }, // S3에 이미지 업로드 라우터
};
