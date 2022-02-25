const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Leer el token del header
    const token = req.header('x-auth-token');
    // Verificar si no hay token
    if(!token) {
        return res.status(401).json({msg: 'No hay Token, permiso no válido'})
    }
    // Validar el token
    try {
        const cifrado = jwt.verify(token, process.env.SECRET);
        req.session = cifrado.user;
        next();
    } catch (error) {
        res.status(401).json({msg: 'Token no válido'});
    }
}