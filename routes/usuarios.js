const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { usuariosGet, usuariosPut,usuariosPost,usuariosDelete,usuariosPatch } = require('../controllers/usuarios');
const Role = require('../models/role')


const router = Router();


router.get('/', usuariosGet );

router.put('/:id', usuariosPut );

router.post('/', [
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('password', 'El password debe tener mas de 6 caracteres y maximo 12').isLength({min: 6, max: 12}),
    check('email', 'El correo no es valido').isEmail(),
    // check('rol', 'El rol no es valido').isIn(['admin', 'client']),
    check('role').custom( async (role = '') => {
        const existeRole = await Role.findOne({ role })
        if(!existeRole){
            throw new Error(`El rol ${role} no es valido`)
        }
    }),
    validarCampos
], usuariosPost );

router.delete('/', usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;