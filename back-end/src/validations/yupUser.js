const yup = require('./yup');

const yupUserSignUp = yup.object().shape({
    username: yup.string().min(3).max(30).required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
});

const yupUserLogin = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
});


module.exports = {
    yupUserSignUp,
    yupUserLogin
}