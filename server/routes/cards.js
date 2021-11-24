const express = require('express');
const router = express.Router();
const { card, deleteCard, postCard } = require('../controllers');

/* GET POST card listing. */
router.get('/', card);
router.get('/delete/:id', deleteCard);
router.post('/post', postCard);

module.exports = router;
