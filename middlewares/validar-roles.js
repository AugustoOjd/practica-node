const { response, request } = require("express")



const esAdminRole = (req = request, res = response, next)=>{


    if(!req.user){
        return res.status(500).json({ msg: 'Se quiere verificar el role sin validar el token primero'})
    }

    const { role, name} = req.user

    if(role !== 'admin'){
        return res.status(401).json({ msg: `${name} no tiene los permisos de administrador`})
    }

    next()
}


const tieneRole = ( ...roles ) =>{


    return (req = request, res = response, next) =>{

        if(!req.user){
            return res.status(500).json({ msg: 'Se quiere verificar el role sin validar el token primero'})
        }

        if( !roles.includes(req.user.role)){
            
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }
        
        next()
    }



}

module.exports = {
    esAdminRole,
    tieneRole
}