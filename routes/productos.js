
// Sección 12 => 181. Modelo de producto y rutas

const { Router } = require('express');
const { check } = require('express-validator');

const { 
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto, 
} = require('../controllers/productos');

const { 
    validarJWT, 
    validarCampos, 
    esAdminRole
} = require('../middlewares');

const { 
    existeCategoria, 
    existeProducto 
} = require('../helpers/db-validators');

const router = Router();

// Obtener todas las categorias - Público
router.get('/', obtenerProductos);

// Obtener una categorias - Público
router.get('/:id', [
    check('id', 'No es un ID de MongoDB válido').isMongoId(),
    validarCampos,
    check('id').custom( existeProducto ),
    validarCampos
], obtenerProducto);

// Crear una categorias - Privado - Token Valido
router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un ID de MongoDB válido').isMongoId(),
    check('categoria').custom( existeCategoria ),
    validarCampos 
], crearProducto);

// Actualizar una categoría - Privado - Token Valido
router.put('/:id', [
    validarJWT,
    //check('categoria', 'No es un ID de MongoDB válido').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
], actualizarProducto);

// Eliminar una categorias - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID de MongoDB Válido').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
], eliminarProducto);

module.exports = router;