# AlexTsarenkov.github.io
## Yandex Praktikum module 13 homework
-----
## О проекте. 
Данный проект является домашней работой по курсу web разработки Яндекс.Практикума.
## Функционал. 
Проект демонстрирует возможности web-сервер на express
-----
 Запрос | Функционал
 --- | ---
 GET localhost:3000/users	| JSON-список всех пользователей 
 GET localhost:3000/cards	| JSON-список всех карточек      
 GET localhost:3000/users/8340d0ec33270a25f2413b69	| JSON-пользователя с переданным после /users идентификатором. Если такого нет, API должно возвращать 404 статус ответа и JSON:{ "message": "Нет пользователя с таким id" } 
Несуществующий адрес	| { "message": "Запрашиваемый ресурс не найден" }
## Установка.
### Необходимые пакеты.
Пакет | Установка
--- | ---
express | npm i express --save-dev
nodemon | npm i nodemon --save-dev
eslint | npm i eslint-config-airbnb-base 
eslint | npm i eslint-plugin-import --save-dev
### Запуск
Билд | Команда
--- | ---
dev | npm run dev
production | npm run start

