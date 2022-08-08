const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { usuariosGet, usuariosPut,usuariosPost,usuariosDelete,usuariosPatch } = require('../controllers/usuarios');
const { esRoleValido, emailExiste, idExisteUser } = require('../helpers/db-validators')


const router = Router();


router.get('/', usuariosGet );

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( idExisteUser ),
    check('role').custom( esRoleValido ),
    validarCampos
], usuariosPut );

router.post('/', [
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('password', 'El password debe tener mas de 6 caracteres y maximo 12').isLength({min: 6, max: 12}),
    check('email').custom( emailExiste ),
    // check('rol', 'El rol no es valido').isIn(['admin', 'client']),
    check('role').custom( esRoleValido ),
    validarCampos
], usuariosPost );

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( idExisteUser ),
], usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;