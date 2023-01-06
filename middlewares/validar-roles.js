
// Sección 10 => 154. Middleware - Tiene Rol

const { response } = require("express");

const esAdminRole = (req, res = response, next) => {

    if ( !req.usuario ) {
        return res.status(500).json ({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }

    const { rol, nombre } = req.usuario;

    if ( rol != 'ADMIN_ROLE' ) {
        return res.status(401).json ({
            msg: `El usuario ${nombre} no puede realizar esta acción, ya que no es Administrador`
        });
    }

    next();
}

const tieneRole = ( ...roles ) => {

    return (req, res = response, next) => {

        if ( !req.usuario ) {
            return res.status(500).json ({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        if ( !roles.includes(req.usuario.rol) ) {
            return res.status(401).json ({
                msg: `El servicio requiere uno de estos roles: ${roles}`
            });
        }

        next();
    }
}

module.exports =  {
    esAdminRole,
    tieneRole
}
