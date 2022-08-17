const { response, request } = require("express");
const { ObjectId } = require('mongoose').Types ;
const { Usuario, Producto, Categoria } = require("../models");


const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
]


const buscarUsuarios = async (termino = '', res = response)=>{

    const esMongoId = ObjectId.isValid( termino )

    if( esMongoId){ 
        const usuario = await Usuario.findById( termino )
        return res.json({
            results: ( usuario ) ? [usuario] : []
        })
    }

    const regex = new RegExp( termino, 'i')

    const usuarios = await Usuario.find({ 
        $or: [ {name : regex}, {email: regex} ],
        $and: [{state: true}]
    })
        
        return res.json({
            results: usuarios
        })

}

const buscarCategorias= async (termino = '', res = response)=>{

    const esMongoId = ObjectId.isValid( termino )

    if( esMongoId){ 
        const categoria = await Categoria.findById( termino )
        return res.json({
            results: ( categoria ) ? [categoria] : []
        })
    }

    const regex = new RegExp( termino, 'i')

    const categorias = await Categoria.find({ name: regex, state: true})
        
        return res.json({
            results: categorias
        })

}


const buscarProductos= async (termino = '', res = response)=>{

    const esMongoId = ObjectId.isValid( termino )

    if( esMongoId){ 
        const producto = await Producto.findById( termino )
        return res.json({
            results: ( producto ) ? [producto] : []
        })
    }

    const regex = new RegExp( termino, 'i')

    const productos = await Producto.find({ name: regex, state: true})
                                                .populate('category', 'name')
        
        return res.json({
            results: productos
        })

}


const buscar = (req = request, res = response)=>{

    const { coleccion, termino} = req.params

    if( !coleccionesPermitidas.includes( coleccion ) ){
        return res.status(400).json({ msg: `Las colecciones permitidas son : ${coleccionesPermitidas}`})
    }

    switch (coleccion) {
        case 'usuarios':
            
            return buscarUsuarios(termino, res)
    
        case 'categorias':
        
            return buscarCategorias(termino, res)
                
        case 'productos':
        
            return buscarProductos(termino, res)
                
        default:
            return res.status(500).json({
                msg: 'Se olvido hacer esta busqueda'
            })
    }


    res.json({
        coleccion,
        termino
    })
}


module.exports = {
    buscar
}