
// Sección 13 => 193. Subir archivos y
// Sección 13 => 198. Ruta para actualizar img de Usuarios y Productos

/*
const { Router } = require('express');
const { check } = require('express-validator');

const { 
    cargarArchivo, 
    actualizarImagen
} = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validarCampos } = require('../middlewares');

const router = Router();

router.post('/', cargarArchivo);

router.put('/:coleccion/:id', [ 
    check('id', 'El ID debe ser válido con MongoDB').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas ( c, ['usuarios', 'productos'] ) ),
    validarCampos
], actualizarImagen)

module.exports = router;
*/

// Sección 13 => 200. Desestructuración de undefined

/*
const { Router } = require('express');
const { check } = require('express-validator');

const { cargarArchivo, actualizarImagen } = require('../controllers/uploads');
const { validarCampos, validarArchivosSubir } = require('../middlewares');
const { coleccionesPermitidas } = require('../helpers');

const router = Router();

router.post('/', validarArchivosSubir,cargarArchivo);

router.put('/:coleccion/:id', [ 
    validarArchivosSubir,
    check('id', 'El ID debe ser válido con MongoDB').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas ( c, ['usuarios', 'productos'] ) ),
    validarCampos
], actualizarImagen)

module.exports = router;
*/

// Sección 13 => 202. Servicio para mostrar las imágenes

/*
const { Router } = require('express');
const { check } = require('express-validator');

const { cargarArchivo, actualizarImagen, mostrarImagen } = require('../controllers/uploads');
const { validarCampos, validarArchivosSubir } = require('../middlewares');
const { coleccionesPermitidas } = require('../helpers');

const router = Router();

router.post('/', validarArchivosSubir,cargarArchivo);

router.put('/:coleccion/:id', [ 
    validarArchivosSubir,
    check('id', 'El ID debe ser válido con MongoDB').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas ( c, ['usuarios', 'productos'] ) ),
    validarCampos
], actualizarImagen);

router.get('/:coleccion/:id', [
    check('id', 'El ID debe ser válido con MongoDB').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas ( c, ['usuarios', 'productos'] ) ),
    validarCampos
], mostrarImagen);

module.exports = router;
*/

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