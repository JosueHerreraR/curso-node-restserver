
// Sección 13 => 193. Subir archivos y
// Sección 13 => 194. Validar la extension

/*
const path = require('path');
const { response } = require('express');

const cargarArchivo = ( req, res = response ) => {
  
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({ msg: 'No hay archivos para subir' });
        return;
    }
  
    const { archivo } = req.files;
    const nombreCortado = archivo.name.split('.');
    const extension = nombreCortado[ nombreCortado.length - 1 ];
    
    // Validar la extension
    const extensionesValidas = [ 'png', 'jpg', 'jpeg', 'gif', 'webb'];
    if ( !extensionesValidas.includes( extension ) ) {
        return res.status(400).json({ 
            msg: `La extensión ${extension} no es permitida. Las que son permitidas son: ${extensionesValidas}` 
        });
    }

    res.json({extension});
    
    const uploadPath = path.join( __dirname, '../uploads/', archivo.name);

    archivo.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).json({err});
        }
  
        res.json({ msg: 'El archivo fue cargado en:' + uploadPath });
    });
}

module.exports = {
    cargarArchivo
}
*/

// Sección 13 => 195. Ubicar y cambiar nombre

/*
const path = require('path');
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');

const cargarArchivo = ( req, res = response ) => {
  
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({ msg: 'No hay archivos para subir' });
        return;
    }
  
    const { archivo } = req.files;
    const nombreCortado = archivo.name.split('.');
    const extension = nombreCortado[ nombreCortado.length - 1 ];
    
    // Validar la extension
    const extensionesValidas = [ 'png', 'jpg', 'jpeg', 'gif', 'webb'];
    if ( !extensionesValidas.includes( extension ) ) {
        return res.status(400).json({ 
            msg: `La extensión ${extension} no es permitida. Las que son permitidas son: ${extensionesValidas}` 
        });
    }

    const nombreTemp = uuidv4() + '.' + extension;
    const uploadPath = path.join( __dirname, '../uploads/', nombreTemp);

    archivo.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).json({err});
        }
  
        res.json({ msg: 'El archivo fue cargado en:' + uploadPath });
    });
}

module.exports = {
    cargarArchivo
}
*/

// Sección 13 => 196. Helper - Subir Archivo

/*
const { response } = require('express');

const { subirArchivo } = require('../helpers');

const cargarArchivo = async ( req, res = response ) => {
  
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({ msg: 'No hay archivos para subir' });
        return;
    }

    // Imagenes
    const nombre = await subirArchivo (req.files);

    res.json({ nombre });
}

module.exports = {
    cargarArchivo
}
*/

// Sección 13 => 197. Crear carpetas de destino

/*
const { response } = require('express');

const { subirArchivo } = require('../helpers');

const cargarArchivo = async ( req, res = response ) => {
  
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({ msg: 'No hay archivos para subir' });
        return;
    }

    try {

        // Imagenes - .txt .md
        //const nombre = await subirArchivo (req.files, ['txt', 'md'], 'textos' );
        const nombre = await subirArchivo (req.files, undefined, 'imgs' );
        res.json({ nombre });

    } catch (msg) {
        res.status(400).json({msg});
    }
    
}

module.exports = {
    cargarArchivo
}
*/

// Sección 13 => 198. Ruta para actualizar img de Usuarios y Productos &
// Sección 13 => 199. Actualizar imagen del usuario

/*
const { response } = require('express');
const { model } = require('mongoose');

const { subirArchivo } = require('../helpers');
const { Usuario, Producto } = require('../models');

const cargarArchivo = async ( req, res = response ) => {

    try {

        // Imagenes - .txt .md
        //const nombre = await subirArchivo (req.files, ['txt', 'md'], 'textos' );
        const nombre = await subirArchivo (req.files, undefined, 'imgs' );
        res.json({ nombre });

    } catch (msg) {
        res.status(400).json({msg});
    }
}

const actualizarImagen = async ( req, res = response ) => {
    
    const { id, coleccion } = req.params;
    
    let modelo;

    switch (coleccion){
        case 'usuarios':

            modelo = await Usuario.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el ID: ${ id }`
                });
            }
        break;

        case 'productos':

            modelo = await Producto.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un producto con el ID: ${ id }`
                });
            }
        break;

        default:
            return res.status(500).json({ msg: 'Se nos olvido validar esto' });
    }

    const nombre = await subirArchivo (req.files, undefined, coleccion );

    modelo.img = nombre;

    await modelo.save();

    res.json( modelo );
}

module.exports = {
    cargarArchivo,
    actualizarImagen
}
*/

// Sección 13 => 201. Borrar archivos del servidor y
// Sección 13 => 203. Mostrar imagen de relleno

