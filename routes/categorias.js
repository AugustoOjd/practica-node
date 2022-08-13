const { Router } = require('express');

const { check } = require('express-validator');
const { crearCategoria } = require('../controllers/categorias');
const { validarJWT, validarCampos } = require('../middlewares');

const router = Router()



router.get('/', (req, res)=>{
    

    res.json({ msg: 'todo ok'})
})

router.get('/:id', (req, res)=>{
    res.json({ msg: 'id'})
})

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
