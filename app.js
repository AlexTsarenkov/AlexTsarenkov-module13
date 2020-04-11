const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT } = require('./config/config');

const app = express();
const { userRoute, loginRoute } = require('./routes/users');
const cardsRoute = require('./routes/cards');
const { auth } = require('./middlewares/auth.js');

require('dotenv').config();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use('/', loginRoute);
app.use('/users', auth, userRoute);
app.use('/cards', auth, cardsRoute);

app.all('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
app.listen(PORT);
