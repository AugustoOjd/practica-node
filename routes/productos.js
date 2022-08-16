const { Router, request, response } = require('express');
const { crearProducto, 
        obtenerProductos,
        obtenerProductoId, 
        actualizarProducto,
        borrarProducto
        
        } = require('../controllers/productos');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { existeCategoriaId, existeProductoId } = require('../helpers/db-validators');
const { check } = require('express-validator');

const router = Router()


router.get('/', [
], obtenerProductos)


router.get('/:id', [
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeProductoId),
    validarCampos
], obtenerProductoId)

router.put('/:id', [
    validarJWT,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeProductoId),
    validarCampos
], actualizarProducto)


router.post('/', [
    validarJWT,
    check('name', 'El no nombre es obligatorio').notEmpty(),
    check('category', 'No es un id de mongo').isMongoId(),
    check('category').custom(existeCategoriaId),
    validarCampos
], crearProducto)

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeProductoId),
    validarCampos
], borrarProducto)


module.exports = router
