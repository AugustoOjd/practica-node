const { Router } = require('express');

const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoriaId } = require('../controllers/categorias');
const { existeCategoriaId } = require('../helpers/db-validators');
const { validarJWT, validarCampos } = require('../middlewares');

const router = Router()



router.get('/', obtenerCategorias)

router.get('/:id', [
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom( existeCategoriaId ),
    validarCampos
], obtenerCategoriaId)

// Crear privador
router.post('/:id', [
    validarJWT,
    check('name', 'El no nombre es obligatorio').notEmpty(),
    validarCampos
], crearCategoria)


// actualizar privado
router.put('/:id', (req, res)=>{
    res.json({msg: 'put admin'})
})

// Delete solo admin
router.delete('/:id', (req, res)=>{
    res.json({msg: 'delete admin'})
})


module.exports = router
