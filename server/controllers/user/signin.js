const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const ACCESSEXPIREINDAYS = process.env.ACCESSEXPIREINDAYS;
const REFRESHEXPIREINDAYS = process.env.REFRESHEXPIREINDAYS;
// const bcryptSaltRounds = 12;

module.exports = async (req, res) => {
  const { email, password } = req.body;
  const userInfo = await User.findOne({
    where: { email },
  });
  if (!userInfo) {
    return res.status(401).send({ message: 'Invalid email' });
  }
  const isValidPassword = await bcrypt.compare(password, userInfo.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  const accessToken = createAccessToken(userInfo.email);
  const refreshToken = createRefreshToken(userInfo.email);

  res
    .status(200)
    .cookie('refreshToken', refreshToken)
    .json({ accessToken, email });
};

function createAccessToken(email) {
  return jwt.sign({ email }, ACCESS_SECRET, { expiresIn: ACCESSEXPIREINDAYS });
}
function createRefreshToken(email) {
  return jwt.sign({ email }, REFRESH_SECRET, {
    expiresIn: REFRESHEXPIREINDAYS,
  });
}
