
// Sección 10 => 147. Crear ruta de autenticación - Auth - Login

/*
const { response } = require("express");

const login = (req, res = response) =>{


    res.json({
        msg: 'Login Ok'
    })
}

module.exports = {
    login
}
*/

// Sección 10 => 148. Login del usuario y 
// Sección 10 => 149. Generar un JWT 

const { response } = require('express');
const bcryptis = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req, res = response) =>{

    const { correo, password } = req.body;

    try{

        // Verificar si el Email existe
        const usuario = await Usuario.findOne({ correo });
        if( !usuario ) {
            return res.status(400).json ({
                msg: 'El usuario / Contraseña no son validos - correo'
            });
        }

        // Verificar si el usuario esta activo
        if( !usuario.estado ) {
            return res.status(400).json ({
                msg: 'El usuario / Contraseña no son validos - estado:false'
            });
        }
                
        // Verificar la contraseña
        const validarPassword = bcryptis.compareSync( password, usuario.password );
        if( !validarPassword ) {
            return res.status(400).json ({
                msg: 'El usuario / Contraseña no son validos - password'
            });
        }
        
        // Generar el JWT - Token
        const token = await generarJWT( usuario.id );

        res.json({
                usuario,
                token
            });

    } catch (error) {
        console.log(error)
        return res.status(500).json ({
            msg: 'Conexión inhabilitada / Hable con su administrador'
        });
    }

}

module.exports = {
    login
}