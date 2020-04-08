const router = require('express').Router();
const {
  getCards, postCard, deleteCard, addLikeToCard, removeLikeFromCard,
} = require('../controllers/cards.js');

router.get('/', getCards);
router.post('/', postCard);
router.delete('/:id', deleteCard);
router.put('/:cardId/likes', addLikeToCard);
router.delete('/:cardId/likes', removeLikeFromCard);

module.exports = router;
