const express = require('express');
const router = express.Router();
const { signin, signup, signout, deleteAccount } = require('../controllers');

/* GET users listing. */
router.post('/signin', signin);
router.post('/signup', signup);
router.get('/signout', signout);
router.delete('/delete', deleteAccount);

module.exports = router;
