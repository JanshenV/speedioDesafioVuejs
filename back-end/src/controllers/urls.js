const knex = require('../database/connection');
const yupUrl = require('../validations/yupUrl');

async function CreateUrl(req, res) {
    const {
        url_address,
        title,
        visits
    } = req.body;

    const user = req.user;

    try {
        await yupUrl.validate(req.body);

        const existingUrl = await knex('url')
            .where({ url_address })
            .first();

        if (existingUrl) {
            return res.status(400).json({
                message: 'Url já existente.'
            });
        };

        const urlData = {
            user_id: user.id,
            url_address,
            title,
            visits
        };

        await knex('url')
            .insert(urlData);

        return res.status(201).json({
            message: 'Url criada com sucesso.'
        });


    } catch ({ message }) {
        return res.status(400).json({
            message
        });
    };
};

async function DeleteUrl(req, res) {
    const { id } = req.params;
    const user = req.user;

    if (!id) {
        return res.status.json({
            message: 'Paramêtro de url é obrigatório.'
        });
    };

    try {
        const url = await knex('url')
            .where({
                id,
                user_id: user.id
            })
            .first();

        if (!url) {
            return res.status(404).json({
                message: 'Url não encontrada ou não pertence ao usuário.'
            });
        };


        await knex('url')
            .del()
            .where({
                id,
                user_id: user.id
            });

        return res.status(200).json({
            message: 'Url removida.'
        });


    } catch ({ message }) {
        return res.status(400).json({
            message
        });
    };
};

module.exports = {
    CreateUrl,
    DeleteUrl
};