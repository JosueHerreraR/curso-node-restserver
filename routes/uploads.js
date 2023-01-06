
// Sección 13 => 205. Carga de imagenes a Cloudinary

const { Router } = require('express');
const { check } = require('express-validator');

const { cargarArchivo, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { validarCampos, validarArchivosSubir } = require('../middlewares');
const { coleccionesPermitidas } = require('../helpers');

const router = Router();

router.post('/', validarArchivosSubir,cargarArchivo);

router.put('/:coleccion/:id', [ 
    validarArchivosSubir,
    check('id', 'El ID debe ser válido con MongoDB').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas ( c, ['usuarios', 'productos'] ) ),
    validarCampos
], actualizarImagenCloudinary );

router.get('/:coleccion/:id', [
    check('id', 'El ID debe ser válido con MongoDB').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas ( c, ['usuarios', 'productos'] ) ),
    validarCampos
], mostrarImagen );

module.exports = router;