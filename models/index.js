
// Sección 12 => 176. Modelo categoría y 
// Sección 12 => 181. Modelo de producto y rutas

const Categoria = require('./categoria');
const Producto = require('./producto');
const Role = require('./role');
const Server = require('./server');
const Usuario = require('./usuario');

module.exports = {
    Categoria,
    Producto,
    Role,
    Server,
    Usuario,
}