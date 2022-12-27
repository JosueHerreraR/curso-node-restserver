
// Sección 9 => 129. Validar todos los campos necesarios

const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {
        
    const errors = validationResult(req);
    if ( !errors.isEmpty() ){         // <- el signo de interrogación indica una negación de la constante
        return res.status(400).json(errors);
    }

    next();
}

module.exports = {
    validarCampos
}