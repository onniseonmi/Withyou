const { User } = require("../../models");
const { verify } = require("jsonwebtoken");
module.exports = {
  getProfile: async (req, res) => {
    const authorization = req.headers["authorization"];
    const token = authorization.split(" ")[1];
    const data = verify(token, process.env.ACCESS_SECRET);
    if (!data) {
      res.status(404).send("token expired");
    }
    const userInfo = await User.findOne({
      where: {
        email: data.email,
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
    const authorization = req.headers["authorization"];
    const token = authorization.split(" ")[1];
    const data = verify(token, process.env.ACCESS_SECRET);
    if (!data) {
      res.status(404).send("token expired");
    }
    await User.update(
      {
        username: req.body.username,
        mobile: req.body.mobile,
      },
      { where: { email: data.email } }
    );
    const userInfo = await User.findOne({ where: { email: data.email } });
    res.send({
      email: userInfo.email,
      username: userInfo.username,
      mobile: userInfo.mobile,
    });
  },
  editImage: async (req, res) => {
    const authorization = req.headers["authorization"];
    const token = authorization.split(" ")[1];
    const data = verify(token, process.env.ACCESS_SECRET);
    if (!data) {
      res.status(404).send("token expired");
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
