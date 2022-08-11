const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

const validarJWT = async (req = request , res = response, next)=>{

    const token = req.header('x-token')

    if(!token){
        return res.status(401).json({msg: 'no existen el token'})
    }

    try {
        

        const { uid } = jwt.verify( token, process.env.SECRET_KEY_JWT )

        const user = await Usuario.findById( uid )

        if(!user){
            return res.status(401).json({ msg: 'Usuario no existe en db'})
        }

        if(!user.state){
            return res.status(401).json({ msg: 'Token no autorizado'})
        }

        req.user = user

        next()
    } catch (error) {    

        console.log(error)
        return res.status(401).json({msg: 'Token no valido'})
    }

}


module.exports = {
    validarJWT
}