const mongoose = require('mongoose')


const dbConnection = async () =>{

    try {
        await mongoose.connect( process.env.MONGO_DB 
        //     {
        //     useNewUrlParser: true,
        //     useUnifiedTopoLogy: true,
        //     useCreateIndex: true,
        //     useFindAndModify: false
        // }
        )

        console.log('base de datos conectada')
    } catch (error) {
        console.log(error)
        throw new Error('Error en la conexion')
    }
}


module.exports = {
    dbConnection
}