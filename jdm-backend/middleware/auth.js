const jwt = require('jsonwebtoken');

const fncVerificarToken = (req, res, next) => {
  const cabecera = req.header('Authorization');
  const partes = cabecera ? cabecera.split(' ') : [];
  const token = partes[0] === 'Bearer' ? partes[1] : null;

  if (!token) {
    return res.status(401).json({
      error: 'token_missing',
      message: 'No se envió el token de autenticación.'
    });
  }

  try {
    const datos = jwt.verify(token, process.env.JWT_SECRET);

    req.usuario = datos;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'token_expired',
        message: 'La sesión ha expirado o ya no es válida. Por favor, inicie sesión nuevamente.'
      });
    }

    return res.status(401).json({
      error: 'token_invalid',
      message: 'La sesión ha expirado o ya no es válida. Por favor, inicie sesión nuevamente.'
    });
  }
};

module.exports = fncVerificarToken;
