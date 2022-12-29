
// Sección 10 => 151. Proteger rutas mediante el uso de Token - Middlewares

/*
const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = ( req, res = response, next ) => {
    
    const token = req.header( 'x-token' );

    if( !token ) {
        return res.status(401).json ({
            msg: 'No hay un token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        req.uid = uid;
        
        next();
    } catch (error){
        
        console.log(error);
        return res.status(401).json ({
            msg: 'Token no válido'
        });
    }
}

module.exports = {
    validarJWT
}
*/

// Sección 10 => 152. Obtener la información del usuario autenticado

const { response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async ( req, res = response, next ) => {
    
    const token = req.header( 'x-token' );

    if( !token ) {
        return res.status(401).json ({
            msg: 'No hay un token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // Leer el usuario que corresponde al UID
        const usuario = await Usuario.findById( uid );

        if ( !usuario ) {
            return res.status(401).json ({
                msg: 'Token no Válido - Usuario no registrado en la DB'
            });
        }

        // Verificar si el UID tiene estado en true
        if ( !usuario.estado ) {
            return res.status(401).json ({
                msg: 'Token no Válido - Usuario con estado: false'
            });
        }

        req.usuario = usuario;
        
        next();
    } catch (error){
        
        console.log(error);
        return res.status(401).json ({
            msg: 'Token no válido'
        });
    }
}

module.exports = {
    validarJWT
}