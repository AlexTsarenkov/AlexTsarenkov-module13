const { celebrate } = require('celebrate');
const router = require('express').Router();
const { postCardValidator } = require('../validators/validators');
const {
  getCards, postCard, deleteCard, addLikeToCard, removeLikeFromCard,
} = require('../controllers/cards.js');

router.get('/', getCards);
router.post('/', celebrate(postCardValidator), postCard);
router.delete('/:id', deleteCard);
router.put('/:cardId/likes', addLikeToCard);
router.delete('/:cardId/likes', removeLikeFromCard);

module.exports = router;
