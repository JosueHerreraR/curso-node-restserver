
// Sección 8 => 110. Separar las rutas y controlador de la clase y
// Sección 8 => 111. Obtener datos de un POST

/*
const { response } = require('express');

const usuariosGet = (req, res = response) => {

    res.json({
        msg: 'get API - Controlador'
    });
};

const usuariosPut = (req, res = response) => {

    res.json({
        msg: 'put API - Controlador'
    });
};

const usuariosPost = (req, res = response) => {

    const body = req.body;

    res.json({
        msg: 'post API - Controlador',
        body
    });
};

const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'patch API - Controlador'
    });
};

const usuariosDelete = (req, res = response) => {

    res.json({
        msg: 'delete API - Controlador'
    });
};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}
*/

// Sección 8 => 112. Párametros de segmento y query

/*
const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {
    
    const { q, nombre = 'No name', apikey, page = 1, limit} = req.query;
    
    res.json({
        msg: 'get API - Controlador',
        q,
        nombre,
        apikey, 
        page, 
        limit
    });
};

const usuariosPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'put API - Controlador',
        id
    });
};

const usuariosPost = (req, res = response) => {

    const body = req.body;

    res.json({
        msg: 'post API - Controlador',
        body
    });
};

const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'patch API - Controlador'
    });
};

const usuariosDelete = (req, res = response) => {

    res.json({
        msg: 'delete API - Controlador'
    });
};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}
*/

// Sección 9 => 126. POST: Creando un usuario en la colección

/*
const { response, request } = require('express');
const Usuario = require('../models/usuario');

const usuariosGet = (req = request, res = response) => {
    
    const { q, nombre = 'No name', apikey, page = 1, limit} = req.query;
    
    res.json({
        msg: 'get API - Controlador',
        q,
        nombre,
        apikey, 
        page, 
        limit
    });
};

const usuariosPost = async (req, res = response) => {

    const body = req.body;
    const usuario = new Usuario( body );

    await usuario.save();

    res.json({
        msg: 'post API - Controlador',
        usuario
    });
};

const usuariosPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'put API - Controlador',
        id
    });
};

const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'patch API - Controlador'
    });
};

const usuariosDelete = (req, res = response) => {

    res.json({
        msg: 'delete API - Controlador'
    });
};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}
*/

// Sección 9 => 127. BcryptJS - Encriptando la contraseña

/*
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const Usuario = require('../models/usuario');

const usuariosGet = (req = request, res = response) => {
    
    const { q, nombre = 'No name', apikey, page = 1, limit} = req.query;
    
    res.json({
        msg: 'get API - Controlador',
        q,
        nombre,
        apikey, 
        page, 
        limit
    });
};

const usuariosPost = async(req, res = response) => {
    
    const errors = validationResult(req);
    if ( !errors.isEmpty() ){         // <- el signo de interrogación indica una negación de la constante
        return res.status(400).json(errors);
    }

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo});
    if ( existeEmail) {
        return res.status(400).json({
            msg: 'Ese correo ya está registrado en la DB'
        });
    }

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'put API - Controlador',
        id
    });
};

const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'patch API - Controlador'
    });
};

const usuariosDelete = (req, res = response) => {

    res.json({
        msg: 'delete API - Controlador'
    });
};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}
*/

// Sección 9 => 129. Validar todos los campos necesarios

/*
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = (req = request, res = response) => {
    
    const { q, nombre = 'No name', apikey, page = 1, limit} = req.query;
    
    res.json({
        msg: 'get API - Controlador',
        q,
        nombre,
        apikey, 
        page, 
        limit
    });
};

const usuariosPost = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo});
    if ( existeEmail) {
        return res.status(400).json({
            msg: 'Ese correo ya está registrado en la DB'
        });
    }

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'put API - Controlador',
        id
    });
};

const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'patch API - Controlador'
    });
};

const usuariosDelete = (req, res = response) => {

    res.json({
        msg: 'delete API - Controlador'
    });
};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}
*/

// Sección 9 => 132. Tarea - Custom validation - EmailExiste 

/*
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = (req = request, res = response) => {
    
    const { q, nombre = 'No name', apikey, page = 1, limit} = req.query;
    
    res.json({
        msg: 'get API - Controlador',
        q,
        nombre,
        apikey, 
        page, 
        limit
    });
};

const usuariosPost = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'put API - Controlador',
        id
    });
};

const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'patch API - Controlador'
    });
};

const usuariosDelete = (req, res = response) => {

    res.json({
        msg: 'delete API - Controlador'
    });
};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}
*/

// Sección 9 => 133. PUT: Actualizar información del usuario y
// Sección 9 => 134. Validaciones adicionales en el PUT

/*
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = (req = request, res = response) => {
    
    const { q, nombre = 'No name', apikey, page = 1, limit} = req.query;
    
    res.json({
        msg: 'get API - Controlador',
        q,
        nombre,
        apikey, 
        page, 
        limit
    });
};

const usuariosPost = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto} = req.body;

    // TODO
    if( password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json({
        usuario
    });
};

const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'patch API - Controlador'
    });
};

const usuariosDelete = (req, res = response) => {

    res.json({
        msg: 'delete API - Controlador'
    });
};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}
*/

// Sección 9 => 135. GET: Obtener todos los usuarios de forma paginada y 

/*
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response) => {
    
    const { limite = 5, desde = 0} = req.query;
    const usuarios = await Usuario.find()
        .skip(Number(desde))
        .limit(Number(limite));

    res.json({
        usuarios
    });
};

const usuariosPost = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.json(usuario);
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto} = req.body;

    // TODO
    if( password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario);
};

const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'patch API - Controlador'
    });
};

const usuariosDelete = (req, res = response) => {

    res.json({
        msg: 'delete API - Controlador'
    });
};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}

*/

// Sección 9 => 136. Retornar número total de registros en una colección 

/*
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response) => {
    
    const { limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total, 
        usuarios
    });
};

const usuariosPost = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.json(usuario);
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto} = req.body;

    // TODO
    if( password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario);
};

const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'patch API - Controlador'
    });
};

const usuariosDelete = (req, res = response) => {

    res.json({
        msg: 'delete API - Controlador'
    });
};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}
*/

// Sección 9 => 137. Delete: Borrando un usuario de la base de datos 

const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response) => {
    
    const { limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total, 
        usuarios
    });
};

const usuariosPost = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.json(usuario);
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto} = req.body;

    // TODO
    if( password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario);
};

const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'patch API - Controlador'
    });
};

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;

    // Borrar el usuario fisicamente
    const usuario = await Usuario.findByIdAndUpdate( id, {estado: false});

    res.json(usuario);
};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}
