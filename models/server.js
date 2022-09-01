const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload')
const { createServer } = require('http');
const { socketController } = require('../sockets/controller');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.usuariosPath =     '/api/usuarios';
        this.authPath =         '/api/auth'
        this.categoryPath =     '/api/categorias'
        this.productPath =      '/api/productos'
        this.buscarPath =       '/api/buscar'
        this.uploadPath =       '/api/uploads'
        
        this.server = createServer(this.app)
        this.io = require('socket.io')(this.server)
        // Conectar base de datos

        this.conectarDb()

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Sockets
        this.sockets()
    }


    async conectarDb() {
        await dbConnection()
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

        // File archivos - cargaa
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }))
    }

    routes() {
        this.app.use( this.usuariosPath, require('../routes/usuarios'));
        this.app.use( this.authPath, require('../routes/login'))
        this.app.use( this.categoryPath, require('../routes/categorias'))
        this.app.use( this.productPath, require('../routes/productos'))
        this.app.use( this.buscarPath, require('../routes/buscar'))
        this.app.use( this.uploadPath, require('../routes/uploads'))
    }

    sockets(){
        this.io.on('connection', socketController)
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
