const router = require('express').Router();
const fs = require('fs');

const cards = JSON.parse(fs.readFileSync('./data/cards.json', 'utf8'));

router.get('/cards', (req,res) => {
  res.send(cards);
});

module.exports = router;