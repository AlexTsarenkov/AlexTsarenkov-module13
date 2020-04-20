const Card = require('../model/card');

const getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: `Server cannot resolve query: ${err}` }));
};

const postCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: `Server cannot create card: ${err}` }));
};

const deleteCard = (req, res) => {
  Card.findById(req.params.id)
    .orFail(() => new Error('Not Found'))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return Promise.reject(new Error('Forbidden'));
      }
      return Card.findByIdAndRemove(req.params.id);
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.message === 'Not Found') res.status(404).send({ error: 'card does not exist' });
      else if (err.message === 'Forbidden') res.status(403).send({ error: 'Forbidden' });
      else res.status(500).send({ message: `Server cannot delete card: ${err}` });
    });
};

const addLikeToCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
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
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
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
