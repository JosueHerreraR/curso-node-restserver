
// Sección 10 => 147. Crear ruta de autenticación - Auth - Login

const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'El password debe tener minimo 8 caracteres').not().isEmpty(),
    validarCampos
], login);

module.exports = router;