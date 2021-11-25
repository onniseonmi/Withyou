const express = require('express');
const router = express.Router();
const { profile } = require('../controllers');
const { profileUpload } = require('../middleware/multer');

router.get('/', profile.getProfile);
router.post('/', profile.editProfile);
router.put('/image', profileUpload.single('img'), profile.editImage);

module.exports = router;
