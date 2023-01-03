
// Sección 13 => 196. Helper - Subir Archivo

const dbValidators  = require('./db-validators');
const generarJWT    = require('./generar-jwt');
const googleVerify  = require('./google-verify');
const subirArchivo  = require('./subir_archivo');

module.exports = {
    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo
}