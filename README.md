# AlexTsarenkov.github.io
## Yandex Praktikum module 13 homework
-----
## О проекте. 
Данный проект является домашней работой по курсу web разработки Яндекс.Практикума.
## Функционал. 
Проект демонстрирует возможности web-сервер на express, а так же работу с mongoDB.
-----
 Запрос | Функционал
 --- | ---
 GET localhost:3000/users	| список всех пользователей
 GET localhost:3000/users/id	| пользователь с переданным id } 
 POST localhost:3000/users | создает пользователя
 PATCH localhost:3000/users/me | обновляет информацию о текущем пользователе (имя, био)
 PATCH localhost:3000/users/me/avatar | обновляет информацию о текущем пользователе (аватар)
 GET localhost:3000/cards	| список всех карточек    
 GET localhost:3000/cards/id | карточка с переданным id
 POST localhost:3000/cards | создает карточку
 DELETE localhost:3000/cards/id | удаляет карточку по id
 PUT localhost:3000/cards/id/likes | ставит лайк карточке по id
 DELETE localhost:3000/cards/id/likes | убирает лайк карточке по id
Несуществующий адрес	| { "message": "Запрашиваемый ресурс не найден" }
## Установка.
### Необходимые пакеты.
Пакет | Установка
--- | ---
express | npm i express --save-dev
nodemon | npm i nodemon --save-dev
eslint | npm i eslint-config-airbnb-base 
eslint | npm i eslint-plugin-import --save-dev
mongoDB | npm i mongoose
body-parser | npm i body-parsers
### Запуск
Билд | Команда
--- | ---
dev | npm run dev
production | npm run start
mongoDB | mongod --dbpath ~/data/db

