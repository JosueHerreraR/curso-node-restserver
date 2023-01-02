
// Sección 8 => 105. EXPRESS basado en clases y 
// Sección 8 => 106. Peticiones HTTP / GET / PUT / POST / DELETE

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

// Sección 8 => 109. CORS - Middleware y 
// Sección 8 => 110. Separar las rutas y controlador de la clase

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

// Sección 8 => 111. Obtener datos de un POST

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
*/

// Sección 9 => 124. Mongoose - Conectarnos a la base de datos

/*
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

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

// Sección 10 => 147. Crear ruta de autenticación - Auth - Login

/*
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
*/

// Sección 12 => 175. CRUD y rutas de Categorías

/*
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        
        this.paths = {
            auth:       '/api/auth',
            categorias: '/api/categorias',
            usuarios:   '/api/usuarios',
        }

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
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto:', this.port );
        });
    }
}

module.exports = Server;
*/

// Sección 12 => 181. Modelo de producto y rutas

/*
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        
        this.paths = {
            auth:       '/api/auth',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            usuarios:   '/api/usuarios',
        }

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
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto:', this.port );
        });
    }
}

module.exports = Server;
*/

// Sección 12 => 183. Ruta para realizar búsquedas

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        
        this.paths = {
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            usuarios:   '/api/usuarios',
        }

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
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto:', this.port );
        });
    }
}

module.exports = Server;