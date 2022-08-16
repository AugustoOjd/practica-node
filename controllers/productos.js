const { response, request } = require("express");
const { Producto } = require('../models')



const obtenerProductos = async (req= request, res= response)=>{
    try {

        const { limite = 5, desde = 0 } = req.query

        const query = {state: true}
    
        const [total, productos] = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query)
                .populate('user', 'name')
                .populate('category', 'name')
                .skip(Number(desde))
                .limit(Number(limite))
        ])
    
        return res.status(200).json({
            total,
            productos
        })
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg: 'Error en solicitar productos'})
    }
}


const obtenerProductoId = async (req, res =response) =>{
    try {
        
        const { id } = req.params

        const producto = await Producto.findById( id )
                    .populate('user', 'name')
                    .populate('category', 'name')

        return res.status(200).json(producto)

    } catch (error) {
        console.log(error)
        return res.status(400).json({msg: 'Error en buscar producto por id'})
    }
} 

const crearProducto = async (req= request, res = response) =>{

    try {
        const { state, user, ...body } = req.body

        const productoDB = await Producto.findOne({name: String})
    
        if(productoDB){
            return res.status(400).json({
                msg: `El producto ${productoDB.name}, ya existe`
            })
        }
    
        const data = {
            ...body,
            name: body.name.toUpperCase(),
            user: req.user._id,
        }
    
        const producto = new Producto(data)
        await producto.save()
    
        return res.status(201).json(producto)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Error en crear producto'})
    }

}




const actualizarProducto = async (req, res=response) =>{

}


const borrarProducto = async (req, res = response) =>{

}
        

module.exports = { 
    crearProducto,
    obtenerProductos,
    obtenerProductoId, 
    actualizarProducto,
    borrarProducto
        
}