/*
const path = require('path');
const fs = require('fs');

const { response } = require('express');

const { subirArchivo } = require('../helpers');
const { Usuario, Producto } = require('../models');

const cargarArchivo = async ( req, res = response ) => {

    try {

        // Imagenes - .txt .md
        //const nombre = await subirArchivo (req.files, ['txt', 'md'], 'textos' );
        const nombre = await subirArchivo (req.files, undefined, 'imgs' );
        res.json({ nombre });

    } catch (msg) {
        res.status(400).json({msg});
    }
}

const actualizarImagen = async ( req, res = response ) => {
    
    const { id, coleccion } = req.params;
    
    let modelo;

    switch (coleccion){
        case 'usuarios':

            modelo = await Usuario.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el ID: ${ id }`
                });
            }
        break;

        case 'productos':

            modelo = await Producto.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un producto con el ID: ${ id }`
                });
            }
        break;

        default:
            return res.status(500).json({ msg: 'Se nos olvido validar esto' });
    }

    // Limpiar imagenes previas
    if ( modelo.img ) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join( __dirname, '../uploads/', coleccion , modelo.img );
        if ( fs.existsSync( pathImagen ) ){
            fs.unlinkSync( pathImagen );
        }
    }

    const nombre = await subirArchivo (req.files, undefined, coleccion );
    modelo.img = nombre;

    await modelo.save();

    res.json( modelo );
}

const mostrarImagen = async ( req, res = response ) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion){
        case 'usuarios':

            modelo = await Usuario.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el ID: ${ id }`
                });
            }
        break;

        case 'productos':

            modelo = await Producto.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un producto con el ID: ${ id }`
                });
            }
        break;

        default:
            return res.status(500).json({ msg: 'Se nos olvido validar esto' });
    }

    // Limpiar imagenes previas
    if ( modelo.img ) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join( __dirname, '../uploads/', coleccion , modelo.img );
        if ( fs.existsSync( pathImagen ) ){
            return res.sendFile( pathImagen );
        }
    }

    const pathImagen = path.join( __dirname, '../assets/no-image.jpg' );
    res.sendFile( pathImagen );
}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen
}
*/

// Sección 13 => 205. Carga de imagenes a Cloudinary &
// Sección 13 => 206. Borrar imagenes de Cloudinary

const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );

const { response } = require('express');

const { subirArchivo } = require('../helpers');
const { Usuario, Producto } = require('../models');

const cargarArchivo = async ( req, res = response ) => {

    try {

        // Imagenes - .txt .md
        //const nombre = await subirArchivo (req.files, ['txt', 'md'], 'textos' );
        const nombre = await subirArchivo (req.files, undefined, 'imgs' );
        res.json({ nombre });

    } catch (msg) {
        res.status(400).json({msg});
    }
}

const actualizarImagen = async ( req, res = response ) => {
    
    const { id, coleccion } = req.params;
    
    let modelo;

    switch (coleccion){
        case 'usuarios':

            modelo = await Usuario.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el ID: ${ id }`
                });
            }
        break;

        case 'productos':

            modelo = await Producto.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un producto con el ID: ${ id }`
                });
            }
        break;

        default:
            return res.status(500).json({ msg: 'Se nos olvido validar esto' });
    }

    // Limpiar imagenes previas
    if ( modelo.img ) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join( __dirname, '../uploads/', coleccion , modelo.img );
        if ( fs.existsSync( pathImagen ) ){
            fs.unlinkSync( pathImagen );
        }
    }

    const nombre = await subirArchivo (req.files, undefined, coleccion );
    modelo.img = nombre;

    await modelo.save();

    res.json( modelo );
}

const actualizarImagenCloudinary = async ( req, res = response ) => {
    
    const { id, coleccion } = req.params;
    
    let modelo;

    switch (coleccion){
        case 'usuarios':

            modelo = await Usuario.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el ID: ${ id }`
                });
            }
        break;

        case 'productos':

            modelo = await Producto.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un producto con el ID: ${ id }`
                });
            }
        break;

        default:
            return res.status(500).json({ msg: 'Se nos olvido validar esto' });
    }

    // Limpiar imagenes previas
    if ( modelo.img ) {
        // Hay que borrar la imagen del servidor
        const nombreArr = modelo.img.split('/');
        const nombre    = nombreArr[ nombreArr.length - 1 ];
        const [ public_id ] = nombre.split('.');
        cloudinary.uploader.destroy( public_id );
    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

    modelo.img = secure_url;

    await modelo.save();

    res.json( modelo );
}

const mostrarImagen = async ( req, res = response ) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion){
        case 'usuarios':

            modelo = await Usuario.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el ID: ${ id }`
                });
            }
        break;

        case 'productos':

            modelo = await Producto.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un producto con el ID: ${ id }`
                });
            }
        break;

        default:
            return res.status(500).json({ msg: 'Se nos olvido validar esto' });
    }

    // Limpiar imagenes previas
    if ( modelo.img ) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join( __dirname, '../uploads/', coleccion , modelo.img );
        if ( fs.existsSync( pathImagen ) ){
            return res.sendFile( pathImagen );
        }
    }

    const pathImagen = path.join( __dirname, '../assets/no-image.jpg' );
    res.sendFile( pathImagen );
}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    actualizarImagenCloudinary,
    mostrarImagen
}