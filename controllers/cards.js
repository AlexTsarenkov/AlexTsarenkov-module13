const Card = require('../model/card');
const {
  ForbiddenError, NotFoundError,
} = require('../errors/errors');

const getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch(next);
};

const postCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(() => new NotFoundError('card not found'))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return Promise.reject(new ForbiddenError('Forbidden action'));
      }
      return Card.findByIdAndRemove(req.params.id);
    })
    .then((card) => res.send(card))
    .catch(next);
};

const addLikeToCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError('card not found'))
    .then((card) => res.send(card))
    .catch(next);
};

const removeLikeFromCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError('card not found'))
    .then((card) => res.send(card))
    .catch(next);
};

module.exports = {
  getCards, postCard, deleteCard, addLikeToCard, removeLikeFromCard,
};
