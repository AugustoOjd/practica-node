const { response, request } = require('express');
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')



const usuariosGet = async (req = request, res = response) => {

    // const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    const { limite = 5, desde = 0 } = req.query

    const query = {state: true}

    // const user = await Usuario.find(query)
            // .skip(Number(desde))
            // .limit(Number(limite))

    // const total = await Usuario.countDocuments(query)

    const [total, usuario] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    return res.status(200).json({
        total, usuario
    })
}

const usuariosPost = async (req, res = response) => {

    const { name, email, password, role} = req.body;
    const usuario = new Usuario( {name, email, password, role} )

    const salt = bcrypt.genSaltSync()
    usuario.password = bcrypt.hashSync( password, salt)

    await usuario.save()

    res.status(201).json({
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
        usuario
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params

    const uid = req.uid

    const user = await Usuario.findByIdAndUpdate(id, { state: false})

    res.status(200).json({user, uid})
}





module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}