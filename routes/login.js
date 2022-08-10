const { Router } = require('express');
const { authLogin } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router()


router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').notEmpty(),
    validarCampos
],authLogin)


module.exports= router


