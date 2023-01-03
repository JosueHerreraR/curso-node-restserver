
// Sección 13 => 200. Desestructuración de undefined

const { response } = require('express');

const validarArchivosSubir = ( req, res = response, next ) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({ 
            msg: 'No hay archivos para subir - validarArchivoSubir' 
        });
    }

    next()
}

module.exports = {
    validarArchivosSubir
}