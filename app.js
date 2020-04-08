const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT } = require('./config/config');

const app = express();
const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use((req, res, next) => {
  req.body.user = {
    _id: '5e80486c03e0ba2ac67908a1',
  };
  next();
});
app.use('/users', usersRoute);
app.use('/cards', cardsRoute);

app.all('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
app.listen(PORT);
