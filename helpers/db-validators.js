const { Categoria } = require('../models')
const Role = require('../models/role')
const Usuario = require('../models/usuario')


const esRoleValido = async (role = '') => {
    const existeRole = await Role.findOne({ role })
    if(!existeRole){
        throw new Error(`El rol ${role} no es valido`)
    }
}

const emailExiste =  async ( email = '') =>{
    
    const existeEmail = await Usuario.findOne({email})
    if(existeEmail){
        throw new Error(`El ${email} ya existe`)
    }
    

}

const idExisteUser =  async ( id = '') =>{
    
    const existeId = await Usuario.findById(id)
    if(!existeId){
        throw new Error(`El ${id} no existe`)
    }
    

}


const existeCategoriaId = async ( id ) =>{

    const existeId = await Categoria.findById(id)
    if(!existeId){
        throw new Error(`El id: ${id} no existe`)
    } 
}


module.exports = {
    esRoleValido,
    emailExiste,
    idExisteUser,
    existeCategoriaId
}