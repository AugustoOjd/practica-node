const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const validarJWT = (req = request , res = response, next)=>{

    const token = req.header('x-token')

    if(!token){
        return res.status(401).json({msg: 'no existen el token'})
    }

    try {
        

        const { uid } = jwt.verify( token, process.env.SECRET_KEY_JWT )

        req.uid = uid

        next()
    } catch (error) {    


        console.log(error)
        return res.status(401).json({msg: 'Token no valido'})
    }

}


module.exports = {
    validarJWT
}