const express = require('express');
const cors = require('cors');
const { dbContection } = require('../database/config');

class Server {

    constructor(){
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios'
    // Conectar a base de datos
    this.conectarDB();
    
    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
    }

    async conectarDB()  {
        await dbContection();
    }

    middlewares() {
        //Cors
        this.app.use( cors() );

        //Lectura y paseo del body  
        this.app.use( express.json() );

        //Middleware
        this.app.use( express.static('public'));
    }

    routes() {
       this.app.use( this.usuariosPath, require('../routes/usuarios'))
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en el puerto ${ this.port }`)
        });
     }
}

module.exports = Server