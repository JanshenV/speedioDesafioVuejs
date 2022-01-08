const yup = require('./yup');

const yupUrl = yup.object().shape({
    url_address: yup.string().required(),
    title: yup.string().max(20).required(),
    visits: yup.number().required()
});

module.exports = yupUrl;