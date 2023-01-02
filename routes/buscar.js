
// Sección 12 => 183. Ruta para realizar búsquedas

const { Router } = require('express');
const { buscar } = require('../controllers/buscar');

const router = Router();

router.get('/:coleccion/:termino', buscar);



module.exports = router;