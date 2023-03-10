
// Sección 11 => 165. Validar Token de Google - Backend

const { response } = require('express');
const bcryptis = require('bcryptjs')

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSingIn = async ( req, res = response ) => {
   
    const { id_token } = req.body;

    try {

        const googleUser = await googleVerify ( id_token );
        console.log( googleUser );

        res.json ({
            msg: 'La conexión fue exitosa',
            id_token
        });

    } catch ( error ) {
        res.status(400).json ({
            ok: false,
            msg: 'El token no se pudo verificar'
        });
    }   
    
    

}

module.exports = {
    login,
    googleSingIn
}