const express = require('express');
const path = require('path');

const { PORT = 3000, BASE_PATH } = process.env;

const app = express();

const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', usersRoute);
app.use('/', cardsRoute);

app.get('*',(req,res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
app.listen(PORT, () => {

});