const Card = require('../model/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: `Server cannot resolve query: ${err}` }));
};

module.exports.postCard = (req, res) => {
  const { name, link, user } = req.body;

  Card.create({ name, link, owner: user._id })
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: `Server cannot create card: ${err}` }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: `Server cannot delete card: ${err}` }));
};

module.exports.addLikeToCard = (req, res) => {
  const { user } = req.body;

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: `Server cannot update card likes: ${err}` }));
};

module.exports.removeLikeFromCard = (req, res) => {
  const { user } = req.body;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: `Server cannot update card likes: ${err}` }));
};
