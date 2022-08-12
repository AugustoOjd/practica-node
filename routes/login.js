const { Router } = require('express');
const { authLogin, googleSignIn } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router()


router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').notEmpty(),
    validarCampos
],authLogin)


router.post('/google', [
    check('id_token', 'El id_token es obligatorio').notEmpty(),
    // check('password', 'El password es obligatorio').notEmpty(),
    validarCampos
],googleSignIn)


module.exports= router


