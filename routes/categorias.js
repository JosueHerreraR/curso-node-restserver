
// Sección 12 => 178 - 180. CRUD de Categorias

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