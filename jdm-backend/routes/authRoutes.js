const express = require('express');
const router = express.Router();
const { fncRegistrarUsuario, fncIniciarSesion } = require('../controllers/authController');

router.post('/register', fncRegistrarUsuario);
router.post('/login', fncIniciarSesion);

module.exports = router;
