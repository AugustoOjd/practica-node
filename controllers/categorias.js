const { response, request } = require("express");
const { Categoria } = require('../models')


const obtenerCategorias = async (req, res = response)=>{

    // const allCategory = await Categoria.find()
    try {

        const { limite = 5, desde = 0 } = req.query

        const query = {state: true}
    
        const [total, categorias] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query)
                .populate('user', 'name')
                .skip(Number(desde))
                .limit(Number(limite))
        ])
    
        return res.status(200).json({
            total,
            categorias
        })
        
        // return res.status(200).json(allCategory)
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg: 'Error en solicitar productos'})
    }

}

const obtenerCategoriaId = async (req = request, res = response) =>{
    

    try {     
        const { id } = req.params
        const categoria = await Categoria.findById( id ).populate('user', 'name')
        return res.status(200).json(categoria)
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'Id no indentificado'})
    }
}

const crearCategoria = async (req, res = response) =>{

    const name = req.body.name.toUpperCase()

    const categoriaDB = await Categoria.findOne({name})

    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.name}, ya existe`
        })
    }

    const data = {
        name,
        user: req.user._id
    }

    const categoria = new Categoria(data)
    await categoria.save()

    return res.json(categoria)

}

const actualizarCategoria = async(req = request, res = response)=>{

    try {

        const { id } = req.params

        const { state, user, ...data } = req.body
        
        data.name = data.name.toUpperCase()
        data.user = req.user._id
    
        const categoria = await Categoria.findByIdAndUpdate( id, data, { new: true})

        return res.status(201).json(categoria)
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg: 'Error en actualizar productos'})
    }

}

const borrarCategoria = async(req = request, res=response)=>{
    try {
        const { id } = req.params

        const categoria = await Categoria.findByIdAndUpdate(id, {state: false}, {new: true})

        return res.status(201).json(categoria)

    } catch (error) {
        console.log(error)
        return res.status(400).json({msg: 'No se pudo eliminar la categoria'})
    }
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriaId,
    actualizarCategoria,
    borrarCategoria 
}