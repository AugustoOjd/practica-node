const { v4: uuidv4 } = require('uuid');
const path = require('path')

const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg'], carpeta = '' ) =>{

    return new Promise((resolve, reject)=>{

        const { archivo } = files;

        const nombreCortado = archivo.name.split('.')
        const extension = nombreCortado[ nombreCortado.length - 1]

        // Validar extension

        if(!extensionesValidas.includes(extension)){

            return reject(`El formato ${extension} no es permitido, solo se permite ${extensionesValidas}` )
        }

        const nombreTempId = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTempId );


        archivo.mv(uploadPath, function(err) {
            if (err) {
                return reject(err)
            }
        
            resolve( nombreTempId )
        });

    })

    
}


module.exports = {
    subirArchivo
}