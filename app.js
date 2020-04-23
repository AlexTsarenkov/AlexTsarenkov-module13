require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { errors } = require('celebrate');
const { PORT } = require('./config/config');

const app = express();
const { userRoute, loginRoute } = require('./routes/users');
const cardsRoute = require('./routes/cards');
const { auth } = require('./middlewares/auth.js');
const { error } = require('./middlewares/error.js');
const { requestLogger, errorLogger } = require('./middlewares/logger.js');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадет');
  }, 0);
});

app.use('/', loginRoute);
app.use('/users', auth, userRoute);
app.use('/cards', auth, cardsRoute);

app.all('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(PORT);
