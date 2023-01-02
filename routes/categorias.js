
// Sección 12 => 175. CRUD y rutas de Categorías

/*
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// Obtener todas las categorias - Público
router.get('/', (req, res) => {
    res.json('Todo esta bien OK! - GET');
});

// Obtener una categorias - Público
router.get('/:id', (req, res) => {
    res.json('Obtener una categoría! - GET');
});

// Crear una categorias - Privado - Token Valido
router.post('/', (req, res) => {
    res.json('Crear una categoría! - POST');
});

// Actualizar una categoría - Privado - Token Valido
router.put('/:id', (req, res) => {
    res.json('Actualizar una categoría! - PUT');
});

// Eliminar una categorias - Admin
router.delete('/:id', (req, res) => {
    res.json('Eliminar una categoría! - Delete');
});

module.exports = router;
*/

// Sección 12 => 176. Modelo categoría

/*
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// Obtener todas las categorias - Público
router.get('/', (req, res) => {
    res.json('Todo esta bien OK! - GET');
});

// Obtener una categorias - Público
router.get('/:id', (req, res) => {
    res.json('Obtener una categoría! - GET');
});

// Crear una categorias - Privado - Token Valido
router.post('/', (req, res) => {
    res.json('Crear una categoría! - POST');
});

// Actualizar una categoría - Privado - Token Valido
router.put('/:id', (req, res) => {
    res.json('Actualizar una categoría! - PUT');
});

// Eliminar una categorias - Admin
router.delete('/:id', (req, res) => {
    res.json('Eliminar una categoría! - Delete');
});

module.exports = router;
*/

// Sección 12 => 177. Crear una categoría

/*
const { Router } = require('express');
const { check } = require('express-validator');

const { crearCategorias } = require('../controllers/categorias');
const { validarJWT, validarCampos } = require('../middlewares');

const router = Router();

// Obtener todas las categorias - Público
router.get('/', (req, res) => {
    res.json('Todo esta bien OK! - GET');
});

// Obtener una categorias - Público
router.get('/:id', (req, res) => {
    res.json('Obtener una categoría! - GET');
});

// Crear una categorias - Privado - Token Valido
router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos 
], crearCategorias);

// Actualizar una categoría - Privado - Token Valido
router.put('/:id', (req, res) => {
    res.json('Actualizar una categoría! - PUT');
});

// Eliminar una categorias - Admin
router.delete('/:id', (req, res) => {
    res.json('Eliminar una categoría! - Delete');
});

module.exports = router;
*/

// Sección 12 => 178. Tarea - CRUD de Categorias y
// Sección 12 => 179. Resolución de la Tarea - CRUD de Categorias y 
// Sección 12 => 180. Resolución de la Tarea - CRUD de Categorias - Parte 2 

const { Router } = require('express');
const { check } = require('express-validator');

const { 
    obtenerCategorias,
    crearCategorias, 
    actualizarCategoria, 
    obtenerCategoria, 
    eliminarCategoria
} = require('../controllers/categorias');

const { 
    validarJWT, 
    validarCampos, 
    esAdminRole
} = require('../middlewares');

const { existeCategoria } = require('../helpers/db-validators');

const router = Router();

// Obtener todas las categorias - Público
router.get('/', obtenerCategorias);

// Obtener una categorias - Público
router.get('/:id', [
    check('id', 'No es un ID de MongoDB válido').isMongoId(),
    validarCampos,
    check('id').custom( existeCategoria ),
    validarCampos
], obtenerCategoria);

// Crear una categorias - Privado - Token Valido
router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos 
], crearCategorias);

// Actualizar una categoría - Privado - Token Valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
    check('id').custom( existeCategoria ),
    validarCampos
], actualizarCategoria);

// Eliminar una categorias - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID de MongoDB Válido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
], eliminarCategoria);

module.exports = router;