const { response, request } = require("express");
const { subirArchivo } = require('../helpers')
const { Usuario, Producto } = require('../models')
const path = require('path')
const fs = require('fs')
const cloudinary = require('cloudinary').v2

cloudinary.config( process.env.CLOUDINARY_URL )


const cargarArchivos = async (req = request, res = response)=>{

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

    let modelo

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById( id )

            if(!modelo){
                return res.status(400).json({msg: `No existe un usuario con id: ${id}`})
            }
        
        break;

        case 'productos':
            modelo = await Producto.findById( id )

            if(!modelo){
                return res.status(400).json({msg: `No existe un producto con id: ${id}`})
            }
        break;

        default:
            res.status(500).json({ msg: 'Falto validar esto'})
    }

    // Limpiar imagen previa

    try {
        if(modelo.img){

            const pathImage = path.join(__dirname, '../uploads', coleccion, modelo.img)

            if(fs.existsSync( pathImage )){
                fs.unlinkSync( pathImage )
            }
        }


    } catch (error) {
        console.log(error)
    }

    const nombre = await subirArchivo(req.files, undefined, coleccion)
    modelo.img = nombre

    await modelo.save()

    return res.status(200).json(modelo)
}

const actImagenCloudinary = async (req, res = response) =>{

    const { coleccion, id } = req.params

    let modelo

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById( id )

            if(!modelo){
                return res.status(400).json({msg: `No existe un usuario con id: ${id}`})
            }
        
        break;

        case 'productos':
            modelo = await Producto.findById( id )

            if(!modelo){
                return res.status(400).json({msg: `No existe un producto con id: ${id}`})
            }
        break;

        default:
            res.status(500).json({ msg: 'Falto validar esto'})
    }

    // Limpiar imagen previa

    try {
        if(modelo.img){

        }


    } catch (error) {
        console.log(error)
    }

    const { tempFilePath } = req.files.archivo
    const {secure_url} = await cloudinary.uploader.upload( tempFilePath )

    modelo.img = secure_url

    await modelo.save()

    return res.status(200).json(modelo)
}

const mostrarImage = async ( req, res = response)=>{

    const { coleccion, id } = req.params

    let modelo

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById( id )

            if(!modelo){
                return res.status(400).json({msg: `No existe un usuario con id: ${id}`})
            }
        
        break;

        case 'productos':
            modelo = await Producto.findById( id )

            if(!modelo){
                return res.status(400).json({msg: `No existe un producto con id: ${id}`})
            }
        break;

        default:
            res.status(500).json({ msg: 'Falto validar esto'})
    }

    // Limpiar imagen previa

    try {
        if(modelo.img){

            const pathImage = path.join(__dirname, '../uploads', coleccion, modelo.img)

            if(fs.existsSync( pathImage )){
                return res.sendFile(pathImage)
            }
        }


    } catch (error) {
        console.log(error)
    }

    const imageError = path.join(__dirname, '../assets/no-image.png')


    return res.sendFile(imageError)
}





module.exports = {
    cargarArchivos,
    actImagen,
    mostrarImage,
    actImagenCloudinary
}