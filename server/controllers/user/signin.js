const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const ACCESSEXPIREINDAYS = process.env.ACCESSEXPIREINDAYS;
const REFRESHEXPIREINDAYS = process.env.REFRESHEXPIREINDAYS;
// const bcryptSaltRounds = 12;

module.exports = async (req, res) => {
  const userInfo = await User.findOne({
    where: { email: req.body.email },
  });
  if (!userInfo) {
    return res.status(401).send({ message: "Invalid email" });
  }
  const isValidPassword = await bcrypt.compare(
    req.body.password,
    userInfo.password
  );
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const accessToken = createAccessToken(userInfo.email);
  const refreshToken = createRefreshToken(userInfo.email);
  const { username, mobile, email, image } = userInfo.dataValues;
  res
    .status(200)
    .cookie('refreshToken', refreshToken)
    .json({ accessToken, userInfo: { username, mobile, email, image }});
};

function createAccessToken(email) {
  return jwt.sign({ email }, ACCESS_SECRET, { expiresIn: ACCESSEXPIREINDAYS });
}
function createRefreshToken(email) {
  return jwt.sign({ email }, REFRESH_SECRET, {
    expiresIn: REFRESHEXPIREINDAYS,
  });
}
