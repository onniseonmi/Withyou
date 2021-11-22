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
  editImage: async (req, res) => {
    const authorization = req.headers['authorization'];
    const token = authorization.split(' ')[1];
    const data = verify(token, process.env.ACCESS_SECRET);
    if (!data) {
      res.status(404).send('token expired');
    }
    await User.update(
      {
        image: req.body.image,
      },
      { where: { email: data.email } }
    );
    const userInfo = await User.findOne({ where: { email: data.email } });
    res.send({
      image: userInfo.image,
    });
  },
};
