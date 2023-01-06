
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
