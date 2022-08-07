const { response, request } = require('express');
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')



const usuariosGet = (req = request, res = response) => {

    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page, 
        limit
    });
}

const usuariosPost = async (req, res = response) => {

    const { name, email, password, role} = req.body;
    const usuario = new Usuario( {name, email, password, role} )

    const existeEmail = await Usuario.findOne({email})
    if(existeEmail){
        return res.status(400).json({ msg: 'Correo duplicado'})
    }


    const salt = bcrypt.genSaltSync()
    usuario.password = bcrypt.hashSync( password, salt)

    await usuario.save()

    res.status(201).json({
        msg: 'post API - usuariosPost',
        usuario
    });
}

const usuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - usuariosPut',
        id
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - usuariosDelete'
    });
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}