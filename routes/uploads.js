const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivos, actImagen, mostrarImage, actImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validarCampos, validarArchivo } = require('../middlewares');

const router = Router()


router.post('/', validarArchivo, cargarArchivos )


router.put('/:coleccion/:id', [
    validarArchivo, 
    check('id', 'El id debe ser id de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos'] ) ),
    validarCampos
], actImagenCloudinary
// actImagen
)


router.get('/:coleccion/:id', [
    check('id', 'El id debe ser id de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos'] ) ),
    validarCampos
], mostrarImage)

module.exports= router