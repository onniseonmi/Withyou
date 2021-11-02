const auth = require('../../middelware/auth');

module.exports = async (req, res) => {
  console.log('req');
  console.log(req);
  const authHeader = auth(req);
  console.log('authHeader');
  console.log(authHeader);
  if (!authHeader) {
    res.status(404).send({ message: 'not authrized' });
  }

  res.clearCookie('refreshToken');
  res.status(204).send({ message: 'logout success' });
};
