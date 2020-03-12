const router = require('express').Router();
const fs = require('fs');

const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));

router.get('/users', (req,res) => {
  res.send(users);
});

router.get('/users/:id', (req,res) => {
  const { id } = req.params;
  const user = users.find( element => {
    return element._id === id;
  });

  if(user !== undefined){
    res.status(200).send(user);
  } else {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
  }


});

module.exports = router;