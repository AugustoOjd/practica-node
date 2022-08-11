const validaJWT    = require('../middlewares/validar-jwt');
const validaRoles  = require('../middlewares/validar-roles');
const validaCampos = require('../middlewares/validar-campos');


module.exports ={
    ...validaJWT,   
    ...validaRoles, 
    ...validaCampos,
}