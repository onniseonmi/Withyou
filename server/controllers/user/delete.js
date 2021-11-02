const auth = require('../../middelware/auth');
const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const ACCESS_SECRET = process.env.ACCESS_SECRET;
const AUTH_ERROR = { message: 'Authentication Error' };

module.exports = async (req, res) => {
  const authorization = req.headers['authorization'];
  if (!authorization) {
    res.status(400).send({ data: null, message: 'invalid access token' });
  }
  const token = authorization.split(' ')[1];
  console.log('token');
  console.log(token);

  const decoded = jwt.verify(token, ACCESS_SECRET);
  console.log('decoded');
  console.log(decoded);
  if (!decoded) {
    return res.status(401).json(AUTH_ERROR);
  } else {
    res.end();
  }
};
