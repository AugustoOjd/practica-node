const { response, request } = require("express");
const { subirArchivo } = require('../helpers')


const cargarArchivos = async (req = request, res = response)=>{

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).json('No hay archivos para subir.');
        return;
    }

    if (!req.files.archivo || Object.keys(req.files).length === 0) {
        res.status(400).json('No hay archivos para subir.');
        return;
    }

    try {
        const upload = await subirArchivo(req.files, undefined, 'imgs')

        return res.status(201).json({
            path: upload
        })
    } catch (msg) {
        return res.status(400).json(msg)
    }

}

const actImagen = async (req, res = response) =>{

    const { coleccion, id } = req.params

    return res.status(200).json({
        coleccion, 
        id
    })
}



module.exports = {
    cargarArchivos,
    actImagen
}