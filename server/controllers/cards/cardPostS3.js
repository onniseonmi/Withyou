const { Card } = require('../../models');
const auth = require('../../middleware/auth');

module.exports = async (req, res) => {
  try {
    const authHeader = await auth(req);
    if (!authHeader) {
      return res
        .status(400)
        .send({ data: null, message: 'invalid access token' });
    }
    const cardUrl = await req.file.location; // 이미지 URL 정보가 담긴 곳
    const found = await Card.findOne({
      where: { user_id: authHeader.id },
    });
    if (!found) {
      return res.status(404).send({ message: 'not found' });
    }
    console.log('found');
    console.log(found);
    const cardUp = await Card.create({
      user_id: authHeader.id,
      card: cardUrl,
    });
    res.status(201).json({
      card: cardUp.dataValues.card,
      message: '데이터가 저장되었습니다.',
    });
  } catch (err) {
    console.log('err.message');
    res.send({ message: 'upload err' });
  }
};
