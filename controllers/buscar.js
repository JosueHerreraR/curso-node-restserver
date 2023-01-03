
// Sección 12 => 183. Ruta para realizar búsquedas

/*
const { response } = require("express");

const buscar = ( req, res = response) => {

    const { coleccion, termino } = req.params;

    res.json({
        coleccion, termino
    });
}

module.exports = {
    buscar
}
*/

// Sección 12 => 184. Búsquedas en base de datos

/*
const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { Usuario, Categoria, Producto } = require('../models');

const coleccionesPermitidas = [
    'usuarios',
    'categoria',
    'productos',
    'roles'
];

const buscarUsuarios = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino );  // <- TRUE

    if( esMongoID ) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: ( usuario ) ? [ usuario ] : []
        });
    }
}

const buscar = ( req, res = response) => {

    const { coleccion, termino } = req.params;

    if ( !coleccionesPermitidas.includes(coleccion) ) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        });
    }

    switch ( coleccion ){
        case 'usuarios':
            buscarUsuarios( termino, res);
        break;

        case 'categoria':
        
        break;

        case 'productos':
        
        break;

        default:
            res.status(500).json({
                msg: 'Se me olvido realizar esta busqueda'
            });
    }

}

module.exports = {
    buscar
}
*/

// Sección 12 => 184. Búsquedas en base de datos y 
// Sección 12 => 185. Buscar por otros argumentos

/*
const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { Usuario, Categoria, Producto } = require('../models');

const coleccionesPermitidas = [
    'usuarios',
    'categoria',
    'productos',
    'roles'
];

const buscarUsuarios = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino );  // <- TRUE

    if( esMongoID ) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: ( usuario ) ? [ usuario ] : []
        });
    }

    const regex = new RegExp( termino, 'i'); // RegExp = Expresion regular

    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });
    res.json({
        results: usuarios
    });
}

const buscar = ( req, res = response) => {

    const { coleccion, termino } = req.params;

    if ( !coleccionesPermitidas.includes(coleccion) ) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        });
    }

    switch ( coleccion ){
        case 'usuarios':
            buscarUsuarios( termino, res);
        break;

        case 'categoria':
        
        break;

        case 'productos':
        
        break;

        default:
            res.status(500).json({
                msg: 'Se me olvido realizar esta busqueda'
            });
    }

}

module.exports = {
    buscar
}
*/

// Sección 12 => 186. Búscar en otras colecciones

const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { Usuario, Categoria, Producto } = require('../models');

const coleccionesPermitidas = [
    'usuarios',
    'categoria',
    'productos',
    'roles'
];

const buscarUsuarios = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino );  // <- TRUE

    if( esMongoID ) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: ( usuario ) ? [ usuario ] : []
        });
    }

    const regex = new RegExp( termino, 'i'); // RegExp = Expresion regular

    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });
    res.json({
        results: usuarios
    });
}

const buscarCategorias = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino );  // <- TRUE

    if( esMongoID ) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: ( categoria ) ? [ categoria ] : []
        });
    }

    const regex = new RegExp( termino, 'i'); // RegExp = Expresion regular

    const categorias = await Categoria.find( { nombre: regex, estado: true } );
    res.json({
        results: categorias
    });
}

const buscarProductos = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino );  // <- TRUE

    if( esMongoID ) {
        const producto = await Producto.findById(termino)
                            .populate('categoria', 'nombre');
        return res.json({
            results: ( producto ) ? [ producto ] : []
        });
    }

    const regex = new RegExp( termino, 'i'); // RegExp = Expresion regular

    const productos = await Producto.find( { nombre: regex, estado: true } )
                        .populate('categoria', 'nombre');
    res.json({
        results: productos
    });
}

const buscar = ( req, res = response) => {

    const { coleccion, termino } = req.params;

    if ( !coleccionesPermitidas.includes(coleccion) ) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        });
    }

    switch ( coleccion ){
        case 'usuarios':
            buscarUsuarios( termino, res);
        break;

        case 'categoria':
            buscarCategorias( termino, res);
        break;

        case 'productos':
            buscarProductos( termino, res);
        break;

        default:
            res.status(500).json({
                msg: 'Se me olvido realizar esta busqueda'
            });
    }

}

module.exports = {
    buscar
}