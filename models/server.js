
// Sección 10 => 147. Crear ruta de autenticación - Auth - Login

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth'

        // Coneccion a la Database
        this.conectarDB();

        // MiddleWares
        this.middlewares();

        // Ruras de la aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo de body
        this.app.use( express.json( ));

        // Directorio Público
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto:', this.port );
        });
    }
}

module.exports = Server;