const router = require('express').Router();
const fs = require('fs');
const path = require('path');

function readUsersJSON() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf8'));
}

router.get('/users', (req, res) => {
  const users = readUsersJSON();
  res.send(users);
});

router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const users = readUsersJSON();
  const user = users.find((element) => element._id === id);

  if (user !== undefined) {
    res.status(200).send(user);
  } else {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
  }
});


module.exports = router;
