const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivos, actImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router()


router.post('/', cargarArchivos )


router.put('/:coleccion/:id', [
    check('id', 'El id debe ser id de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos'] ) ),
    validarCampos
], actImagen)

module.exports= router