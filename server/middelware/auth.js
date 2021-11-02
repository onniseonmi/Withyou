const { User } = require('../models');
const jwt = require('jsonwebtoken');

const AUTH_ERROR = { message: 'Authentication Error' };
const ACCESS_SECRET = process.env.ACCESS_SECRET;

module.exports = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!(authHeader && authHeader.startsWith('Bearer '))) {
    return res.status(401).send(AUTH_ERROR);
  }

  const token = authHeader.split(' ')[1];
  // TODO: Make it secure!

  jwt.verify(token, ACCESS_SECRET, async (error, decoded) => {
    if (!decoded) {
      return;
    } else if (error) {
      return res.status(401).send({ message: 'Authentication compare' });
    }
    const { email } = decoded;
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(401).send(AUTH_ERROR);
    }
    res
      .status(200)
      .json({ data: { userInfo: user.dataValues }, message: '성공!!!!' });
    console.log('auth req');
    console.log(req.body);
    next();
  });
};
