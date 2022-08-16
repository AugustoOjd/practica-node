const jwt = require('jsonwebtoken')

const generarJWT = ( uid = '' ) =>{

    return new Promise((res, rej)=>{

        const payload = { uid }

        jwt.sign( payload, process.env.SECRET_KEY_JWT, {
            expiresIn: '48h'
        }, (err, token)=>{
            if(err){
                console.log(err)
                rej('No se pudo generar el jwt')
            }else{
                res( token )
            }
        })
    })
}


module.exports = {
    generarJWT
}