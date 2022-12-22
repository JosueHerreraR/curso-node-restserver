
// Sección 8 => 110. Separar las rutas y controlador de la clase y
// Sección 8 => 112. Paárametros de segmento y query

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