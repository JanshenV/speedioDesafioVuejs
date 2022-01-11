const knex = require('../database/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    yupUserSignUp,
    yupUserLogin
} = require('../validations/yupUser');


async function UserSignUp(req, res) {
    const {
        username,
        email,
        password
    } = req.body;

    try {
        await yupUserSignUp.validate(req.body);
        const emailLowerCase = email.toLowerCase();
        const existingEmail = await knex('users')
            .where({ email: emailLowerCase })
            .first();


        if (existingEmail) return res.status(400).json({
            message: 'Email já cadastrado.'
        });

        const existingUsername = await knex('users')
            .where({ username })
            .first();

        if (existingUsername) return res.status(400).json({
            message: 'Username já em uso por outro usuário.'
        });

        const encryptedPassword = await bcrypt.hash(String(password), 10);
        const userData = {
            username,
            email: emailLowerCase,
            password: encryptedPassword
        };

        await knex('users')
            .insert(userData);

        return res.status(201).json({
            sucess: 'Usuário cadastrado com sucesso.'
        });

    } catch ({ message }) {
        return res.status(400).json({
            message
        });
    };
};

async function UserLogin(req, res) {
    const {
        email,
        password
    } = req.body;

    try {
        await yupUserLogin.validate(req.body);
        const emailLowerCase = email.toLowerCase();
        const user = await knex('users')
            .where({ email: emailLowerCase })
            .first();

        if (!user) {
            return res.status(404).json({
                message: 'Email e senha não conferem.'
            });
        };

        const passwordCompare = await bcrypt.compare(String(password), user.password);
        if (!passwordCompare) {
            return res.status(400).json({
                message: 'Email e senha não conferem.'
            });
        };

        let token;
        if (user.name === 'anonimo') {
            token = jwt.sign({ id: user.id },
                process.env.SECRET_JWT, { expiresIn: 0 });
        } else {
            token = jwt.sign({ id: user.id },
                process.env.SECRET_JWT, { expiresIn: '8h' });
        };

        return res.status(200).json({
            token
        });
    } catch ({ message }) {
        return res.status(400).json({
            message
        });
    };
};

async function UserProfile(req, res) {
    const user = req.user;
    res.status(200).json(user);
};



module.exports = {
    UserSignUp,
    UserLogin,
    UserProfile
};