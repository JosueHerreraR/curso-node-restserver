
// EXPRESS basado en clases y Peticiones HTTP / GET / PUT / POST / DELETE

const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // MiddleWares
        this.middlewares();

        // Ruras de la aplicacion
        this.routes();
    }

    middlewares() {

        // CORS - Middleware
        this.app.use( cors() );

        // Lectura y parseo de body
        this.app.use( express.json( ));

        // Directorio Público
        this.app.use( express.static('public') );
    }
    
// Separar las rutas y controlador de la clase
    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto:', this.port );
        });
    }
}

module.exports = Server;

