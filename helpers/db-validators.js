
// Sección 12 => 181. Modelo de producto y rutas

const { Usuario, Role, Categoria, Producto } = require('../models');

const esRoleValido = async( rol = '') => {
    
    const existeRol = await Role.findOne({rol});
    if ( !existeRol ) {
        throw new Error(`El rol ${rol} no está registrado en la DB`);
    }
}

const emailExiste = async( correo = '') => {
    
    const existeEmail = await Usuario.findOne({correo});
    if ( existeEmail) {
        throw new Error(`El correo ${correo} ya está registrado en la DB`);
    }
}

const idExiste = async( id = '') => {
    
    const existeUsuario = await Usuario.findById( id );
    if ( !existeUsuario) {
        throw new Error(`El ID: ${id} no está registrado en la DB`);
    }
}

const existeCategoria = async( id = '') => {
    
    const existeCategoria = await Categoria.findById( id );
    if ( !existeCategoria) {
        throw new Error(`El ID: ${id} no está registrado en la DB`);
    }
}

const existeProducto = async( id = '') => {
    
    const existeProducto = await Producto.findById( id );
    if ( !existeProducto) {
        throw new Error(`El ID: ${id} no está registrado en la DB`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    idExiste,
    existeCategoria,
    existeProducto
}
