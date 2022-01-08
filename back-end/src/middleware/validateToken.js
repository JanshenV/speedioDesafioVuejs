const jwt = require('jsonwebtoken');
const knex = require('../database/connection');

async function ValidateToken(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(400).json({
            message: 'Authorization em falta.'
        });
    };

    try {

        const token = authorization.replace('Bearer ', '').trim();
        const { id } = jwt.verify(token, process.env.SECRET_JWT);

        const user = await knex('users')
            .where({ id })
            .first();

        if (!user) {
            return res.status(404).json({
                message: 'Token inválido.'
            });
        };

        const { password: _, ...userData } = user;
        req.user = userData;
        return next();

    } catch ({ message }) {
        return res.status(400).json({
            message
        });
    };
};


module.exports = ValidateToken;