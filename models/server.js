
// 105. EXPRESS basado en clases y 
// 106. Peticiones HTTP / GET / PUT / POST / DELETE

/*
const express = require('express');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // MiddleWares
        this.middlewares();

        // Ruras de la aplicacion
        this.routes();
    }

    middlewares() {
        // Directorio Público
        this.app.use( express.static('public') );
    }

    routes() {
        
        this.app.get('/api', (req, res) => {
            res.json({
                msg: 'get API'
            });
        });
        
        this.app.put('/api', (req, res) => {
            res.json({
                msg: 'put API'
            });
        });
        
        this.app.post('/api', (req, res) => {
            res.json({
                msg: 'post API'
            });
        });
        
        this.app.delete('/api', (req, res) => {
            res.json({
                msg: 'delete API'
            });
        });

        this.app.patch('/api', (req, res) => {
            res.json({
                msg: 'patch API'
            });
        });
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto:', this.port );
        });
    }
}

module.exports = Server;
*/

// 109. CORS - Middleware y 
// 110. Separar las rutas y controlador de la clase

/*
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

        // CORS
        this.app.use( cors() );

        // Directorio Público
        this.app.use( express.static('public') );
    }

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
*/

// 111. Obtener datos de un POST

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

        // CORS
        this.app.use( cors() );

        // Lectura y parseo de body
        this.app.use( express.json( ));

        // Directorio Público
        this.app.use( express.static('public') );
    }

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

