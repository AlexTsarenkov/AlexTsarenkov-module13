const { celebrate } = require('celebrate');
const router = require('express').Router();
const { postCardValidator, idValidator } = require('../validators/validators');
const {
  getCards,
  postCard,
  deleteCard,
  addLikeToCard,
  removeLikeFromCard,
} = require('../controllers/cards.js');

router.get('/', getCards);
router.post('/', celebrate(postCardValidator), postCard);
router.delete('/:id', celebrate(idValidator), deleteCard);
router.put('/:id/likes', celebrate(idValidator), addLikeToCard);
router.delete('/:id/likes', celebrate(idValidator), removeLikeFromCard);

module.exports = router;
