const { User } = require('../../../models');
module.exports = async (req, res) => {
  console.log('req.body');
  console.log(req.body);
  const { username, email, image, mobile } = req.body;
  const userInfo = await User.create({
    email,
    username,
    mobile,
    image,
  });
  res.status(201).json(userInfo);
};
