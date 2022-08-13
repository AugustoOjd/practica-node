const { response } = require("express");
const { Categoria } = require('../models')


const crearCategoria = async (req, res = response) =>{

    const name = req.body.name.toUpperCase()

    const categoriaDB = await Categoria.findOne({ name })

    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${categoriaDB}, ya existe`
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

module.exports = {
    crearCategoria
}