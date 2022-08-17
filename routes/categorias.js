const { Router } = require('express');

const { check } = require('express-validator');
const { crearCategoria, 
        obtenerCategorias, 
        obtenerCategoriaId, 
        actualizarCategoria,
        borrarCategoria } = require('../controllers/categorias');

const { existeCategoriaId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router()



router.get('/', obtenerCategorias)

router.get('/:id', [
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom( existeCategoriaId ),
    validarCampos
], obtenerCategoriaId)

// Crear privador
router.post('/', [
    validarJWT,
    check('name', 'El no nombre es obligatorio').notEmpty(),
    validarCampos
], crearCategoria)


// actualizar privado
router.put('/:id', [
    validarJWT,
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('id').custom( existeCategoriaId ),
    validarCampos
], actualizarCategoria)


// Delete solo admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom( existeCategoriaId ),
    validarCampos
], borrarCategoria)


module.exports = router
