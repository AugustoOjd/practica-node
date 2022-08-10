const { request, response } = require('express');
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');


const authLogin = async ( req = request, res = response) =>{

    const { email, password} = req.body

    try {

        const user = await Usuario.findOne({email: email})

        if(!user){
            return res.status(400).json({msg: 'El email es invalido o no existe'})
        }

        if(!user.state){
            return res.status(400).json({msg: 'El usuario no esta disponible'})
        }

        const validPassword = bcrypt.compareSync( password, user.password )

        if(!validPassword){
            return res.status(400).json({msg: 'Password no valido'})
        }

        const token = await generarJWT( user.id )

        return res.status(200).json({email, password, token})

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Consulte con administrador'
        })
    }



    
}


module.exports =  {
    authLogin
}