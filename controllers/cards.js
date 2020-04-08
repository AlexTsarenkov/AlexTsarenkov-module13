const Card = require('../model/card');

const getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: `Server cannot resolve query: ${err}` }));
};

const postCard = (req, res) => {
  const { name, link, user } = req.body;

  Card.create({ name, link, owner: user._id })
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: `Server cannot create card: ${err}` }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(() => new Error('Not Found'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.message === 'Not Found') res.status(404).send({ error: 'card does not exist' });
      else res.status(500).send({ message: `Server cannot delete card: ${err}` });
    });
};

const addLikeToCard = (req, res) => {
  const { user } = req.body;

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: user._id } },
    { new: true },
  )
    .orFail(() => new Error('Not Found'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.message === 'Not Found') res.status(404).send({ error: 'card does not exist' });
      else res.status(500).send({ message: `Server cannot update card likes: ${err}` });
    });
};

const removeLikeFromCard = (req, res) => {
  const { user } = req.body;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: user._id } },
    { new: true },
  )
    .orFail(() => new Error('Not Found'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.message === 'Not Found') res.status(404).send({ error: 'card does not exist' });
      else res.status(500).send({ message: `Server cannot update card likes: ${err}` });
    });
};

module.exports = {
  getCards, postCard, deleteCard, addLikeToCard, removeLikeFromCard,
};
