
// Sección 8 => 110. Separar las rutas y controlador de la clase y
// Sección 8 => 112. Paárametros de segmento y query

/*
const { Router } = require('express');
const { 
    usuariosGet, 
    usuariosPut, 
    usuariosPost, 
    usuariosPatch,
    usuariosDelete } = require('../controllers/usuarios')
const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', usuariosPost);

router.patch('/', usuariosPatch);

router.delete('/', usuariosDelete);

module.exports = router;
*/

// Sección 9 => 128. Validar campos obligatorios - Email
// Sección 9 => 129. Validar todos los campos necesarios

/*
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { 
    usuariosGet, 
    usuariosPut, 
    usuariosPost, 
    usuariosPatch,
    usuariosDelete } = require('../controllers/usuarios')
const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener minimo 8 caracteres').isLength({min: 8}),
    check('correo', 'El correo utilizado no es válido').isEmail(),
    check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validarCampos
], usuariosPost);

router.patch('/', usuariosPatch);

router.delete('/', usuariosDelete);

module.exports = router;
*/

// Sección 9 => 130. Validar rol contra base de datos

/*
const { Router } = require('express');
const { check } = require('express-validator');
const Role = require('../models/role');

const { validarCampos } = require('../middlewares/validar-campos');

const { 
    usuariosGet, 
    usuariosPut, 
    usuariosPost, 
    usuariosPatch,
    usuariosDelete } = require('../controllers/usuarios')
const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener minimo 8 caracteres').isLength({min: 8}),
    check('correo', 'El correo utilizado no es válido').isEmail(),
    check('rol').custom( async(rol = '') => {
        const existeRol = await Role.findOne({rol});
        if ( !existeRol ) {
            throw new Error(`El rol ${rol} no está registrado en la DB`);
        }
    }),
    validarCampos
], usuariosPost);

router.patch('/', usuariosPatch);

router.delete('/', usuariosDelete);

module.exports = router;
*/

// Sección 9 => 131. Centralizar la alidar rol y 
// Sección 9 => 132. Tarea - Custom validation - EmailExiste 

/*
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste } = require('../helpers/db-validators');
const { 
    usuariosGet, 
    usuariosPut, 
    usuariosPost, 
    usuariosPatch,
    usuariosDelete } = require('../controllers/usuarios');
    
const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener minimo 8 caracteres').isLength({min: 8}),
    check('correo').custom( emailExiste ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPost);

router.patch('/', usuariosPatch);

router.delete('/', usuariosDelete);

module.exports = router;
*/

// Sección 9 => 134. Validaciones adicionales en el PUT

/*
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, idExiste } = require('../helpers/db-validators');
const { 
    usuariosGet, 
    usuariosPut, 
    usuariosPost, 
    usuariosPatch,
    usuariosDelete } = require('../controllers/usuarios');
    
const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(idExiste),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener minimo 8 caracteres').isLength({min: 8}),
    check('correo').custom( emailExiste ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPost);

router.patch('/', usuariosPatch);

router.delete('/', usuariosDelete);

module.exports = router;
*/

// Sección 9 => 137. Delete: Borrando un usuario de la base de datos 

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, idExiste } = require('../helpers/db-validators');
const { 
    usuariosGet, 
    usuariosPut, 
    usuariosPost, 
    usuariosPatch,
    usuariosDelete } = require('../controllers/usuarios');
    
const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(idExiste),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener minimo 8 caracteres').isLength({min: 8}),
    check('correo').custom( emailExiste ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPost);

router.patch('/', usuariosPatch);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(idExiste),
    validarCampos
], usuariosDelete);

module.exports = router;
