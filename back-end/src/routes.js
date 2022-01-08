const express = require('express');
const routes = express();

const {
    UserSignUp,
    UserLogin
} = require('./controllers/users.js');

const {
    CreateUrl,
    DeleteUrl
} = require('./controllers/urls.js');

const AnonymousUser = require('./middleware/anonimousUser');
const ValidateToken = require('./middleware/validateToken');

routes.use(AnonymousUser);

routes.post('/users', UserSignUp);
routes.post('/users/login', UserLogin);

routes.use(ValidateToken);

routes.post('/url', CreateUrl);
routes.delete('/url/:id', DeleteUrl);

module.exports = routes;