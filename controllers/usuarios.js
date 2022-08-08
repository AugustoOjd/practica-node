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

    const salt = bcrypt.genSaltSync()
    usuario.password = bcrypt.hashSync( password, salt)

    await usuario.save()

    res.status(201).json({
        msg: 'post API - usuariosPost',
        usuario
    });
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...resto } = req.body

    // validar contra base de datos

    if(password){
        const salt = bcrypt.genSaltSync()
        resto.password = bcrypt.hashSync( password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json({
        msg: 'put API - usuariosPut',
        usuario
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