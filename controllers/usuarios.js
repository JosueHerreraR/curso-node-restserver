
// 110. Separar las rutas y controlador de la clase y
// 111. Obtener datos de un POST

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

// 112. Paárametros de segmento y query

const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {

    // const query = req.query;

    // res.json({
    //     msg: 'get API - Controlador',
    //     query
    // });
    
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
