
// Sección 9 => 131. Centralizar la alidar rol 

/*
const Role = require('../models/role')

const esRoleValido = async(rol = '') => {
    
    const existeRol = await Role.findOne({rol});
    if ( !existeRol ) {
        throw new Error(`El rol ${rol} no está registrado en la DB`);
    }
}

module.exports = {
    esRoleValido
}
*/

// Sección 9 => 132. Tarea - Custom validation - EmailExiste 

/*
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {
    
    const existeRol = await Role.findOne({rol});
    if ( !existeRol ) {
        throw new Error(`El rol ${rol} no está registrado en la DB`);
    }
}

const emailExiste = async(correo = '') => {
    
    const existeEmail = await Usuario.findOne({correo});
    if ( existeEmail) {
        throw new Error(`Este correo ${correo} ya está registrado en la DB`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste
}
*/

// Sección 9 => 134. Validaciones adicionales en el PUT

/*
const Role = require('../models/role');
const Usuario = require('../models/usuario');

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

module.exports = {
    esRoleValido,
    emailExiste,
    idExiste,
}
*/

// Sección 12 => 179. Resolución de la Tarea - Crear una categoría

/*
const { Usuario, Role, Categoria } = require('../models');

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

module.exports = {
    esRoleValido,
    emailExiste,
    idExiste,
    existeCategoria
}
*/

// Sección 12 => 181. Modelo de producto y rutas

/*
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
*/

// Sección 13 => 198. Ruta para actualizar img de Usuarios y Productos

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

const coleccionesPermitidas = ( coleccion = '', colecciones = [] ) => {

    const incluida = colecciones.includes( coleccion );
    if ( !incluida ) {
        throw new Error (`La colección: ${ coleccion } no es permitida. Las colecciones permitidas son: ${ colecciones }`)
    }

    return true;
}

module.exports = {
    esRoleValido,
    emailExiste,
    idExiste,
    existeCategoria,
    existeProducto,
    coleccionesPermitidas
}
