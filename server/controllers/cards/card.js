const { Card } = require('../../models');
const auth = require('../../middelware/auth');

module.exports = async (req, res) => {
  const authHeader = await auth(req);
  console.log('authHeader');
  console.log(authHeader);
  if (!authHeader) {
    res.status(400).send({ data: null, message: 'invalid access token' });
  }
  const cards = await Card.findAll({
    where: { user_id: authHeader.iat },
  });
  if (!cards) {
    return res.status(404).send({ message: 'not found' });
  }
  const card = cards.map((el) => {
    return {
      id: el.id,
      card: el.card,
    };
  });
  res.status(200).send(card);
};
