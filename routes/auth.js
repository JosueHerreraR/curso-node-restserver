
// Sección 11 => 164. Ruta para manejar autenticación de Google

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { login, googleSingIn } = require('../controllers/auth');

const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'El password debe tener minimo 8 caracteres').not().isEmpty(),
    validarCampos
], login);

router.post('/google', [
    check('id_token', 'El ID_Token de Google es necesario').not().isEmpty(),
    validarCampos
], googleSingIn);

module.exports = router;