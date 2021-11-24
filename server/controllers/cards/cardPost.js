const { Card } = require('../../models');
const auth = require('../../middelware/auth');

module.exports = async (req, res) => {
  const authHeader = await auth(req);
  if (!authHeader) {
    res.status(400).send({ data: null, message: 'invalid access token' });
  }
  const { card } = req.body;
  const found = await Card.findOne({
    where: { user_id: authHeader.iat },
  });
  if (!found) {
    return res.status(404).send({ message: 'not found' });
  }
  const cardUp = await Card.create({
    card,
    user_id: authHeader.iat,
  });
  res.status(201).json(cardUp);
};
