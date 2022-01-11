const express = require('express');
const routes = express();

const {
    UserSignUp,
    UserLogin,
    UserProfile
} = require('./controllers/users.js');

const {
    CreateUrl,
    DeleteUrl,
    AllUrl,
    EditUrl
} = require('./controllers/urls.js');

const AnonymousUser = require('./middleware/anonimousUser');
const ValidateToken = require('./middleware/validateToken');

routes.use(AnonymousUser);

routes.post('/users', UserSignUp);
routes.post('/users/login', UserLogin);

routes.use(ValidateToken);

routes.get('/users/profile', UserProfile);

routes.post('/url', CreateUrl);
routes.delete('/url/:id', DeleteUrl);
routes.get('/url', AllUrl);
routes.put('/url/:id', EditUrl);

module.exports = routes;