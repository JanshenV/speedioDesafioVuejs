const knex = require('../database/connection');
const bcrypt = require('bcrypt');


async function AnonymousUser(req, res, next) {

    try {
        const anonymousData = {
            username: 'anonimo',
            password: 'anonimo1',
            email: 'anonimo@email.com'
        };

        const existingEmail = await knex('users')
            .where({ email: anonymousData.email })
            .first();

        if (existingEmail) {
            return next();
        };

        const encryptedPassword = await bcrypt.hash(String(anonymousData.password), 10);

        await knex('users')
            .insert({
                ...anonymousData,
                password: encryptedPassword
            });

        return next();
    } catch ({ message }) {
        return res.status(400).json({
            message
        });
    };
};


module.exports = AnonymousUser;